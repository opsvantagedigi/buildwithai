import React from 'react'
import Hero from '@/components/marketing/Hero'
import FAQ from '@/components/marketing/FAQ'

export const metadata = {
  title: 'Help Center — BUILD WITH AI',
  description: 'Documentation, troubleshooting guides, and support for BUILD WITH AI customers.',
  keywords: ['help center', 'support', 'docs'],
}

export default function Page() {
  const faq = [
    { q: 'Where are the docs?', a: 'Visit the Docs hub for guides on building, domains, and publishing.' },
    { q: 'How to contact support?', a: 'Use the contact page or in-app support to open a ticket.' },
  ]

  return (
    <main>
      <Hero kicker="Support" title="Help Center" subtitle="Find guides, troubleshooting steps and product docs." />
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-lg font-medium">Popular guides</h3>
        <ul className="mt-4 list-disc pl-6 text-slate-700">
          <li><a href="/docs/getting-started">Getting started</a></li>
          <li><a href="/docs/publishing">Publishing and domains</a></li>
        </ul>
      </section>
      <FAQ items={faq} />
    </main>
  )
}
