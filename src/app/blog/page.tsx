import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Blog — BUILD WITH AI',
  description: 'Insights, tutorials and best practices for building with AI — product updates, SEO and growth tactics.',
  keywords: ['blog', 'AI blog', 'website tips'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Resources" title="Blog & Insights" subtitle="Learn how teams use AI to ship better websites, faster." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-6">
        <article className="p-6 border rounded">
          <h3 className="font-semibold">How AI improves SEO in 2026</h3>
          <p className="mt-2 text-slate-700">Modern SEO workflows combine performance, structured data, and content — AI helps across all three.</p>
        </article>
      </section>
      <CTA href="/docs/getting-started">Read docs</CTA>
    </main>
  )
}
