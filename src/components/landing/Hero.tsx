import React from 'react'

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container mx-auto px-6 py-28 md:py-36 lg:py-48">
        <div className="max-w-3xl">
          <h1 className="font-orbitron text-white text-4xl md:text-[3.5rem] lg:text-[4.25rem] leading-[1.02] animate-fade-in-up delay-100">
            Launch your site — built by AI, trusted by founders.
          </h1>
          <p className="mt-4 text-white/95 font-inter text-lg md:text-xl animate-fade-in-up delay-200">
            Generate, customize, and publish SEO‑ready websites in minutes — deterministic snapshots, predictable deploys.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="#start"
              aria-label="Get started with BuildWithAI"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-brand-yellow text-black font-medium shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300 animate-fade-in-up delay-300"
            >
              Start building
            </a>
            <a
              href="#learn"
              aria-label="Learn more about BuildWithAI"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-white/20 text-white font-medium bg-white/3 hover:bg-white/6 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300 animate-fade-in-up delay-300"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="w-full h-56 md:h-96 bg-white/5 rounded-lg flex items-center justify-center parallax" aria-hidden="true">
            <svg width="80%" height="80%" viewBox="0 0 800 400" role="img" aria-hidden="true">
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
