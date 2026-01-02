import React from 'react'
import Card from '@/components/gds/Card'
import Link from 'next/link'

export default function BuilderLanding(){
  return (
      <main className="builder-landing" style={{padding:32}}>
        <section className="hero" style={{textAlign:'center',marginBottom:32}}>
          <h1>Build Your Website With AI</h1>
          <p>Create a complete, multi‑page website in minutes.</p>
          <Link href="/builder/start" className="gds-btn gds-btn-primary">Start Building</Link>
        </section>

        <section className="features" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
          <Card title="AI Page Generation">Generate full pages and sections with AI.</Card>
          <Card title="Domain Intelligence">Check availability, pricing, and RDAP details instantly.</Card>
          <Card title="Instant Deployment">Deploy your site with one click.</Card>
        </section>
      </main>
  )
}
