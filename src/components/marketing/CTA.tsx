import React from 'react'

export default function CTA({ children, href = '/builder' }: { children?: React.ReactNode; href?: string }) {
  return (
    <section className="py-12 bg-gradient-to-r from-sky-600 to-violet-600 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold">Ready to build with AI?</h3>
        <p className="mt-3 text-sm opacity-90">Start a free trial and launch a production-ready site in minutes.</p>
        <div className="mt-6">
          <a href={href} className="inline-block bg-white text-sky-700 px-6 py-3 rounded-md font-semibold">{children ?? 'Get Started Free'}</a>
        </div>
      </div>
    </section>
  )
}
