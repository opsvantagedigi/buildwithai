import React from 'react'

const steps = [
  { title: 'Choose a template', desc: 'Start with a proven layout and messaging.' },
  { title: 'Customize with AI', desc: 'AI suggests copy, images, and structure.' },
  { title: 'Publish & Snapshot', desc: 'Publish deterministic snapshots to KV.' },
]

export default function HowItWorks() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h3 className="font-orbitron text-2xl text-white text-center">How it works</h3>
      <div className="mt-8 space-y-6">
        {steps.map((s, idx) => (
          <div key={s.title} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">{idx + 1}</div>
            <div>
              <h4 className="font-inter font-semibold text-white">{s.title}</h4>
              <p className="text-white/80 text-sm mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
