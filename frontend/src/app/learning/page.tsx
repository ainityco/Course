"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LearningPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    purpose: "",
    course: "ai-intro",
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
      await fetch(`${API_URL}/api/learning-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Simulate network delay for UX
      setTimeout(() => setStatus("success"), 600);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      {status === "success" && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-brand-primary/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 transform transition-all animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-primary mb-2">Thank you!</h3>
            <p className="text-brand-text-muted mb-6">Thank you for submitting and our team will contact you soon.</p>
            <button 
              onClick={() => {
                setStatus("idle");
                setFormData({ username: "", email: "", purpose: "", course: "ai-intro" });
              }} 
              className="w-full py-3 px-4 bg-brand-accent hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-50 animate-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4 tracking-tight">Choose Your Learning Path</h1>
        <p className="text-lg text-brand-text-muted mb-10 leading-relaxed">Fill out the form below to register your interest in our premium courses. Our AI experts will get back to you with personalized recommendations.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-brand-text mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="block w-full rounded-xl border-slate-200 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 border bg-slate-50 text-brand-text transition-colors outline-none"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-text mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-xl border-slate-200 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 border bg-slate-50 text-brand-text transition-colors outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-semibold text-brand-text mb-1">Course of Interest</label>
            <select
              id="course"
              name="course"
              className="block w-full rounded-xl border-slate-200 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 border bg-slate-50 text-brand-text transition-colors outline-none"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="ai-intro">Introduction to Artificial Intelligence</option>
              <option value="drones-eng">Advanced Aquatic Drones Engineering</option>
              <option value="ml-ocean">Machine Learning in Oceanography</option>
              <option value="auv">Autonomous Underwater Vehicles (AUVs)</option>
              <option value="qa-ai">QA Automation with AI</option>
              <option value="other">Other / Not Sure</option>
            </select>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-semibold text-brand-text mb-1">Purpose of Learning</label>
            <textarea
              id="purpose"
              name="purpose"
              rows={4}
              required
              className="block w-full rounded-xl border-slate-200 shadow-inner focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm py-3 px-4 border bg-slate-50 text-brand-text transition-colors outline-none resize-none"
              placeholder="Why are you interested in this topic?"
              value={formData.purpose}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Submitting...
                </>
              ) : "Submit Interest"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2 text-center font-medium animate-in slide-in-from-top-1">There was an error submitting your form. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
