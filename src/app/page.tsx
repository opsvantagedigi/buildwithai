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
      <section className="bw-hero">
        <div className="bw-hero-inner">
          {/* LEFT: Story + trust */}
          <div className="bw-hero-left">
            <p className="bw-hero-eyebrow">
              AI WEBSITE BUILDER FOR FOUNDERS
            </p>

            <h1 className="bw-hero-title">
              Build a world-class website with AI,
              <br />
              without losing your story.
            </h1>

            <p className="bw-hero-subtitle">
              Build With AI is your cinematic, founder-grade website builder. Capture your voice,
              ship beautiful pages, and keep every deployment auditable, repeatable, and on your terms.
            </p>

            <p className="bw-hero-trustline">
              Deterministic builds · No lock-in · Founder-grade rituals
            </p>
          </div>

          {/* RIGHT: Founder Brief Composer card */}
          <div className="bw-hero-right">
            <div className="bw-hero-brief-card">
              <div className="bw-hero-brief-header">
                <span className="bw-pill-new">New</span>
                <span className="bw-hero-brief-label">
                  Cinematic AI builder templates
                </span>
              </div>

              <div className="bw-hero-brief-copy">
                <h2 className="bw-hero-brief-title">
                  Describe your website in a few words.
                </h2>
                <p className="bw-hero-brief-subtitle">
                  We turn your founder brief into a cinematic, audit-ready website —
                  you keep control of every detail.
                </p>
              </div>

              <div className="bw-hero-brief-input-shell">
                <input
                  className="bw-hero-brief-input"
                  type="text"
                  placeholder="A founder-grade landing page for my AI studio, focused on trust and long-term clients…"
                />
              </div>

              <div className="bw-hero-brief-examples">
                <span className="bw-hero-brief-examples-label">Examples:</span>
                <span className="bw-hero-brief-example">
                  Productized consulting studio for deep-tech founders
                </span>
                <span className="bw-hero-brief-example">
                  Cinematic personal site for an AI researcher
                </span>
              </div>

              <div className="bw-hero-brief-chips">
                <span className="bw-hero-brief-chip">Founder-grade templates</span>
                <span className="bw-hero-brief-chip">Instant publishing</span>
                <span className="bw-hero-brief-chip">No lock-in</span>
              </div>

              <div className="bw-hero-brief-ctas">
                <a href="/builder/start" className="bw-btn bw-btn-primary bw-btn-orbitron">
                  Generate my first layout
                </a>
                <a href="/about" className="bw-hero-brief-secondary">
                  Watch a 60-second walkthrough
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ...existing code... */}
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


