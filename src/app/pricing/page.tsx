import React from 'react'
import Hero from '@/components/marketing/Hero'
import CTA from '@/components/marketing/CTA'

export const metadata = {
  title: 'Pricing — BUILD WITH AI',
  description: 'Simple transparent pricing for freelancers, agencies and teams. Try free, scale with predictable plans.',
  keywords: ['pricing', 'plans', 'subscriptions'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Pricing" title="Simple pricing for teams and creators" subtitle="Start free and upgrade as you scale. Transparent plans with predictable billing." />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold">Starter</h4>
            <p className="mt-2 text-slate-700">Free — ideal for hobby projects and prototypes.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold">Pro</h4>
            <p className="mt-2 text-slate-700">Best for freelancers and small businesses — includes advanced AI features.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold">Agency</h4>
            <p className="mt-2 text-slate-700">Scale with team seats, collaboration, and priority support.</p>
          </div>
        </div>
      </section>

      <CTA href="/signup">Choose your plan</CTA>
    </main>
  )
}
