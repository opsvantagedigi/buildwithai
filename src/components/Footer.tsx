import Link from 'next/link'
import React from "react";

export default function Footer() {
  return (
    <footer className="fixed left-0 right-0 bottom-0 z-40 glass border-t" style={{borderImage: 'linear-gradient(90deg, rgba(11,59,138,0.6), rgba(11,179,138,0.6), rgba(245,211,0,0.6)) 1', paddingTop: '1rem'}}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/90">
        <div>
          <span className="font-heading text-xl font-bold gradient-text">BUILD WITH AI</span>
          <p className="mt-2 text-white/70">© {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
          <p className="mt-2 text-white/60">Mission: Make AI website building effortless and enterprise-ready.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Platform</h4>
          <ul className="space-y-1">
            <li><Link href="/builder" className="hover:underline">Builder</Link></li>
            <li><Link href="/templates" className="hover:underline">Templates</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/trust-center" className="hover:underline">Trust Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <ul className="space-y-1">
            <li><a href="mailto:hello@opsvantage.digital" className="hover:underline">hello@opsvantage.digital</a></li>
            <li><a href="https://twitter.com/opsvantage" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></li>
            <li><a href="https://github.com/opsvantagedigi" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
