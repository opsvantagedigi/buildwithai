import React from 'react'

export default function CTA() {
  return (
    <section className="bg-white/3 py-12">
      <div className="container mx-auto px-6 text-center">
        <h4 className="font-orbitron text-2xl text-white">Ready to launch?</h4>
        <p className="mt-2 text-white/80 font-inter">Start building a high-performance site in minutes.</p>
        <div className="mt-6">
          <a href="#start" className="inline-block px-8 py-3 bg-brand-yellow text-black rounded-md font-medium">Get started</a>
        </div>
      </div>
    </section>
  )
}
