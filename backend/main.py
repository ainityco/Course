from fastapi import FastAPI, HTTPException, BackgroundTasks, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel, EmailStr, Field
import smtplib
from email.message import EmailMessage
import os
import csv
import io
import base64
import hashlib
import hmac
import json
import time
from collections import defaultdict, deque
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

app = FastAPI(title="AINITY API", description="API for AINITY AI and Aquatic Drones platform")

# Security settings
ALLOWED_ORIGINS_STR = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
DEFAULT_ALLOWED_ORIGINS = {
    "http://localhost:3000",
    "https://ainity.in",
    "https://www.ainity.in",
}
ALLOWED_ORIGINS = sorted(
    DEFAULT_ALLOWED_ORIGINS
    | {origin.strip() for origin in ALLOWED_ORIGINS_STR.split(",") if origin.strip()}
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

# Configuration for SMTP
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", SMTP_USER)

# Admin Security
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
ADMIN_SESSION_SECRET = os.getenv("ADMIN_SESSION_SECRET") or ADMIN_PASSWORD
ADMIN_SESSION_TTL_HOURS = int(os.getenv("ADMIN_SESSION_TTL_HOURS", "8"))
if not ADMIN_PASSWORD:
    print("WARNING: ADMIN_PASSWORD is not set. Admin endpoints will reject all requests.")
if ADMIN_PASSWORD and ADMIN_SESSION_SECRET == ADMIN_PASSWORD:
    print("WARNING: ADMIN_SESSION_SECRET is not set. Using ADMIN_PASSWORD as the session signing secret.")

# Basic in-memory abuse protection. Render normally runs one instance for this
# scale, so this blocks simple brute force and spam without extra services.
RATE_LIMITS = {
    "entry": (10, 60),
    "learning": (5, 60),
    "admin": (8, 300),
}
rate_limit_hits = defaultdict(deque)

# MongoDB Connection
MONGODB_URI = os.getenv("MONGODB_URI")
db_client = None
db = None
entries_col = None
learning_col = None

if MONGODB_URI:
    try:
        db_client = AsyncIOMotorClient(MONGODB_URI)
        # Use explicit indexing db_client["ainity"] because connection string doesn't specify a default db name
        db = db_client["ainity"]
        entries_col = db.entries
        learning_col = db.learning_interests
        print("Connected to MongoDB successfully!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
else:
    print("MONGODB_URI not found. Please set it to enable MongoDB database storage.")

# CSV File Paths for Local Fallback Storage
ENTRY_CSV_FILE = "entry_data.csv"
LEARNING_CSV_FILE = "learning_data.csv"

# Initialize CSV files with headers if they don't exist (fallback mechanism)
if not os.path.exists(ENTRY_CSV_FILE):
    with open(ENTRY_CSV_FILE, mode='w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Timestamp", "Email"])

if not os.path.exists(LEARNING_CSV_FILE):
    with open(LEARNING_CSV_FILE, mode='w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Timestamp", "Username", "Email", "Course", "Purpose"])

# Models
class EntryRequest(BaseModel):
    email: EmailStr

class LearningInterestRequest(BaseModel):
    username: str = Field(min_length=2, max_length=80)
    email: EmailStr
    purpose: str = Field(min_length=5, max_length=1200)
    course: str = Field(min_length=2, max_length=80)

class AdminLoginRequest(BaseModel):
    password: str = Field(min_length=1, max_length=256)

def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")

def safe_csv_value(value):
    text = "" if value is None else str(value)
    if text.startswith(("=", "+", "-", "@")):
        return "'" + text
    return text

def check_rate_limit(bucket: str, identifier: str):
    max_hits, window_seconds = RATE_LIMITS[bucket]
    now = time.monotonic()
    key = f"{bucket}:{identifier}"
    hits = rate_limit_hits[key]
    while hits and now - hits[0] > window_seconds:
        hits.popleft()
    if len(hits) >= max_hits:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    hits.append(now)

def client_identifier(request: Request):
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

def base64url_encode(data: bytes):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("utf-8")

def base64url_decode(value: str):
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)

def sign_admin_payload(payload: dict):
    encoded_payload = base64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signature = hmac.new(
        ADMIN_SESSION_SECRET.encode("utf-8"),
        encoded_payload.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    return f"{encoded_payload}.{base64url_encode(signature)}"

def create_admin_session_token():
    expires_at = datetime.now(timezone.utc) + timedelta(hours=ADMIN_SESSION_TTL_HOURS)
    return sign_admin_payload({
        "sub": "admin",
        "exp": int(expires_at.timestamp()),
    })

def verify_admin_password(password: str):
    if not ADMIN_PASSWORD or not password or not hmac.compare_digest(password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Unauthorized")

def verify_admin_session(authorization: str):
    if not ADMIN_SESSION_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.removeprefix("Bearer ").strip()
    try:
        encoded_payload, encoded_signature = token.split(".", 1)
        expected_signature = hmac.new(
            ADMIN_SESSION_SECRET.encode("utf-8"),
            encoded_payload.encode("utf-8"),
            hashlib.sha256,
        ).digest()
        provided_signature = base64url_decode(encoded_signature)
        if not hmac.compare_digest(provided_signature, expected_signature):
            raise ValueError("Invalid signature")
        payload = json.loads(base64url_decode(encoded_payload))
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if payload.get("sub") != "admin" or int(payload.get("exp", 0)) < int(time.time()):
        raise HTTPException(status_code=401, detail="Session expired")

# Email Sender Helper
def send_email(subject: str, content: str):
    if not SMTP_USER or not SMTP_PASSWORD:
        print("SMTP Credentials not set. Logging email instead:")
        print(f"Subject: {subject}\nContent:\n{content}")
        return

    try:
        msg = EmailMessage()
        msg.set_content(content)
        msg['Subject'] = subject
        msg['From'] = SMTP_USER
        msg['To'] = RECEIVER_EMAIL

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

# Local CSV Fallback Data Saving Helpers
def save_entry_to_csv(email: str):
    with open(ENTRY_CSV_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([now_iso(), safe_csv_value(email)])

def save_learning_to_csv(data: dict):
    with open(LEARNING_CSV_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            now_iso(),
            safe_csv_value(data.get("username", "")),
            safe_csv_value(data.get("email", "")),
            safe_csv_value(data.get("course", "")),
            safe_csv_value(data.get("purpose", ""))
        ])

@app.post("/api/entry")
async def register_entry(request: EntryRequest, background_tasks: BackgroundTasks, http_request: Request):
    check_rate_limit("entry", client_identifier(http_request))
    subject = "New Entry on AINITY"
    content = f"A user has entered the AINITY site.\n\nEmail: {request.email}"
    background_tasks.add_task(send_email, subject, content)
    
    # Save to MongoDB or Fallback to local CSV
    if entries_col is not None:
        try:
            await entries_col.insert_one({
                "Timestamp": now_iso(),
                "Email": request.email
            })
        except Exception as e:
            print(f"MongoDB write failed: {e}. Falling back to CSV.")
            save_entry_to_csv(request.email)
    else:
        save_entry_to_csv(request.email)
        
    return {"message": "Entry recorded successfully"}

@app.post("/api/learning-interest")
async def register_learning_interest(request: LearningInterestRequest, background_tasks: BackgroundTasks, http_request: Request):
    check_rate_limit("learning", client_identifier(http_request))
    subject = f"New Course Interest: {request.course}"
    content = f"New learning interest registered on AINITY:\n\nUsername: {request.username}\nEmail: {request.email}\nCourse: {request.course}\n\nPurpose of Learning:\n{request.purpose}"
    background_tasks.add_task(send_email, subject, content)
    
    # Save to MongoDB or Fallback to local CSV
    if learning_col is not None:
        try:
            await learning_col.insert_one({
                "Timestamp": now_iso(),
                "Username": request.username,
                "Email": request.email,
                "Course": request.course,
                "Purpose": request.purpose
            })
        except Exception as e:
            print(f"MongoDB write failed: {e}. Falling back to CSV.")
            save_learning_to_csv(request.model_dump())
    else:
        save_learning_to_csv(request.model_dump())
        
    return {"message": "Learning interest recorded successfully"}

# --- ADMIN SECURE ENDPOINTS ---

@app.post("/api/admin/login")
async def admin_login(request: AdminLoginRequest, http_request: Request):
    check_rate_limit("admin", client_identifier(http_request))
    verify_admin_password(request.password)
    return {
        "token": create_admin_session_token(),
        "expiresInSeconds": ADMIN_SESSION_TTL_HOURS * 60 * 60,
    }

@app.get("/api/admin/entries")
async def get_entries_json(http_request: Request, authorization: str = Header(None)):
    check_rate_limit("admin", client_identifier(http_request))
    verify_admin_session(authorization)
    
    # Try fetching from MongoDB
    if entries_col is not None:
        try:
            cursor = entries_col.find({}, {"_id": 0}).sort("Timestamp", -1)
            return await cursor.to_list(length=1000)
        except Exception as e:
            print(f"MongoDB query failed: {e}. Falling back to CSV.")
            
    # Fallback to local CSV file
    if not os.path.exists(ENTRY_CSV_FILE):
        return []
    with open(ENTRY_CSV_FILE, mode='r') as f:
        reader = csv.DictReader(f)
        return list(reader)

@app.get("/api/admin/learning")
async def get_learning_json(http_request: Request, authorization: str = Header(None)):
    check_rate_limit("admin", client_identifier(http_request))
    verify_admin_session(authorization)
    
    # Try fetching from MongoDB
    if learning_col is not None:
        try:
            cursor = learning_col.find({}, {"_id": 0}).sort("Timestamp", -1)
            return await cursor.to_list(length=1000)
        except Exception as e:
            print(f"MongoDB query failed: {e}. Falling back to CSV.")
            
    # Fallback to local CSV file
    if not os.path.exists(LEARNING_CSV_FILE):
        return []
    with open(LEARNING_CSV_FILE, mode='r') as f:
        reader = csv.DictReader(f)
        return list(reader)

@app.get("/api/admin/download-entries")
async def download_entries(http_request: Request, authorization: str = Header(None)):
    check_rate_limit("admin", client_identifier(http_request))
    verify_admin_session(authorization)
    
    # Try generating CSV dynamically from MongoDB
    if entries_col is not None:
        try:
            cursor = entries_col.find({}, {"_id": 0}).sort("Timestamp", -1)
            results = await cursor.to_list(length=10000)
            
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["Timestamp", "Email"])
            for row in results:
                writer.writerow([safe_csv_value(row.get("Timestamp")), safe_csv_value(row.get("Email"))])
            
            output.seek(0)
            return StreamingResponse(
                iter([output.getvalue()]),
                media_type="text/csv",
                headers={"Content-Disposition": "attachment; filename=ainity_entries.csv"}
            )
        except Exception as e:
            print(f"MongoDB dynamic CSV generation failed: {e}. Falling back to file download.")
            
    # Fallback to physical CSV file
    if not os.path.exists(ENTRY_CSV_FILE):
        raise HTTPException(status_code=404, detail="No entry data found yet.")
    return FileResponse(ENTRY_CSV_FILE, media_type="text/csv", filename="ainity_entries.csv")

@app.get("/api/admin/download-learning")
async def download_learning(http_request: Request, authorization: str = Header(None)):
    check_rate_limit("admin", client_identifier(http_request))
    verify_admin_session(authorization)
    
    # Try generating CSV dynamically from MongoDB
    if learning_col is not None:
        try:
            cursor = learning_col.find({}, {"_id": 0}).sort("Timestamp", -1)
            results = await cursor.to_list(length=10000)
            
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["Timestamp", "Username", "Email", "Course", "Purpose"])
            for row in results:
                writer.writerow([
                    safe_csv_value(row.get("Timestamp")),
                    safe_csv_value(row.get("Username")),
                    safe_csv_value(row.get("Email")),
                    safe_csv_value(row.get("Course")),
                    safe_csv_value(row.get("Purpose"))
                ])
            
            output.seek(0)
            return StreamingResponse(
                iter([output.getvalue()]),
                media_type="text/csv",
                headers={"Content-Disposition": "attachment; filename=ainity_learning_interest.csv"}
            )
        except Exception as e:
            print(f"MongoDB dynamic CSV generation failed: {e}. Falling back to file download.")
            
    # Fallback to physical CSV file
    if not os.path.exists(LEARNING_CSV_FILE):
        raise HTTPException(status_code=404, detail="No learning data found yet.")
    return FileResponse(LEARNING_CSV_FILE, media_type="text/csv", filename="ainity_learning_interest.csv")

@app.get("/")
def health_check():
    mongo_status = "Connected" if entries_col is not None else "Not Connected (CSV Fallback)"
    return {"status": "ok", "message": "AINITY API is running", "database": mongo_status}
