import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Trust Center — BUILD WITH AI',
  description: 'Security, compliance and privacy practices for BUILD WITH AI customers.',
  keywords: ['security', 'compliance', 'trust'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Trust" title="Security & Trust" subtitle="We prioritize platform security, data protection, and reliability." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-lg font-semibold">Certifications & practices</h3>
        <p className="mt-3 text-slate-700">Encryption, backups, and industry-standard practices to protect your data.</p>
      </section>
      <CTA href="/privacy-policy">Read our privacy policy</CTA>
    </main>
  )
}
