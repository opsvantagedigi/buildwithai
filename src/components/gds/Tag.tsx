import React from 'react'

export default function Tag({ type = 'neutral', children }: { type?: string; children: React.ReactNode }){
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-sm transition'
  if (type === 'neutral') {
    return <span className={`${base} glass text-[rgba(255,255,255,0.85)]`}>{children}</span>
  }
  // Accent tag
  return <span className={`${base} glass gradient-text`}>{children}</span>
}
