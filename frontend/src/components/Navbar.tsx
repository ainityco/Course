"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Menu, X } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href="/home" className="flex-shrink-0 flex items-center gap-3 group">
              <Image src="/images/logo.png" alt="AINITY Logo" width={36} height={36} className="rounded-md group-hover:scale-110 transition-transform" />
              <span className={`${spaceGrotesk.className} text-2xl font-bold text-brand-primary tracking-[0.2em] uppercase`}>AINITY</span>
            </Link>

            {/* Desktop Navigation & Theme Toggle */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? "border-brand-accent text-brand-accent" 
                        : "border-transparent text-brand-text-muted hover:border-brand-accent hover:text-brand-accent"
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
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-text-muted hover:text-brand-text hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
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
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-b border-slate-100 transition-colors duration-300" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-accent-soft border-brand-accent text-brand-accent"
                      : "border-transparent text-brand-text-muted hover:bg-slate-50 hover:border-slate-300 hover:text-brand-text"
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
