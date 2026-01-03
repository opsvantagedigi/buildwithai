import React from 'react'

const cards = Array.from({ length: 6 }).map((_, i) => ({
  name: `Template ${i + 1}`,
  tags: ['Landing', 'Ecommerce'],
}))

export default function Templates() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h3 className="font-orbitron text-2xl text-white">Templates</h3>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.name} className="group bg-white/5 rounded-lg p-4 hover:translate-y-[-4px] transform transition duration-200">
            <div className="h-40 bg-white/6 rounded-md mb-3 flex items-center justify-center">Preview</div>
            <h4 className="font-inter text-white font-semibold">{c.name}</h4>
            <p className="text-white/70 text-sm mt-1">{c.tags.join(' · ')}</p>
            <div className="mt-3">
              <a className="inline-block text-sm font-medium text-brand-yellow" href="#">Use template</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
