"use client";
import React from 'react'

export default function Benefits({ children }: { children?: React.ReactNode }) {
  return (
    <section className="section-py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold gradient-text">Why BUILD WITH AI</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-gap-8">{children}</div>
      </div>
    </section>
  )
}
