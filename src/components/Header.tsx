import Link from 'next/link'
import React from "react";
import NavDropdown from './NavDropdown'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 bw-container" style={{height: 'var(--site-header-height)'}}>
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-block">
            <span className="font-heading font-orbitron text-2xl font-bold gradient-text tracking-widest">BUILD WITH AI</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-base items-center">
          <NavDropdown
            title="Platform"
            items={[
              { label: 'Overview', href: '/platform' },
              { label: 'AI Automation', href: '/platform/automation' },
              { label: 'Infrastructure', href: '/platform/infrastructure' },
              { label: 'Rollup Engine', href: '/platform/rollup' },
            ]}
          />

          <NavDropdown
            title="Solutions"
            items={[
              { label: 'Templates', href: '/solutions/templates' },
              { label: 'Use Cases', href: '/solutions/use-cases' },
              { label: 'Industries', href: '/solutions/industries' },
            ]}
          />

          <NavDropdown
            title="Docs"
            items={[
              { label: 'Getting Started', href: '/docs/getting-started' },
              { label: 'API Reference', href: '/docs/api' },
              { label: 'Guides', href: '/docs/guides' },
            ]}
          />

          <NavDropdown
            title="Pricing"
            items={[
              { label: 'Plans', href: '/pricing' },
              { label: 'Free Tier', href: '/pricing/free' },
              { label: 'Founder Benefits', href: '/pricing/founder' },
            ]}
          />

          <Link href="/dashboard" className="menu-item font-orbitron">Dashboard</Link>
          <Link href="/builder/start" className="menu-item ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b3b8a] via-[#0bb38a] to-[#f5d300] text-black font-bold shadow">Get Started</Link>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 rounded-md menu-item bg-white/6 border border-white/6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
