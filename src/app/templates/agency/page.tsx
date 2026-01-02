import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Agency Templates — BUILD WITH AI',
  description: 'Agency-focused templates for portfolios, case studies and team pages.',
  keywords: ['agency templates', 'portfolio templates'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Agency templates" subtitle="Portfolio and showcase templates built for agencies." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Studio Portfolio" desc="Large imagery and project-focused layouts." />
        <TemplateCategory title="Consultancy" desc="Services, team and pricing pages." />
      </section>
    </main>
  )
}
