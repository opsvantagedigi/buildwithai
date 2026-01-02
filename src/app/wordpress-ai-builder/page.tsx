import React from 'react'
import Hero from '@/components/marketing/Hero'
import FeatureGrid from '@/components/marketing/FeatureGrid'
import CTA from '@/components/marketing/CTA'
import FAQ from '@/components/marketing/FAQ'

export const metadata = {
  title: 'WordPress AI Builder — BUILD WITH AI',
  description: 'Use AI to create and export WordPress-ready content and themes — speed up your WordPress workflows.',
  keywords: ['WordPress AI', 'AI WordPress builder', 'export to WordPress'],
}

export default function Page() {
  const features = [
    { title: 'WP Export', desc: 'Export pages and content optimized for WordPress import.' },
    { title: 'Theme Integration', desc: 'Generate theme-ready templates and assets.' },
    { title: 'Headless WordPress', desc: 'Use BUILD WITH AI as a headless CMS and deliver static pages.' },
  ]

  const faq = [
    { q: 'Does it host WordPress?', a: 'We offer hosting for the sites you build; WordPress export is provided for external hosting.' },
  ]

  return (
    <main>
      <Hero kicker="Integrations" title="WordPress AI Builder" subtitle="A fast path from AI-generated designs to WordPress-ready sites." />
      <FeatureGrid items={features} />
      <CTA href="/builder">Start exporting to WordPress</CTA>
      <FAQ items={faq} />
    </main>
  )
}
