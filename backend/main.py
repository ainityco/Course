# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException, BackgroundTasks, Header, Query
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from fastapi.responses import FileResponse
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import os
import csv
from datetime import datetime
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
    
load_dotenv()

app = FastAPI(title="AINITY API", description="API for AINITY AI and Aquatic Drones platform")

# Security settings
ALLOWED_ORIGINS_STR = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
ALLOWED_ORIGINS = [origin.strip() for origin in ALLOWED_ORIGINS_STR.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration for SMTP
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", SMTP_USER)

# Admin Security
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "ainityadmin")

# CSV File Paths for Local Storage
ENTRY_CSV_FILE = "entry_data.csv"
LEARNING_CSV_FILE = "learning_data.csv"

# Initialize CSV files with headers if they don't exist
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
    username: str
    email: EmailStr
    purpose: str
    course: str

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

# Data Saving Helpers
def save_entry_to_csv(email: str):
    with open(ENTRY_CSV_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([datetime.now().strftime("%Y-%m-%d %H:%M:%S"), email])

def save_learning_to_csv(data: dict):
    with open(LEARNING_CSV_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            data.get("username", ""),
            data.get("email", ""),
            data.get("course", ""),
            data.get("purpose", "")
        ])

@app.post("/api/entry")
async def register_entry(request: EntryRequest, background_tasks: BackgroundTasks):
    subject = "New Entry on AINITY"
    content = f"A user has entered the AINITY site.\n\nEmail: {request.email}"
    background_tasks.add_task(send_email, subject, content)
    save_entry_to_csv(request.email)
    return {"message": "Entry recorded successfully"}

@app.post("/api/learning-interest")
async def register_learning_interest(request: LearningInterestRequest, background_tasks: BackgroundTasks):
    subject = f"New Course Interest: {request.course}"
    content = f"New learning interest registered on AINITY:\n\nUsername: {request.username}\nEmail: {request.email}\nCourse: {request.course}\n\nPurpose of Learning:\n{request.purpose}"
    background_tasks.add_task(send_email, subject, content)
    save_learning_to_csv(request.model_dump())
    return {"message": "Learning interest recorded successfully"}

# --- ADMIN SECURE ENDPOINTS ---

def verify_admin(password: str):
    if password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

@app.get("/api/admin/entries")
def get_entries_json(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    if not os.path.exists(ENTRY_CSV_FILE):
        return []
    with open(ENTRY_CSV_FILE, mode='r') as f:
        reader = csv.DictReader(f)
        return list(reader)

@app.get("/api/admin/learning")
def get_learning_json(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    if not os.path.exists(LEARNING_CSV_FILE):
        return []
    with open(LEARNING_CSV_FILE, mode='r') as f:
        reader = csv.DictReader(f)
        return list(reader)

@app.get("/api/admin/download-entries")
def download_entries(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    if not os.path.exists(ENTRY_CSV_FILE):
        raise HTTPException(status_code=404, detail="No entry data found yet.")
    return FileResponse(ENTRY_CSV_FILE, media_type="text/csv", filename="ainity_entries.csv")

@app.get("/api/admin/download-learning")
def download_learning(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    if not os.path.exists(LEARNING_CSV_FILE):
        raise HTTPException(status_code=404, detail="No learning data found yet.")
    return FileResponse(LEARNING_CSV_FILE, media_type="text/csv", filename="ainity_learning_interest.csv")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "AINITY API is running"}
