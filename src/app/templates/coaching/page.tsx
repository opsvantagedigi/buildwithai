import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Coaching Templates — BUILD WITH AI',
  description: 'Templates built for coaches with scheduling, testimonials, and lead capture.',
  keywords: ['coaching templates', 'coach website'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Coaching templates" subtitle="Lead-focused pages for coaches and consultants." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Coach Landing" desc="High-converting landing pages and lead forms." />
        <TemplateCategory title="Program Pages" desc="Curriculum and pricing templates for programs." />
      </section>
    </main>
  )
}
