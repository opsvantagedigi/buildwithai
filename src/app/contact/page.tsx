import React from 'react'
import Hero from '@/components/marketing/Hero'

export const metadata = {
  title: 'Contact — BUILD WITH AI',
  description: 'Contact sales or support at BUILD WITH AI. Request demos, custom quotes or technical help.',
  keywords: ['contact', 'support', 'sales'],
}

export default function Page() {
  return (
    <main>
      <Hero kicker="Contact" title="Get in touch" subtitle="Questions? Demos? Our team is ready to help." />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-lg font-semibold">Contact options</h3>
        <ul className="mt-3 list-disc pl-6 text-slate-700">
          <li>Email: hello@buildwithai.com</li>
          <li>Sales: sales@buildwithai.com</li>
        </ul>
      </section>
    </main>
  )
}
