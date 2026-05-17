"use client";

import { useState } from "react";
import { Lock, Download, Users, BookOpen, Loader2 } from "lucide-react";

type SubmissionRow = {
  Timestamp?: string;
  Email?: string;
  Username?: string;
  Course?: string;
  Purpose?: string;
};

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"entries" | "learning">("entries");
  const [entries, setEntries] = useState<SubmissionRow[]>([]);
  const [learning, setLearning] = useState<SubmissionRow[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const entryRes = await fetch(`${API_URL}/api/admin/entries`, {
        headers: { "x-admin-password": password }
      });
      
      if (!entryRes.ok) {
        throw new Error("Invalid password");
      }
      
      const learningRes = await fetch(`${API_URL}/api/admin/learning`, {
        headers: { "x-admin-password": password }
      });
      
      const entryData = await entryRes.json();
      const learningData = await learningRes.json();
      
      setEntries(entryData);
      setLearning(learningData);
      setIsAuthenticated(true);
    } catch {
      setError("Authentication failed. Please check the password.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = async (type: "entries" | "learning") => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/admin/download-${type}`, {
        method: "GET",
        headers: { "x-admin-password": password }
      });
      
      if (!res.ok) throw new Error("Download failed");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ainity_${type}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Failed to download file securely. Please check your connection.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-50 animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-brand-accent-soft rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-accent" />
          </div>
          <h1 className="text-2xl font-bold text-center text-brand-primary mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Enter Secret Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-brand-text-muted mt-1">Manage and export your platform leads securely.</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
        >
          Lock Dashboard
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            onClick={() => setActiveTab("entries")}
            className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-colors ${
              activeTab === "entries" 
                ? "text-brand-accent border-b-2 border-brand-accent bg-white" 
                : "text-brand-text-muted hover:text-brand-primary"
            }`}
          >
            <Users className="w-4 h-4" /> Entry Submissions ({entries.length})
          </button>
          <button
            onClick={() => setActiveTab("learning")}
            className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-colors ${
              activeTab === "learning" 
                ? "text-brand-accent border-b-2 border-brand-accent bg-white" 
                : "text-brand-text-muted hover:text-brand-primary"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Learning Interests ({learning.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => downloadCSV(activeTab)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
            >
              <Download className="w-4 h-4" /> Export Excel (CSV)
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-sm text-brand-text-muted">
              <thead className="bg-slate-50 text-brand-primary font-bold border-b border-slate-100">
                <tr>
                  {activeTab === "entries" ? (
                    <>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Email Address</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Username</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Purpose</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeTab === "entries" ? entries : learning).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No data available yet.</td>
                  </tr>
                ) : (
                  (activeTab === "entries" ? entries : learning).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      {activeTab === "entries" ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">{row.Timestamp}</td>
                          <td className="px-6 py-4 font-medium text-brand-primary">{row.Email}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">{row.Timestamp}</td>
                          <td className="px-6 py-4 font-medium text-brand-primary">{row.Username}</td>
                          <td className="px-6 py-4">{row.Email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent-soft text-brand-accent">
                              {row.Course}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate" title={row.Purpose}>{row.Purpose}</td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
