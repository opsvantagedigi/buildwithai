import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  header?: React.ReactNode
}

export default function Card({ children, className = '', title, header, ...props }: CardProps) {
  const heading = title ?? header
  return (
    <div className={`card ${className}`} role="group" aria-label={typeof heading === 'string' ? String(heading) : undefined} {...props}>
      {heading ? <div className="mb-3 text-lg font-semibold gradient-text">{heading}</div> : null}
      <div className="text-[rgba(255,255,255,0.85)]">{children}</div>
    </div>
  )
}
