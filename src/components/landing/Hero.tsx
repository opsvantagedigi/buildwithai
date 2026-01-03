import React from 'react'

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="font-orbitron text-white text-[2.5rem] md:text-[4rem] leading-tight">
            Build fast. Beautiful sites. With AI.
          </h1>
          <p className="mt-4 text-white/90 font-inter text-lg md:text-xl">
            Generate SEO-ready websites, templates, and snapshots that publish deterministically — built for founders.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#start" className="inline-flex items-center px-6 py-3 rounded-md bg-brand-yellow text-black font-medium shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300">
              Get started
            </a>
            <a href="#learn" className="inline-flex items-center px-5 py-3 rounded-md border border-white/20 text-white font-medium">
              Learn more
            </a>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="w-full h-56 md:h-96 bg-white/5 rounded-lg flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 800 400" role="img" aria-label="Abstract AI visual placeholder">
              <rect width="800" height="400" rx="16" fill="url(#g)" />
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FFD23F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#00594C" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
