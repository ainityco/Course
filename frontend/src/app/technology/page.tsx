import Link from "next/link";
import { Cpu } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-in zoom-in duration-500 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-24 h-24 bg-brand-accent/15 border border-brand-accent/25 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <Cpu className="w-12 h-12 text-brand-accent" />
      </div>
      <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight text-glow">Core Technology</h1>
      <p className="text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">Discover the proprietary neural networks powering our AUVs.</p>
      
      <div className="inline-block glass-panel text-brand-accent border border-brand-accent/30 font-bold py-2 px-6 rounded-full text-sm tracking-widest uppercase mb-12 shadow-sm animate-pulse">
        Under Construction
      </div>
      <br/>
      <Link href="/home" className="text-brand-accent hover:text-blue-400 font-medium inline-flex items-center transition-colors">
        &larr; Return to Home
      </Link>
    </div>
  );
}
