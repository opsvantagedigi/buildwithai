import Link from 'next/link'
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6" style={{height: 'var(--site-header-height)'}}>
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-block">
            <span className="font-heading text-2xl font-bold gradient-text tracking-widest">BUILD WITH AI</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-base font-inter items-center">
          <Link href="/dashboard" className="hover:drop-shadow-[0_0_8px_rgba(11,179,138,0.6)] transition">Dashboard</Link>
          <Link href="/features" className="hover:drop-shadow-[0_0_8px_rgba(11,179,138,0.6)] transition">Features</Link>
          <Link href="/pricing" className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b3b8a] via-[#0bb38a] to-[#f5d300] text-black font-bold shadow hover:scale-105 transition">Get Started</Link>
        </nav>
        <div className="md:hidden">
          {/* mobile menu placeholder */}
        </div>
      </div>
    </header>
  );
}
