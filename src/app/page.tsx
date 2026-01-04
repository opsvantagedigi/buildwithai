import React from 'react'
import '@/styles/landing.css'
import { HeroCursorLightProvider } from '@/components/HeroCursorLightProvider'

export const metadata = {
  title: 'Build With AI — AI-Native Web Infrastructure',
  description:
    'Calm, confident, intelligent tools for launching AI-native websites — intent-aware, structure-first, and optimized over time.',
}

export default function Home() {
  return (
    <main className="landing-root">

      <HeroCursorLightProvider />

      <section
        id="hero"
        className="bw-hero relative overflow-hidden"
      >
        {/* Cinematic background layers */}
        <div className="bw-hero-bg bw-hero-glow-layer" aria-hidden="true" />
        <div className="bw-hero-bg bw-hero-flow-grid" aria-hidden="true" />

        {/* Cursor-reactive light */}
        <div className="bw-hero-bg bw-hero-cursor-light" aria-hidden="true" />

        {/* Content container */}
        <div className="bw-container bw-hero-inner">
          <div className="bw-hero-grid">
            {/* Left: text content */}
            <div className="bw-hero-copy">
              <p className="bw-eyebrow">AI Website Builder for founders who care</p>
              <h1 className="bw-hero-title">
                Build a world-class website with AI,
                <span className="bw-hero-title-highlight"> without losing your story.</span>
              </h1>
              <p className="bw-hero-subtitle">
                Build With AI is your cinematic, founder-grade website builder. Capture your voice,
                ship beautiful pages, and keep every deployment auditable, repeatable, and on your terms.
              </p>

              {/* Cinematic prompt panel - new */}
              <div className="bw-hero-prompt-panel">
                <div className="bw-hero-prompt-banner">
                  <span className="bw-hero-prompt-badge">🌟 New</span>
                  <span className="bw-hero-prompt-banner-text">Introducing cinematic AI builder templates</span>
                </div>

                <div className="bw-hero-prompt-main">
                  <h2 className="bw-hero-prompt-title">Describe your website in a few words.</h2>
                  <p className="bw-hero-prompt-subtitle">
                    Tell Build With AI what you’re building — we assemble a cinematic layout, you keep control of every detail.
                  </p>

                  <div className="bw-hero-prompt-input-row">
                    <div className="bw-hero-prompt-input-shell">
                      <input
                        type="text"
                        className="bw-hero-prompt-input"
                        placeholder="“A founder-grade landing page for my AI studio…”"
                        aria-label="Describe your website"
                      />
                      <div className="bw-hero-prompt-input-icons">
                        <button type="button" className="bw-hero-prompt-icon-btn" aria-label="Insert example">+</button>
                        <button type="button" className="bw-hero-prompt-icon-btn" aria-label="Use microphone">🎤</button>
                        <button type="button" className="bw-hero-prompt-icon-btn bw-hero-prompt-icon-primary" aria-label="Generate layout">➜</button>
                      </div>
                    </div>
                  </div>

                  <div className="bw-hero-prompt-features">
                    <span className="bw-hero-prompt-feature">Founder-grade templates</span>
                    <span className="bw-hero-prompt-feature">Instant publishing</span>
                    <span className="bw-hero-prompt-feature">No lock-in</span>
                  </div>
                </div>
              </div>

              <div className="bw-hero-cta-row">
                <a href="/builder/start" className="bw-btn bw-btn-primary">
                  Start building with AI
                </a>
                <a href="/compare/ai-website-builders" className="bw-btn bw-btn-ghost">
                  See why we’re different
                </a>
              </div>

              <div className="bw-hero-meta">
                <span>Deterministic builds · No lock-in · Founder-grade rituals</span>
              </div>
            </div>

            {/* Right: hero visual panel */}
            <div className="bw-hero-visual-wrapper">
              <div className="bw-hero-visual-glow" aria-hidden="true" />
              <div className="bw-hero-visual-panel">
                <div className="bw-hero-visual-header">
                  <span className="bw-pill">Live preview</span>
                  <span className="bw-hero-visual-meta">Cinematic AI layout · In one click</span>
                </div>
                <div className="bw-hero-visual-body">
                  <div className="bw-hero-visual-line bw-hero-visual-line-primary" />
                  <div className="bw-hero-visual-line bw-hero-visual-line-secondary" />
                  <div className="bw-hero-visual-mock">
                    <span className="bw-hero-visual-mock-title">Your brand, not a template.</span>
                    <span className="bw-hero-visual-mock-subtitle">
                      AI assembles sections, you keep control of every detail.
                    </span>
                  </div>
                </div>
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
  );
}


