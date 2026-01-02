import React from 'react'
import Hero from '@/components/marketing/Hero'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: '10Web vs Wix — BUILD WITH AI',
  description: 'A focused comparison between BUILD WITH AI and leading site builders like Wix to help you choose the right platform.',
  keywords: ['10Web vs Wix', 'compare 10Web Wix'],
}

export default function Page() {
  const columns = ['Category', 'BUILD WITH AI', 'Wix']
  const rows = [
    { Category: 'AI Content', 'BUILD WITH AI': 'Advanced', Wix: 'Limited' },
    { Category: 'Performance', 'BUILD WITH AI': 'Optimized', Wix: 'Good' },
    { Category: 'Export', 'BUILD WITH AI': 'Yes', Wix: 'No' },
  ]

  return (
    <main>
      <Hero kicker="Compare" title="BUILD WITH AI vs Wix" subtitle="See how BUILD WITH AI focuses on performance, AI content, and developer workflows." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ComparisonTable columns={columns} rows={rows} />
        <div className="mt-6 text-sm text-slate-700">Performance benchmarks are representative and based on synthetic lab tests.</div>
      </section>
      <CTA href="/pricing">Migrate to BUILD WITH AI</CTA>
    </main>
  )
}
