import React from 'react'

type Feature = { title: string; desc: string }

export default function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <article key={f.title} className="p-6 bg-white/60 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
