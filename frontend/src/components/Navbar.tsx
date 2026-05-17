"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Menu, X } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/") return null;

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Learning", href: "/learning" },
    { name: "Solutions", href: "/solutions" },
    { name: "Technology", href: "/technology" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="glass-panel border-b border-white/5 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href="/home" className="flex-shrink-0 flex items-center gap-3 group">
              <Image src="/images/logo.png" alt="AINITY Logo" width={36} height={36} className="rounded-md group-hover:scale-110 transition-transform" />
              <span className={`${spaceGrotesk.className} text-2xl font-bold text-white tracking-[0.2em] uppercase group-hover:text-glow transition-all duration-300`}>AINITY</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? "border-brand-accent text-white text-glow" 
                        : "border-transparent text-slate-400 hover:border-brand-accent/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900/60 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full glass-panel border-b border-white/5 backdrop-blur-xl" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-brand-accent/15 border-brand-accent text-white text-glow"
                      : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
