import React from 'react'
import Input from '@/components/gds/Input'
import Link from 'next/link'

export default function BuilderStart(){
  return (
      <main className="builder-start" style={{padding:32,display:'flex',flexDirection:'column',gap:16,maxWidth:800,margin:'0 auto'}}>
        <h1>Describe Your Business</h1>

        <Input label="Business Name" placeholder="e.g., Skyline Consulting" />
        <Input label="What do you do?" placeholder="Describe your services..." />

        <Link href="/builder/domain" className="gds-btn gds-btn-primary">Next</Link>
      </main>
  )
}
