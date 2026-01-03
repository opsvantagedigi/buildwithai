import React from 'react'

const items = [
  { title: 'AI Templates', copy: 'Starter templates optimized for conversion and SEO.' },
  { title: 'Deterministic Publish', copy: 'Snapshots stored and served reliably from KV.' },
  { title: 'Founder UX', copy: 'Fast workflows designed for founders and small teams.' },
]

export default function ValueProps() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-orbitron text-3xl text-brand-blue">Why BuildWithAI</h2>
        <p className="mt-3 text-gray-700 font-inter">A focused toolchain for founders who need reliable websites, fast.</p>
      </div>

      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="bg-white/5 rounded-lg p-6">
            <div className="w-12 h-12 bg-white/10 rounded-md mb-4 flex items-center justify-center" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8" /></svg>
            </div>
            <h3 className="font-inter font-semibold text-white">{it.title}</h3>
            <p className="mt-2 text-white/80 text-sm">{it.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
