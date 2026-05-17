import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-4 duration-500 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl">
        <div className="w-16 h-16 bg-brand-accent/15 border border-brand-accent/25 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
          <Shield className="w-8 h-8 text-brand-accent" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight text-glow">Privacy Policy</h1>
        
        <div className="max-w-none text-slate-300 space-y-6">
          <p className="text-xl mb-8 leading-relaxed font-light">At AINITY, we take your privacy seriously. This document outlines how we collect, use, and protect your data.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 text-glow">1. Information We Collect</h2>
          <p className="leading-relaxed font-light">We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, and any other information you choose to provide.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 text-glow">2. How We Use Information</h2>
          <p className="leading-relaxed font-light">We may use the information we collect to provide, maintain, and improve our services, as well as to develop new features and send you technical notices and support messages.</p>
          
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link href="/home" className="text-brand-accent hover:text-blue-400 font-medium inline-flex items-center transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
