import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-50 text-center transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4 tracking-tight">Get in Touch</h1>
        <p className="text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto">Have a question or want to learn more about AINITY? We'd love to hear from you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-accent-soft rounded-full flex items-center justify-center mb-4 text-brand-accent">
              <Mail />
            </div>
            <h3 className="font-bold text-brand-primary mb-2">Email</h3>
            <p className="text-brand-text-muted text-sm">ainity.345@gmail.com</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-accent-soft rounded-full flex items-center justify-center mb-4 text-brand-accent">
              <Phone />
            </div>
            <h3 className="font-bold text-brand-primary mb-2">Phone</h3>
            <p className="text-brand-text-muted text-sm">+91 89192 50348</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-accent-soft rounded-full flex items-center justify-center mb-4 text-brand-accent">
              <MapPin />
            </div>
            <h3 className="font-bold text-brand-primary mb-2">Office</h3>
            <p className="text-brand-text-muted text-sm">Kondapur, Hyderabad<br />Telangana, India</p>
          </div>
        </div>

        <Link href="/learning" className="inline-block bg-brand-accent text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:-translate-y-1">
          Register Interest Now
        </Link>
      </div>
    </div>
  );
}
