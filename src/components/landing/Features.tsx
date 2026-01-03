import React from 'react'

const features = [
  { title: 'Instant Previews', desc: 'Preview deterministic snapshots before you publish, eliminating guesswork.' },
  { title: 'Brandable Themes', desc: 'True brand control — gradients, fonts, and layout presets that ship fast.' },
  { title: 'Reliable Delivery', desc: 'KV-backed assets and snapshots for repeatable deploys and consistent pages.' },
]

export default function Features() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-12">
        {features.map((f, i) => {
          const delay = i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : 'delay-300'
          return (
            <div key={f.title} className={`grid gap-6 items-center md:grid-cols-2 ${i % 2 === 0 ? '' : 'md:grid-flow-col-dense'} animate-fade-in-up ${delay}`}>
              <div>
                <h3 className="font-orbitron text-2xl text-white">{f.title}</h3>
                <p className="mt-2 text-white/80 font-inter">{f.desc}</p>
              </div>
              <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-sm">
                <div className="text-white/60">Visual placeholder</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
