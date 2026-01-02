import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Templates — BUILD WITH AI',
  description: 'Browse AI-optimized templates for restaurants, agencies, portfolios, stores and more. Customize instantly.',
  keywords: ['templates', 'website templates', 'AI templates'],
}

export default function Page() {
  const cats = [
    { title: 'Restaurant', desc: 'Menus, booking, and location-ready pages.' },
    { title: 'Agency', desc: 'Portfolios, case studies, and team pages.' },
    { title: 'Portfolio', desc: 'Showcase your work with beautiful project layouts.' },
  ]

  return (
    <main>
      <Hero kicker="Templates" title="AI-Optimized Templates" subtitle="Kickstart any site with templates built for conversion and speed." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-3">
        {cats.map((c) => (
          <TemplateCategory key={c.title} title={c.title} desc={c.desc} />
        ))}
      </section>
      <CTA href="/templates/portfolio">Explore all templates</CTA>
    </main>
  )
}
