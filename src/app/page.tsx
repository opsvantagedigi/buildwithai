import React from 'react'
import Hero from '@/components/marketing/Hero'
import FeatureGrid from '@/components/marketing/FeatureGrid'
import Benefits from '@/components/marketing/Benefits'
import SocialProof from '@/components/marketing/SocialProof'
import CTA from '@/components/marketing/CTA'
import FAQ from '@/components/marketing/FAQ'

export const metadata = {
  title: 'BUILD WITH AI — AI Website Builder for Agencies, Creators, and Stores',
  description:
    'BUILD WITH AI helps teams and creators launch fast, SEO-optimized websites with AI design, content, and commerce tools. Start free and go live in minutes.',
  keywords: ['AI website builder', 'AI site generator', 'ecommerce AI', 'website templates', 'SEO builder'],
}

export default function Home() {
  const features = [
    { title: 'AI Design Assistant', desc: 'Auto-generate modern layouts, typography, and brand palettes tailored to your business.' },
    { title: 'Content & SEO', desc: 'AI-written pages, meta tags and structured data optimized for discoverability.' },
    { title: 'Commerce Ready', desc: 'Add products, checkout, and AI-driven merchandising in minutes.' },
  ]

  const faq = [
    { q: 'How fast can I launch?', a: 'Most customers create a complete site in under 15 minutes using our AI templates and content flows.' },
    { q: 'Do you provide hosting?', a: 'Yes — production hosting with CDN, SSL, and optional custom domains is included.' },
    { q: 'Can I export my site?', a: 'You can export content and integrate with headless platforms; WordPress export is supported via our Builder → WordPress flow.' },
  ]

  return (
    <main className="min-h-screen bg-[var(--color-base)] text-white">
      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Hero
            kicker="AI Website Builder"
            title="Build faster with AI — launch beautiful sites that convert"
            subtitle="Design, content, and commerce combined into a single AI-first workflow for creators, agencies, and small businesses."
          />
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FeatureGrid items={features} />
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Benefits>
            <article className="card p-4 rounded-lg transition hover:scale-[1.02]">
              <h4 className="font-semibold gradient-text">Save time</h4>
              <p className="text-sm text-[rgba(255,255,255,0.85)]">Automate design and content so you can focus on customers.</p>
            </article>
            <article className="card p-4 rounded-lg transition hover:scale-[1.02]">
              <h4 className="font-semibold gradient-text">Better SEO</h4>
              <p className="text-sm text-[rgba(255,255,255,0.85)]">Built-in SEO tooling and schema for higher organic traffic.</p>
            </article>
            <article className="card p-4 rounded-lg transition hover:scale-[1.02]">
              <h4 className="font-semibold gradient-text">Scale with confidence</h4>
              <p className="text-sm text-[rgba(255,255,255,0.85)]">Enterprise-ready infrastructure with integrations and analytics.</p>
            </article>
          </Benefits>
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SocialProof logos={[]} />
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <CTA href="/builder">Get started free — no credit card required</CTA>
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold gradient-text">Real results from real teams</h2>
            <p className="mt-3 text-[rgba(255,255,255,0.85)]">Agencies and creators scale faster with AI-powered workflows and templates.</p>
          </div>
        </div>
      </section>

      <section className="section-py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FAQ items={faq} />
        </div>
      </section>
    </main>
  )
}
