import React from 'react'
import Hero from '@/components/marketing/Hero'
import FeatureGrid from '@/components/marketing/FeatureGrid'
import CTA from '@/components/marketing/CTA'
import FAQ from '@/components/marketing/FAQ'

export const metadata = {
  title: 'AI Website Builder — BUILD WITH AI',
  description: 'AI Website Builder for creators and small businesses. Generate design, content, and SEO-optimized pages with one flow.',
  keywords: ['AI website builder', 'website generator', 'AI design'],
}

export default function Page() {
  const features = [
    { title: 'One-click Site Generation', desc: 'Describe your business and get a complete site with pages, images, and SEO.' },
    { title: 'Branding & Theme', desc: 'Auto-suggest color palettes and font pairings to match your brand.' },
    { title: 'Content Assistant', desc: 'AI-generated headlines, descriptions and structured data for search.' },
  ]

  const faq = [
    { q: 'Who is this for?', a: 'Creators, freelancers, and small businesses who need a fast, polished web presence.' },
    { q: 'Can I customize the design?', a: 'Yes — every site is editable with our builder and you can fine-tune layouts.' },
  ]

  return (
    <main>
      <Hero kicker="Product" title="AI Website Builder" subtitle="Create a polished website with zero design experience." />
      <FeatureGrid items={features} />
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-xl font-semibold">Benefits</h3>
        <ul className="mt-4 list-disc pl-6 text-slate-700">
          <li>Launch faster with AI-generated pages</li>
          <li>Built-in SEO and accessibility best practices</li>
          <li>Export or integrate where you need</li>
        </ul>
      </section>
      <CTA href="/builder">Try the builder free</CTA>
      <FAQ items={faq} />
    </main>
  )
}
