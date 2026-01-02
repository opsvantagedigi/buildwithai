import React from 'react'

export default function TemplateCategory({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 border rounded bg-white">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-28 bg-slate-100 rounded" />
        <div className="h-28 bg-slate-100 rounded" />
      </div>
    </div>
  )
}
