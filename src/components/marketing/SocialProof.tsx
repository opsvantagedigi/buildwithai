"use client";
import React from 'react'

export default function SocialProof({ logos = [] }: { logos?: string[] }) {
  return (
    <section className="section-py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-lg font-medium gradient-text">Trusted by teams and creators</h3>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          {logos.length === 0 ? (
            <p className="text-sm text-[rgba(255,255,255,0.85)]">Join thousands of builders using BUILD WITH AI.</p>
          ) : (
            logos.map((l, i) => (
              <img key={i} src={l} alt={`logo-${i}`} className="h-8 opacity-80" />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
