import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Case Studies — BUILD WITH AI',
  description: 'See how agencies and creators use BUILD WITH AI to accelerate launches and grow revenue.',
  keywords: ['case studies', 'success stories', 'ai websites'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Customers" title="Case Studies" subtitle="Real results from teams using AI to design, launch, and convert." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <article className="p-6 border rounded mb-6">
          <h3 className="font-semibold">Agency X — 3x Faster Launches</h3>
          <p className="mt-2 text-slate-700">Using BUILD WITH AI, Agency X reduced launch time and increased client throughput.</p>
        </article>
      </section>
      <CTA href="/contact">Talk to sales</CTA>
    </main>
  )
}
