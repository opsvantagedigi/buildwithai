import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'About Us — BUILD WITH AI',
  description: 'BUILD WITH AI mission, team and story — building the future of websites with AI-driven workflows.',
  keywords: ['about', 'company', 'team'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Company" title="About BUILD WITH AI" subtitle="We help teams ship better websites with AI-first tools." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-lg font-semibold">Our mission</h3>
        <p className="mt-3 text-slate-700">To make high-quality websites accessible through AI automation and developer-friendly workflows.</p>
      </section>
      <CTA href="/careers">Join our team</CTA>
    </main>
  )
}
