import React from 'react'

const quotes = [
  { text: 'BuildWithAI cut our time to launch in half.', author: 'Alex — Founder' },
  { text: 'Deterministic publishing saved our team hours.', author: 'Sam — CTO' },
]

export default function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h3 className="font-orbitron text-2xl text-white text-center">Trusted by teams</h3>
      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        {quotes.map((q, i) => (
          <blockquote key={i} className="bg-white/5 p-6 rounded-lg">
            <p className="text-white/90">“{q.text}”</p>
            <footer className="mt-3 text-white/70 text-sm">— {q.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
