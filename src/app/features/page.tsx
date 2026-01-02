import React from 'react'
import Hero from '@/components/marketing/Hero'
import FeatureGrid from '@/components/marketing/FeatureGrid'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Features — BUILD WITH AI',
  description: 'Explore features: AI design, content, SEO, commerce, templates, analytics, and developer tools.',
  keywords: ['features', 'AI features', 'website features'],
}

export default function Page() {
  const features = [
    { title: 'AI Design System', desc: 'Responsive layouts, accessible components, and theme tokens generated for you.' },
    { title: 'SEO Toolkit', desc: 'Meta tags, sitemaps, structured data, and performance optimizations out of the box.' },
    { title: 'Integrations', desc: 'Connect analytics, email, and commerce providers with pre-built adapters.' },
    { title: 'Developer Friendly', desc: 'Export code, use APIs, and extend the platform with custom integrations.' },
    { title: 'Team Collaboration', desc: 'Roles, previews, and workflows built for agency teams.' },
    { title: 'Performance', desc: 'Fast TTFB, CDN, and image optimization for better rankings.' },
  ]

  return (
    <main>
      <Hero kicker="Platform" title="Features that accelerate launches" subtitle="Everything you need to design, publish, and grow with AI." />
      <FeatureGrid items={features} />
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-xl font-semibold">Integrated workflows</h3>
        <p className="mt-3 text-slate-700">Our features are designed to work together so marketing, design, and engineering can move faster.</p>
      </section>
      <CTA href="/pricing">See pricing and plans</CTA>
    </main>
  )
}
