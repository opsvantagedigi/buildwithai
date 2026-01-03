import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/6 mt-16 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded flex items-center justify-center text-white font-orbitron">B</div>
          <div className="text-white font-inter">BuildWithAI</div>
        </div>
        <nav className="flex gap-4 text-white/80 text-sm">
          <a href="/about">About</a>
          <a href="/docs">Docs</a>
          <a href="/privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
