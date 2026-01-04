"use client"

import React, { useState, useRef, useEffect } from "react";

type Item = { label: string; href: string };

export default function NavDropdown({ title, items }: { title: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={rootRef}
      className="nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="nav-dropdown-button menu-item"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {title}
      </button>

      <div
        className={`nav-dropdown-menu ${open ? "open" : ""}`}
        role="menu"
        aria-hidden={!open}
      >
        {items.map((it) => (
          <a key={it.href} href={it.href} className="nav-dropdown-item" role="menuitem">
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}
