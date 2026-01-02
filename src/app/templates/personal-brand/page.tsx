import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Personal Brand Templates — BUILD WITH AI',
  description: 'Templates for creators and personal brands: bios, showreels and newsletter capture.',
  keywords: ['personal brand templates', 'creator website'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Personal brand templates" subtitle="Create a memorable online presence that tells your story." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Creator Portfolio" desc="Personal bio, work highlights, and newsletter CTAs." />
        <TemplateCategory title="Speaker Site" desc="Event listings, booking, and media kits." />
      </section>
    </main>
  )
}
