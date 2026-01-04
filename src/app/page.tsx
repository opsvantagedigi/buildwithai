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

      <section className="hero container cinematic">
        <div className="hero-content">
          <h2 className="orbitron headline font-orbitron">Ship AI-first websites with confidence</h2>
          <p className="inter subhead font-inter">Intent-aware generation, structure-first layouts, and continuous optimization — built for teams that move fast and stay reliable.</p>
          <div className="cta-stack">
            <a className="btn primary" href="/builder">Start building — free</a>
            <a className="btn ghost" href="/docs">How it works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="ai-reasoning">
            <div className="step">Intent</div>
            <div className="arrow" aria-hidden>→</div>
            <div className="step">Structure</div>
            <div className="arrow" aria-hidden>→</div>
            <div className="step">Generation</div>
            <div className="arrow" aria-hidden>→</div>
            <div className="step">Optimization</div>
            <div className="arrow" aria-hidden>→</div>
            <div className="step">Improvement</div>
          </div>
        </div>
      </section>

      <section className="intent-aware container">
        <h3 className="section-title font-orbitron">Intent-aware AI</h3>
        <p className="lead font-inter">Our AI adapts to user intent and business goals — not just templates. It reasons about purpose, then maps that intent to structure and content that scales.</p>
      </section>

      <section className="how container">
        <h3 className="section-title font-orbitron">How it works</h3>
        <ol className="steps">
          <li><strong className="font-orbitron">Define intent:</strong> <span className="font-inter">Describe goals, users, and outcomes.</span></li>
          <li><strong className="font-orbitron">Structure:</strong> <span className="font-inter">AI proposes information architecture and layout.</span></li>
          <li><strong className="font-orbitron">Generate:</strong> <span className="font-inter">Content and components are produced and reviewed.</span></li>
          <li><strong className="font-orbitron">Optimize:</strong> <span className="font-inter">Continuous learning refines copy and UX.</span></li>
        </ol>
      </section>

      <section className="features container">
        <h3 className="section-title font-orbitron">Features by intelligence layer</h3>
        <div className="feature-grid">
          <article className="feature">
            <h4 className="font-orbitron">Perception</h4>
            <p className="font-inter">Data ingest, content understanding, and semantic indexing.</p>
          </article>
          <article className="feature">
            <h4 className="font-orbitron">Reasoning</h4>
            <p className="font-inter">Intent mapping, structure synthesis, and decision trees.</p>
          </article>
          <article className="feature">
            <h4 className="font-orbitron">Generation</h4>
            <p className="font-inter">High-fidelity content, layout code, and assets.</p>
          </article>
          <article className="feature">
            <h4 className="font-orbitron">Optimization</h4>
            <p className="font-inter">Performance tuning, A/B suggestions, and iterative improvement.</p>
          </article>
        </div>
      </section>

      <section className="comparison container">
        <h3 className="section-title font-orbitron">Automation vs Intelligence</h3>
        <div className="comparison-grid">
          <div className="col auto">
            <h4 className="font-orbitron">Automation</h4>
            <ul>
              <li>Repeatable tasks</li>
              <li>Rule-driven</li>
              <li>Fast to run</li>
            </ul>
          </div>
          <div className="col intel">
            <h4 className="font-orbitron">Intelligence</h4>
            <ul>
              <li>Goal-directed decisions</li>
              <li>Context-aware</li>
              <li>Improves over time</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="emotional-cta container glass">
        <h3 className="font-orbitron">Build with calm confidence</h3>
        <p className="lead font-inter">Join teams using AI-native infrastructure to deliver predictable outcomes and human-centered experiences.</p>
        <a className="btn large primary" href="/signup">Get early access</a>
      </section>

      <footer className="landing-footer glass glass-edge-gradient">
        <div className="container footer-inner">
          <p className="font-inter">Building the future of AI-native websites.</p>
          <small>&copy; {new Date().getFullYear()} Build With AI</small>
        </div>
      </footer>
    </main>
  )
}


