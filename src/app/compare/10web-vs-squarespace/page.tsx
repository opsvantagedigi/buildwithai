import React from 'react'
import Hero from '@/components/marketing/Hero'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: '10Web vs Squarespace — BUILD WITH AI',
  description: 'Compare BUILD WITH AI with Squarespace on customization, performance and AI content.',
  keywords: ['10Web vs Squarespace', 'compare squarespace'],
}

export default function Page() {
  const columns = ['Category', 'BUILD WITH AI', 'Squarespace']
  const rows = [
    { Category: 'Customization', 'BUILD WITH AI': 'High', Squarespace: 'Moderate' },
    { Category: 'Performance', 'BUILD WITH AI': 'Optimized', Squarespace: 'Good' },
    { Category: 'AI Tools', 'BUILD WITH AI': 'Built-in', Squarespace: 'Third-party' },
  ]

  return (
    <main>
      <Hero kicker="Compare" title="BUILD WITH AI vs Squarespace" subtitle="A practical comparison for teams choosing a platform in 2026." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ComparisonTable columns={columns} rows={rows} />
      </section>
      <CTA href="/pricing">Try BUILD WITH AI</CTA>
    </main>
  )
}
