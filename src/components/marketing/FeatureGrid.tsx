"use client";
import React from 'react'

type Feature = { title: string; desc: string }

export default function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <section className="max-w-6xl mx-auto px-6 section-py-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-gap-8">
        {items.map((f, idx) => (
          <article key={f.title} className={`card p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(11,179,138,0.12)]`} style={{animation: `fadeUp 600ms ease forwards`, animationDelay: `${idx * 80}ms`, opacity: 0}}>
            <h3 className="font-semibold text-lg gradient-text">{f.title}</h3>
            <p className="mt-2 text-sm text-[rgba(255,255,255,0.85)]">{f.desc}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  )
}
