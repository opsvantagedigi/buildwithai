import React from 'react'

type Item = { q: string; a: string }

export default function FAQ({ items }: { items: Item[] }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h3 className="text-xl font-bold">Frequently asked questions</h3>
      <div className="mt-6 space-y-4">
        {items.map((it) => (
          <details key={it.q} className="p-4 border rounded">
            <summary className="font-medium">{it.q}</summary>
            <div className="mt-2 text-sm text-slate-700">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
