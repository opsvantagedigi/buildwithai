import React from 'react'
import Hero from '@/components/marketing/Hero'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: '10Web vs Shopify — BUILD WITH AI',
  description: 'Compare BUILD WITH AI and Shopify for ecommerce features, speed, and customization.',
  keywords: ['10Web vs Shopify', 'compare shopify'],
}

export default function Page() {
  const columns = ['Category', 'BUILD WITH AI', 'Shopify']
  const rows = [
    { Category: 'Ecommerce', 'BUILD WITH AI': 'Built-in', Shopify: 'Built-in' },
    { Category: 'Customization', 'BUILD WITH AI': 'High', Shopify: 'High' },
    { Category: 'AI Content', 'BUILD WITH AI': 'Advanced', Shopify: 'Apps' },
  ]

  return (
    <main>
      <Hero kicker="Compare" title="BUILD WITH AI vs Shopify" subtitle="Understand platform strengths for building and scaling online stores." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ComparisonTable columns={columns} rows={rows} />
      </section>
      <CTA href="/ecommerce-ai-builder">See ecommerce features</CTA>
    </main>
  )
}
