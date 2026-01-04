import Link from 'next/link'
import React from "react";
import NavDropdown from './NavDropdown'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bw-header">
      <div className="bw-header-inner">
        <a href="/" className="bw-header-logo-link">
          <div className="bw-header-logo">
            <div className="bw-logo-mark" aria-hidden="true" />
            <span className="bw-logo-text">Build With AI</span>
          </div>
        </a>

        <div className="bw-header-desktop">
          <nav className="bw-header-nav">
            <a href="/#platform" className="bw-header-link">Platform</a>
            <a href="/#solutions" className="bw-header-link">Solutions</a>
            <a href="/docs" className="bw-header-link">Docs</a>
            <a href="/pricing" className="bw-header-link">Pricing</a>
          </nav>
          <div className="bw-header-actions">
            <a href="/signin" className="bw-header-link bw-header-link-muted">Sign in</a>
            <a href="/builder/start" className="bw-btn bw-btn-ghost">Start building – free</a>
          </div>
        </div>

        <button
          className="bw-header-menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
        </button>
      </div>

      <div className={`bw-header-mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <nav className="bw-header-nav">
          <a href="/#platform" className="bw-header-link">Platform</a>
          <a href="/#solutions" className="bw-header-link">Solutions</a>
          <a href="/docs" className="bw-header-link">Docs</a>
          <a href="/pricing" className="bw-header-link">Pricing</a>
        </nav>
        <div className="bw-header-actions">
          <a href="/signin" className="bw-header-link bw-header-link-muted">Sign in</a>
          <a href="/builder/start" className="bw-btn bw-btn-ghost">Start building – free</a>
        </div>
      </div>
    </header>
  );
}
