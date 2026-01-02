import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Real Estate Templates — BUILD WITH AI',
  description: 'Listing pages, agent profiles and property showcases optimized for local search.',
  keywords: ['real estate templates', 'property templates'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Real estate templates" subtitle="Showcase properties and agent services with SEO-friendly listings." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Agent Profile" desc="Personal branding for realtors." />
        <TemplateCategory title="Property Listings" desc="Filterable, searchable property pages." />
      </section>
    </main>
  )
}
