import React from 'react'

type Props = {
  title: string
  kicker?: string
  subtitle?: string
}

export default function Hero({ title, kicker, subtitle }: Props) {
  return (
    <header className="max-w-6xl mx-auto px-6 py-16">
      {kicker && <p className="text-sm text-sky-600 font-semibold">{kicker}</p>}
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">{title}</h1>
      {subtitle && <p className="mt-6 text-lg text-slate-700 max-w-3xl">{subtitle}</p>}
    </header>
  )
}
