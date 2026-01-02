import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Ecommerce Templates — BUILD WITH AI',
  description: 'Conversion-optimized templates for online stores and product catalogs.',
  keywords: ['ecommerce templates', 'store templates'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Ecommerce templates" subtitle="Fast product pages and checkout flows optimized for conversion." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Small Shop" desc="Simple catalog with fast checkout." />
        <TemplateCategory title="Market" desc="Multi-product layouts and collections." />
      </section>
    </main>
  )
}
