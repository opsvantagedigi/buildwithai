import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Portfolio Templates — BUILD WITH AI',
  description: 'Templates for creatives to showcase work, case studies and contact pages.',
  keywords: ['portfolio templates', 'creative templates'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Portfolio templates" subtitle="Showcase your work with elegant project layouts." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Photographer" desc="Visual-first layouts for images and galleries." />
        <TemplateCategory title="Designer Portfolio" desc="Project pages and case study templates." />
      </section>
    </main>
  )
}
