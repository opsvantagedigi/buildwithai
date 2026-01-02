import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Affiliates — BUILD WITH AI',
  description: 'Join our affiliate program and earn for referring new customers to BUILD WITH AI.',
  keywords: ['affiliates', 'partners', 'referral'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Partners" title="Affiliate Program" subtitle="Earn by referring customers and partners to BUILD WITH AI." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-slate-700">Competitive commissions, easy tracking and marketing assets for partners.</p>
      </section>
      <CTA href="/contact">Become a partner</CTA>
    </main>
  )
}
