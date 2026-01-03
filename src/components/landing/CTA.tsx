import React from 'react'

export default function CTA() {
  return (
    <section className="bg-white/3 py-12">
      <div className="container mx-auto px-6 text-center">
        <h4 className="font-orbitron text-2xl text-white animate-fade-in-up delay-100">Ready to launch your site?</h4>
        <p className="mt-2 text-white/80 font-inter animate-fade-in-up delay-200">Ship a production-ready site with deterministic publishes and predictable hosting.</p>
        <div className="mt-6">
          <a
            href="#start"
            aria-label="Start building with BuildWithAI"
            className="inline-block px-8 py-3 bg-brand-yellow text-black rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300 transform transition-all duration-200 hover:scale-105 shadow-lg animate-fade-in-up delay-300"
          >
            Start your site — it's free to try
          </a>
        </div>
      </div>
    </section>
  )
}
