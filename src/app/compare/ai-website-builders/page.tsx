import React from 'react'
import Hero from '@/components/marketing/Hero'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Compare AI Website Builders — BUILD WITH AI',
  description: 'Objective comparison of leading AI website builders highlighting features, performance, and pricing.',
  keywords: ['compare AI builders', 'AI website comparison'],
}

export default function Page() {
  const columns = ['Feature', 'BUILD WITH AI', 'Competitor A', 'Competitor B']
  const rows = [
    { Feature: 'AI Design', 'BUILD WITH AI': 'Yes', 'Competitor A': 'Yes', 'Competitor B': 'Partial' },
    { Feature: 'Export', 'BUILD WITH AI': 'Yes', 'Competitor A': 'No', 'Competitor B': 'No' },
    { Feature: 'Ecommerce', 'BUILD WITH AI': 'Built-in', 'Competitor A': 'App', 'Competitor B': 'App' },
  ]

  return (
    <main>
      <Hero kicker="Compare" title="Compare AI Website Builders" subtitle="Make the right choice with side-by-side features, benchmarks and clear pros/cons." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ComparisonTable columns={columns} rows={rows} />
      </section>
      <CTA href="/pricing">Switch to BUILD WITH AI</CTA>
    </main>
  )
}
