import React from 'react'

const features = [
  { title: 'Fast Builds', desc: 'Incremental builds and optimized assets for speed.' },
  { title: 'Customizable Themes', desc: 'Blend brand gradients, typography, and layout.' },
  { title: 'Reliable Hosting', desc: 'Deterministic publish and KV snapshots.' },
]

export default function Features() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="space-y-12">
        {features.map((f, i) => (
          <div key={f.title} className={`grid gap-6 items-center md:grid-cols-2 ${i % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}>
            <div>
              <h3 className="font-orbitron text-2xl text-white">{f.title}</h3>
              <p className="mt-2 text-white/80 font-inter">{f.desc}</p>
            </div>
            <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
              <div className="text-white/60">Visual placeholder</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
