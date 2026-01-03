import Link from 'next/link'
import React from "react";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400','700','900'], display: 'swap' })

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/20 border-t border-white/30 shadow-inner mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-white/90">
        <div>
          <span className={`${orbitron.className} text-xl font-bold bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow bg-clip-text text-transparent`}>BUILD WITH AI</span>
          <p className="mt-2 text-white/70">© {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Products</h4>
          <ul className="space-y-1">
            <li><Link href="/ai-website-builder" className="hover:text-brand-blue">AI Website Builder</Link></li>
            <li><Link href="/ecommerce-ai-builder" className="hover:text-brand-green">Ecommerce AI Builder</Link></li>
            <li><Link href="/wordpress-ai-builder" className="hover:text-brand-yellow">WordPress AI Builder</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li><Link href="/blog" className="hover:text-brand-blue">Blog</Link></li>
            <li><Link href="/case-studies" className="hover:text-brand-green">Case Studies</Link></li>
            <li><Link href="/glossaries" className="hover:text-brand-yellow">Glossaries</Link></li>
            <li><Link href="/comparisons" className="hover:text-brand-blue">Comparisons</Link></li>
            <li><Link href="/newsletter" className="hover:text-brand-green">Newsletter</Link></li>
            <li><Link href="/help-center" className="hover:text-brand-yellow">Help Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-brand-blue">About</Link></li>
            <li><Link href="/affiliates" className="hover:text-brand-green">Affiliates</Link></li>
            <li><Link href="/careers" className="hover:text-brand-yellow">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-brand-blue">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-brand-green">Privacy Policy</Link></li>
            <li><Link href="/trust-center" className="hover:text-brand-yellow">Trust Center</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
