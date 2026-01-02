import React from 'react'
import Hero from '@/components/marketing/Hero'
import FeatureGrid from '@/components/marketing/FeatureGrid'
import CTA from '@/components/marketing/CTA'
import FAQ from '@/components/marketing/FAQ'

export const metadata = {
  title: 'Ecommerce AI Builder — BUILD WITH AI',
  description: 'Build a high-converting ecommerce store with AI-generated product pages, merchandising and checkout.',
  keywords: ['ecommerce AI', 'AI store builder', 'product pages'],
}

export default function Page() {
  const features = [
    { title: 'AI Product Pages', desc: 'Generate SEO-friendly product descriptions and attributes.' },
    { title: 'Checkout & Payments', desc: 'Integrated payments and optimized conversion flows.' },
    { title: 'Merchandising Tools', desc: 'AI recommendations and collections for improved AOV.' },
  ]

  const faq = [
    { q: 'What payment gateways?', a: 'We support major gateways and provide integrations for Stripe and PayPal.' },
    { q: 'Inventory sync?', a: 'Connect external inventory via integrations or sync with CSV uploads.' },
  ]

  return (
    <main>
      <Hero kicker="Ecommerce" title="Ecommerce AI Builder" subtitle="AI-first product pages, checkout and growth tools built for conversion." />
      <FeatureGrid items={features} />
      <CTA href="/builder">Launch your store</CTA>
      <FAQ items={faq} />
    </main>
  )
}
