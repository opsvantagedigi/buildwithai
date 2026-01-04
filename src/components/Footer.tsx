import Link from 'next/link'
import React from "react";

export default function Footer() {
  return (
    <footer className="fixed left-0 right-0 bottom-0 z-40 glass-footer" style={{borderImage: 'linear-gradient(90deg, rgba(11,59,138,0.6), rgba(11,179,138,0.6), rgba(245,211,0,0.6)) 1', paddingTop: '1rem'}}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/90">
        <div className="footer-section">
          <span className="footer-logo text-xl font-bold gradient-text">BUILD WITH AI</span>
          <p className="mt-2 footer-legal">© {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
          <p className="mt-2 footer-legal">Mission: Make AI website building effortless and enterprise-ready.</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading mb-2">Platform</h4>
          <ul className="space-y-1">
            <li><Link href="/builder" className="footer-link">Builder</Link></li>
            <li><Link href="/templates" className="footer-link">Templates</Link></li>
            <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
            <li><Link href="/terms" className="footer-link">Terms</Link></li>
            <li><Link href="/trust-center" className="footer-link">Trust Center</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading mb-2">Contact</h4>
          <ul className="space-y-1">
            <li><a href="mailto:hello@opsvantage.digital" className="footer-link">hello@opsvantage.digital</a></li>
            <li className="footer-social"><a href="https://twitter.com/opsvantage" target="_blank" rel="noreferrer" className="footer-link">Twitter</a></li>
            <li className="footer-social"><a href="https://github.com/opsvantagedigi" target="_blank" rel="noreferrer" className="footer-link">GitHub</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
