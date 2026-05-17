"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Loader2, CheckCircle2 } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function EntryPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Entry submission failed");
      }
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleContinue = () => {
    router.push("/home");
  };

  const isValidEmail = validateEmail(email);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] relative px-4 bg-[#060913] overflow-hidden">
      
      {/* Abstract Glowing Backdrop Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {status === "success" && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-950/80 backdrop-blur-md px-4">
          <div className="glass-panel rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-white/10 transform transition-all animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-glow">Welcome</h3>
            <p className="text-slate-300 mb-6">Your placement call slot is registered! Let&apos;s explore your learning paths.</p>
            <button 
              onClick={handleContinue} 
              className="w-full py-3 px-4 bg-brand-accent hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Continue to Website
            </button>
          </div>
        </div>
      )}

      {/* Background Image */}
      <Image 
        src="/images/hero_bg.png" 
        alt="AINITY Background" 
        fill
        priority
        className="object-cover object-center z-0 opacity-40 transition-opacity duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/60 via-[#060913]/90 to-[#060913] z-0"></div>

      <div className="relative z-10 max-w-md w-full glass-panel backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)] p-8 sm:p-10 border border-white/10 animate-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <div className="bg-slate-900/60 p-2.5 rounded-2xl inline-block mb-4 shadow-inner border border-white/5">
            <Image src="/images/logo.png" alt="AINITY Logo" width={64} height={64} className="drop-shadow-sm rounded-xl" />
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl font-extrabold text-white tracking-[0.25em] uppercase mb-3 text-glow`}>
            AINITY
          </h1>
          <p className="text-slate-300 text-sm font-light leading-relaxed">Enter your email to unlock premium cross-sector learning paths.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                className={`block w-full rounded-xl shadow-inner sm:text-sm py-4 px-4 border transition-all duration-300 outline-none text-white ${
                  emailError ? "border-red-500/50 bg-red-900/10 focus:border-red-500 focus:ring-1 focus:ring-red-500" : 
                  isValidEmail ? "border-green-500/50 bg-green-900/10 focus:border-green-500 focus:ring-1 focus:ring-green-500" : 
                  "border-white/10 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 bg-slate-950/65"
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
              />
              {isValidEmail && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <CheckCircle2 className="h-5 w-5 text-green-400 animate-in zoom-in" />
                </div>
              )}
            </div>
            {emailError && <p className="mt-2 text-xs text-red-400 font-medium animate-in slide-in-from-top-1">{emailError}</p>}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-accent hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Entering System...
              </>
            ) : "Unlock Premium Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
