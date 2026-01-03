"use client";
import React from 'react'

type Item = { q: string; a: string }

export default function FAQ({ items }: { items: Item[] }) {
  return (
    <section className="max-w-4xl mx-auto px-6 section-py-32">
      <h3 className="text-xl font-bold gradient-text">Frequently asked questions</h3>
      <div className="mt-6 space-y-4">
        {items.map((it) => (
          <details key={it.q} className="card p-4 rounded-lg">
            <summary className="font-medium gradient-text">{it.q}</summary>
            <div className="mt-2 text-sm text-[rgba(255,255,255,0.85)]">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
