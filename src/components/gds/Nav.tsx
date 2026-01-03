import React from 'react'
import Link from 'next/link'

type NavItem = { href: string; label: string; title?: string }

export default function Nav({ items = [] as NavItem[], className = '' }: { items?: NavItem[]; className?: string }) {
  return (
    <nav className={`flex gap-6 items-center ${className}`} aria-label="main navigation">
      {items.map((it) => (
        <Link key={it.href} href={it.href} legacyBehavior>
          <a title={it.title || it.label} className="text-sm font-medium text-[rgba(255,255,255,0.9)] hover:opacity-90 transition">
            {it.label}
          </a>
        </Link>
      ))}
    </nav>
  )
}
