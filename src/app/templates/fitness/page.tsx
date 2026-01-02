import React from 'react'
import Hero from '@/components/marketing/Hero'
import TemplateCategory from '@/components/marketing/TemplateCategory'

export const metadata = {
  title: 'Fitness Templates — BUILD WITH AI',
  description: 'Templates for gyms, trainers and fitness coaches with class schedules and booking.',
  keywords: ['fitness templates', 'gym website'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Templates" title="Fitness templates" subtitle="Launch training, class and membership pages quickly." />
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-6">
        <TemplateCategory title="Gym" desc="Class schedules and membership signups." />
        <TemplateCategory title="Personal Trainer" desc="Booking and testimonials-focused pages." />
      </section>
    </main>
  )
}
