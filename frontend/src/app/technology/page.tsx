import Link from "next/link";
import { Cpu } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <Cpu className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Core Technology</h1>
      <p className="text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">Discover the proprietary neural networks powering our AUVs.</p>
      <div className="inline-block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold py-2 px-6 rounded-full text-sm tracking-widest uppercase mb-12 shadow-sm animate-pulse">
        Under Construction
      </div>
      <br/>
      <Link href="/home" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center hover:underline">
        &larr; Return to Home
      </Link>
    </div>
  );
}
