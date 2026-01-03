import React from 'react'

const items = [
  { title: 'Launch Faster', copy: 'From template to live site in minutes with deterministic publishes.' },
  { title: 'Predictable Deploys', copy: 'Snapshots and KV-backed storage ensure consistent, repeatable builds.' },
  { title: 'Founder-first UX', copy: 'Simple controls, focused workflows — no designer or dev required.' },
]

export default function ValueProps() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-orbitron text-3xl text-white">Why BuildWithAI</h2>
        <p className="mt-3 text-white/80 font-inter">A production-ready site workflow that prioritizes speed, reliability, and founder time.</p>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        {items.map((it, idx) => (
          <div key={it.title} tabIndex={0} role="group" className="bg-white/5 rounded-lg p-6 animate-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300" aria-label={it.title}>
            <div className="w-12 h-12 bg-white/10 rounded-md mb-4 flex items-center justify-center" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8" /></svg>
            </div>
            <h3 className="font-inter font-semibold text-white">{it.title}</h3>
            <p className="mt-2 text-white/80 text-sm">{it.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
