import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Photography Templates — BUILD WITH AI',
  description: 'Stunning gallery layouts and high-performance image delivery for photographers.',
  keywords: ['photography templates', 'photo gallery'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Photography templates" subtitle="High-impact gallery layouts with fast image delivery." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Studio" desc="Portfolio grids and lightbox galleries." />
        <TemplateCategory title="Wedding Photographer" desc="Story-driven layouts for collections and pricing." />
      </section>
    </main>
  )
}
