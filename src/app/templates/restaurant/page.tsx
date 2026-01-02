import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Restaurant Templates — BUILD WITH AI',
  description: 'Templates optimized for restaurants: menus, reservations, and local SEO.',
  keywords: ['restaurant templates', 'menu templates', 'restaurant website'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Restaurant templates" subtitle="High-converting menus and local pages for restaurants." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Modern Bistro" desc="Menu-first layouts with booking CTA." />
        <TemplateCategory title="Takeout & Delivery" desc="Order and pickup focused templates." />
      </section>
    </main>
  )
}
