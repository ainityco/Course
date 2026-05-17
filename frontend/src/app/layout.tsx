import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AINITY",
    template: "%s | AINITY"
  },
  description: "Universal growth, learning, and innovation across all domains. Empowering individuals and communities to upskill and turn their ideas into reality.",
  openGraph: {
    title: "AINITY - Universal Learning & Innovation",
    description: "Universal growth, learning, and innovation across all domains. Empowering individuals and communities to upskill and turn their ideas into reality.",
    url: "https://course-rho-topaz.vercel.app",
    siteName: "AINITY",
    images: [
      {
        url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AINITY - Universal Learning & Innovation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AINITY - Universal Learning & Innovation",
    description: "Universal growth, learning, and innovation across all domains.",
    images: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col transition-colors duration-300`}>
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 mt-auto relative z-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">&copy; 2026 AINITY. All rights reserved.</p>
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/images/logo.png" alt="AINITY Logo" width={24} height={24} className="rounded-md" />
              <span className={`${spaceGrotesk.className} text-sm font-bold text-slate-500 tracking-[0.2em] uppercase`}>AINITY</span>
            </div>
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  );
}
