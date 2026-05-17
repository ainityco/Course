"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LearningPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    purpose: "",
    course: "ai-foundations",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/learning-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Learning interest submission failed");
      }
      setTimeout(() => setStatus("success"), 600);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {status === "success" && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-950/70 backdrop-blur-sm px-4">
          <div className="glass-panel rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-white/10 transform transition-all animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/25">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-glow">Thank you!</h3>
            <p className="text-slate-300 mb-6">Your learning interest has been registered. Our upskilling experts will connect with you soon.</p>
            <button 
              onClick={() => {
                setStatus("idle");
                setFormData({ username: "", email: "", purpose: "", course: "ai-foundations" });
              }} 
              className="w-full py-3 px-4 bg-brand-accent hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/5 animate-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight text-glow">Choose Your Learning Path</h1>
        <p className="text-lg text-slate-300 mb-10 leading-relaxed">Fill out the form below to register your interest in our premium upskilling courses. Our career architects will connect with you for personalized learning paths.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-300 mb-2">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="block w-full rounded-xl border border-white/10 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 bg-slate-950/65 text-white transition-all duration-300 outline-none"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-xl border border-white/10 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 bg-slate-950/65 text-white transition-all duration-300 outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-semibold text-slate-300 mb-2">Course of Interest</label>
            <select
              id="course"
              name="course"
              className="block w-full rounded-xl border border-white/10 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3.5 px-4 bg-slate-950/65 text-white transition-all duration-300 outline-none cursor-pointer"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="ai-foundations" className="bg-slate-900 text-white">AI Foundations for Students & Professionals</option>
              <option value="drone-tech" className="bg-slate-900 text-white">Practical Drone Technology & Robotics</option>
              <option value="ml-projects" className="bg-slate-900 text-white">Machine Learning for Real-World Projects</option>
              <option value="autonomous-systems" className="bg-slate-900 text-white">Autonomous Systems and IoT Basics</option>
              <option value="qa-automation" className="bg-slate-900 text-white">AI-Powered QA and Test Automation</option>
              <option value="other" className="bg-slate-900 text-white">Other / Not Sure / Multi-Domain</option>
            </select>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-semibold text-slate-300 mb-2">Purpose of Learning</label>
            <textarea
              id="purpose"
              name="purpose"
              rows={4}
              required
              className="block w-full rounded-xl border border-white/10 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 bg-slate-950/65 text-white transition-all duration-300 outline-none resize-none"
              placeholder="Tell us what you want to achieve or any specific domains you want to apply this to..."
              value={formData.purpose}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-brand-accent hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Registering Interest...
                </>
              ) : "Register for Free Placement Call"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-400 text-sm mt-3 text-center font-medium animate-in slide-in-from-top-1">There was an error submitting your form. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
