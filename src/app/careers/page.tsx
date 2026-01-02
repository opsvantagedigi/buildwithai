import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Careers — BUILD WITH AI',
  description: 'Open roles at BUILD WITH AI. Join us in building the next generation of website tools powered by AI.',
  keywords: ['careers', 'jobs', 'hiring'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Careers" title="Work with us" subtitle="We are hiring engineers, designers, and go-to-market talent to scale BUILD WITH AI." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-lg font-semibold">Open roles</h3>
        <p className="mt-3 text-slate-700">Check our careers page for up-to-date openings and apply online.</p>
      </section>
      <CTA href="/contact">Contact recruiting</CTA>
    </main>
  )
}
