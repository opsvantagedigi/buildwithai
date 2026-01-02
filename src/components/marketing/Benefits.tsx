import React from 'react'

export default function Benefits({ children }: { children?: React.ReactNode }) {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold">Why BUILD WITH AI</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      </div>
    </section>
  )
}
