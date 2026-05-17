import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-4 duration-500 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/5 text-center shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight text-glow">Get in Touch</h1>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">Have a question or want to learn more about AINITY? We&apos;d love to hear from you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Email Card */}
          <div className="flex flex-col items-center p-6 glass-panel rounded-2xl border border-white/5 hover:border-brand-accent/45 transition-all duration-300 shadow-md group">
            <div className="w-12 h-12 bg-brand-accent/15 border border-brand-accent/25 rounded-full flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-glow">Email</h3>
            <p className="text-slate-400 text-sm">ainity.345@gmail.com</p>
          </div>

          {/* Phone Card */}
          <div className="flex flex-col items-center p-6 glass-panel rounded-2xl border border-white/5 hover:border-brand-accent/45 transition-all duration-300 shadow-md group">
            <div className="w-12 h-12 bg-brand-accent/15 border border-brand-accent/25 rounded-full flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-glow">Phone</h3>
            <p className="text-slate-400 text-sm">+91 89192 50348</p>
          </div>

          {/* Address Card */}
          <div className="flex flex-col items-center p-6 glass-panel rounded-2xl border border-white/5 hover:border-brand-accent/45 transition-all duration-300 shadow-md group">
            <div className="w-12 h-12 bg-brand-accent/15 border border-brand-accent/25 rounded-full flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-glow">Office</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Kondapur, Hyderabad<br />Telangana, India</p>
          </div>

        </div>

        <Link href="/learning" className="inline-block bg-brand-accent hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)] hover:-translate-y-0.5">
          Register Interest Now
        </Link>
      </div>
    </div>
  );
}
