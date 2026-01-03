"use client";
import React from 'react'

type Props = {
  title: string
  kicker?: string
  subtitle?: string
}

export default function Hero({ title, kicker, subtitle }: Props) {
  return (
    <header className="max-w-6xl mx-auto px-6 section-py-32">
      {kicker && <p className="text-sm text-sky-400 font-semibold">{kicker}</p>}
      <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold leading-tight gradient-text fade-up">{title}</h1>
      {subtitle && <p className="mt-6 text-lg text-[rgba(255,255,255,0.85)] max-w-3xl fade-up" style={{animationDelay: '120ms'}}>{subtitle}</p>}

      <style jsx>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { opacity: 0; animation: fadeUp 600ms ease forwards; }
      `}</style>
    </header>
  )
}
