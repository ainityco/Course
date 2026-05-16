import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-50 transition-colors duration-300">
        <div className="w-16 h-16 bg-brand-accent-soft rounded-2xl flex items-center justify-center mb-8">
          <Shield className="w-8 h-8 text-brand-accent" />
        </div>
        <h1 className="text-4xl font-extrabold text-brand-primary mb-6 tracking-tight">Privacy Policy</h1>
        <div className="prose prose-blue max-w-none text-brand-text-muted">
          <p className="text-xl mb-8">At AINITY, we take your privacy seriously. This document outlines how we collect, use, and protect your data.</p>
          <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, and any other information you choose to provide.</p>
          <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-4">We may use the information we collect to provide, maintain, and improve our services, as well as to develop new features and send you technical notices and support messages.</p>
          <div className="mt-12 pt-8 border-t border-slate-100">
            <Link href="/home" className="text-brand-accent hover:text-blue-700 font-medium inline-flex items-center">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
