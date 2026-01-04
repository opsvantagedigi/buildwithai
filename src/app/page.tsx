import React from 'react'
import '@/styles/landing.css'

export const metadata = {
  title: 'Build With AI — AI-Native Web Infrastructure',
  description:
    'Calm, confident, intelligent tools for launching AI-native websites — intent-aware, structure-first, and optimized over time.',
}

export default function Home() {
  return (
    <main className="landing-root">
      <header className="landing-header glass glass-edge-gradient">
        <div className="container">
          <div className="brand">
            <h1 className="brand-mark font-orbitron">Build With AI</h1>
            <p className="brand-tag font-inter">AI-Native Web Infrastructure</p>
          </div>
          <nav className="nav orbitron">
            <ul>
              <li className="nav-item">Platform<span className="micro">— Automation + AI</span></li>
              <li className="nav-item">Solutions<span className="micro">— Templates</span></li>
              <li className="nav-item">Docs<span className="micro">— Guides</span></li>
              <li className="nav-item">Pricing<span className="micro">— Plans</span></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="bw-hero">
        <div className="container bw-hero-inner">
          <div className="bw-hero-copy">
            <h2 className="bw-hero-title">Calm, confident tools for AI-native websites</h2>
            <p className="bw-hero-sub">Intent-aware generation, structure-first, optimized over time.</p>
            <div className="bw-hero-actions">
              <a href="#start" className="bw-cta bw-cta-primary">Get started — it's free</a>
              <a href="#how-it-works" className="bw-cta bw-cta-secondary">How it works</a>
            </div>
            <p className="bw-hero-meta">No credit card. Live in minutes. Evolving with every release.</p>
          </div>

          <div className="bw-hero-panel glass-surface">
            <div className="bw-panel-heading">AI reasoning flow</div>
            <div className="bw-flow-steps">
              <div className="bw-flow-step">
                <span>Intent</span>
                <p>Describe your goals, audience, and outcomes.</p>
              </div>
              <div className="bw-flow-step">
                <span>Structure</span>
                <p>AI plans the information architecture before visuals.</p>
              </div>
              <div className="bw-flow-step">
                <span>Generation</span>
                <p>Pages, sections, and copy generated to match intent.</p>
              </div>
              <div className="bw-flow-step">
                <span>Optimization</span>
                <p>Performance, SEO, and clarity tuned automatically.</p>
              </div>
              <div className="bw-flow-step">
                <span>Improvement</span>
                <p>Suggestions as your content, traffic, and goals evolve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intent-aware AI */}
      <section id="solutions" className="bw-section bw-intent">
        <div className="bw-section-header container">
          <h2 className="bw-section-title">AI that understands what you&apos;re building.</h2>
          <p className="bw-section-subtitle">Most builders generate pages. This one understands what you&apos;re trying to achieve — and aligns structure, layout, and copy to your business goals.</p>
        </div>
        <div className="container bw-grid bw-grid-3">
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Intent-aware planning</h3>
            <p className="bw-card-body">Knows the difference between a portfolio, a funnel, and a full product site — and structures them accordingly.</p>
          </div>
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Structure before pixels</h3>
            <p className="bw-card-body">Information architecture comes first: hierarchy, flows, and navigation built for clarity and conversion.</p>
          </div>
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Continuous optimization</h3>
            <p className="bw-card-body">Layout, messaging, and performance improve over time as the system learns from real usage.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bw-section bw-how">
        <div className="bw-section-header container">
          <h2 className="bw-section-title">How it works</h2>
          <p className="bw-section-subtitle">From idea to deployed site — with intent, structure, and optimization baked in from the first prompt.</p>
        </div>
        <div className="container bw-how-grid">
          <div className="bw-how-step glass-surface">
            <span className="bw-how-label">01</span>
            <h3 className="bw-card-title">Define intent</h3>
            <p className="bw-card-body">Explain your business, audience, and what “success” looks like. Not just pages — outcomes.</p>
          </div>
          <div className="bw-how-step glass-surface">
            <span className="bw-how-label">02</span>
            <h3 className="bw-card-title">AI plans the structure</h3>
            <p className="bw-card-body">The system proposes an information architecture and layout flow tuned to your goals.</p>
          </div>
          <div className="bw-how-step glass-surface">
            <span className="bw-how-label">03</span>
            <h3 className="bw-card-title">Generate the experience</h3>
            <p className="bw-card-body">Pages, sections, and copy are generated with brand-consistent patterns you can refine in the editor.</p>
          </div>
          <div className="bw-how-step glass-surface">
            <span className="bw-how-label">04</span>
            <h3 className="bw-card-title">Optimize continuously</h3>
            <p className="bw-card-body">As traffic grows, AI suggests improvements for clarity, speed, and conversion — without starting over.</p>
          </div>
        </div>
      </section>

      {/* Intelligence layers */}
      <section id="features" className="bw-section bw-layers">
        <div className="bw-section-header container">
          <h2 className="bw-section-title">Features by intelligence layer</h2>
          <p className="bw-section-subtitle">One system, four layers — from intent to optimization. No stitched tools, no plugin chaos.</p>
        </div>
        <div className="container bw-grid bw-grid-4">
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Creation</h3>
            <p className="bw-card-body">AI website generation, on-brand copy, and smart image suggestions aligned to your intent.</p>
          </div>
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Control</h3>
            <p className="bw-card-body">Visual editor, section-level regeneration, and manual overrides when you want full control.</p>
          </div>
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Optimization</h3>
            <p className="bw-card-body">Performance tuning, SEO-aware structures, and layout suggestions driven by real usage.</p>
          </div>
          <div className="bw-card glass-surface">
            <h3 className="bw-card-title">Infrastructure</h3>
            <p className="bw-card-body">Hosting, CDN, security, and backups — AI-native infrastructure ready for production.</p>
          </div>
        </div>
      </section>

      {/* Automation vs Intelligence */}
      <section id="compare" className="bw-section bw-compare">
        <div className="bw-section-header container">
          <h2 className="bw-section-title">Automation vs intelligence</h2>
          <p className="bw-section-subtitle">Automation repeats tasks. Intelligence understands goals — and improves how you reach them.</p>
        </div>
        <div className="container bw-compare-grid glass-surface">
          <div className="bw-compare-column">
            <h3 className="bw-card-title">Automation</h3>
            <ul className="bw-list">
              <li>Repeatable tasks</li>
              <li>Rule-driven flows</li>
              <li>Fast, but rigid</li>
            </ul>
          </div>
          <div className="bw-compare-column">
            <h3 className="bw-card-title">Intelligence</h3>
            <ul className="bw-list">
              <li>Goal-directed decisions</li>
              <li>Context-aware experiences</li>
              <li>Improves over time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="bw-section bw-final-cta">
        <div className="container bw-final-cta-inner glass-surface">
          <h2 className="bw-section-title">Stop wrestling with websites. Start working with one.</h2>
          <p className="bw-section-subtitle">Let AI handle structure, speed, and optimization — so you can stay focused on the work that actually moves the needle.</p>
          <a href="#start" className="bw-cta bw-cta-primary">Generate my website</a>
        </div>
      </section>
    </main>
  )


