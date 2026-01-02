import React from 'react'

export default function SocialProof({ logos = [] }: { logos?: string[] }) {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-lg font-medium">Trusted by teams and creators</h3>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          {logos.length === 0 ? (
            <p className="text-sm text-slate-500">Join thousands of builders using BUILD WITH AI.</p>
          ) : (
            logos.map((l, i) => (
              <img key={i} src={l} alt={`logo-${i}`} className="h-8 filter grayscale opacity-80" />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
