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
      await fetch(`${API_URL}/api/entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
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
    <div className="flex flex-col items-center justify-center min-h-[100vh] relative px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {status === "success" && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-900/60 backdrop-blur-md px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 dark:border-slate-800 transform transition-all animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank you!</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Thank you for submitting and our team will contact you soon.</p>
            <button 
              onClick={handleContinue} 
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
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
        className="object-cover object-center z-0 opacity-100 dark:opacity-80 transition-opacity"
      />
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 z-0 backdrop-blur-sm transition-colors"></div>

      <div className="relative z-10 max-w-md w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20 dark:border-slate-700/50 animate-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <div className="bg-white p-2 rounded-2xl inline-block mb-6 shadow-sm">
            <Image src="/images/logo.png" alt="AINITY Logo" width={80} height={80} className="drop-shadow-sm rounded-xl" />
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase mb-4 drop-shadow-sm`}>
            AINITY
          </h1>
          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">Enter your email to unlock premium learning paths.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                className={`block w-full rounded-xl shadow-inner sm:text-sm py-4 px-4 border transition-all outline-none text-slate-900 dark:text-white ${
                  emailError ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50 dark:bg-red-900/20" : 
                  isValidEmail ? "border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-green-50 dark:bg-green-900/20" : 
                  "border-slate-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
              />
              {isValidEmail && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 animate-in zoom-in" />
                </div>
              )}
            </div>
            {emailError && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium animate-in slide-in-from-top-1">{emailError}</p>}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Entering...
              </>
            ) : "Start Learning"}
          </button>
        </form>
      </div>
    </div>
  );
}
