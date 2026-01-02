import React from 'react'
import Hero from '@/components/marketing/Hero'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: '10Web vs WordPress — BUILD WITH AI',
  description: 'A comparison between BUILD WITH AI and WordPress workflows focusing on speed and export options.',
  keywords: ['10Web vs WordPress', 'compare wordpress'],
}

export default function Page() {
  const columns = ['Category', 'BUILD WITH AI', 'WordPress']
  const rows = [
    { Category: 'Export', 'BUILD WITH AI': 'Yes', WordPress: 'Yes' },
    { Category: 'Managed Hosting', 'BUILD WITH AI': 'Included', WordPress: 'Depends' },
    { Category: 'AI Tools', 'BUILD WITH AI': 'Built-in', WordPress: 'Plugins' },
  ]

  return (
    <main>
      <Hero kicker="Compare" title="BUILD WITH AI vs WordPress" subtitle="When to use BUILD WITH AI vs a WordPress-first workflow." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ComparisonTable columns={columns} rows={rows} />
      </section>
      <CTA href="/wordpress-ai-builder">Learn more</CTA>
    </main>
  )
}
