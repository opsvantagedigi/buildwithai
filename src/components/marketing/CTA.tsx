"use client";
import React from 'react'

export default function CTA({ children, href = '/builder' }: { children?: React.ReactNode; href?: string }) {
  return (
    <section className="section-py-32 bg-[var(--color-base)] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mx-auto max-w-3xl card p-8">
          <h3 className="text-2xl font-bold gradient-text">Ready to build with AI?</h3>
          <p className="mt-3 text-sm text-[rgba(255,255,255,0.85)]">Start a free trial and launch a production-ready site in minutes.</p>
          <div className="mt-6">
            <a href={href} className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold shadow-lg transition transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(11,179,138,0.6)]">{children ?? 'Get Started Free'}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
