"use client"

import React, { useState } from "react"
import Sidebar from '@/components/builder/Sidebar'
import Canvas from '@/components/builder/Canvas'
import { DomainSidebar } from '@/components/domain/DomainSidebar'

type Props = { params: { id: string } }

export default function BuilderCanvas({ params }: Props){
  const [blocks, setBlocks] = useState<any[]>([
    { id: 'b1', type: 'hero', data: { title: 'Welcome', subtitle: 'Start editing' } }
  ])

  function handleAdd(type: string){
    const id = `b${Date.now()}`
    setBlocks((s)=>[...s,{id,type,data:{}}])
  }

  return (
    <>
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Builder — {params.id}</h1>
        <div className="flex gap-2">
          <button className="gds-btn" onClick={()=>alert('Preview')}>Preview</button>
          <button className="gds-btn gds-btn-primary" onClick={()=>alert('Publish stub')}>Publish</button>
        </div>
      </div>

      <main className="builder-canvas" style={{display:'grid',gridTemplateColumns:'280px 1fr 320px',gap:16,padding:24}}>
        <Sidebar onAdd={handleAdd} />

        <section>
          <Canvas blocks={blocks} />
        </section>

        <DomainSidebar currentDomain={undefined} />
      </main>
    </>
  )
}
