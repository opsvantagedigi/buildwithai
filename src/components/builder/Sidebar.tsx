"use client";

import React from "react";

type Props = { onAdd?: (type: string) => void };

export default function Sidebar({ onAdd }: Props) {
  return (
    <aside className="w-64 p-4 bg-slate-50 rounded">
      <h3 className="text-sm font-semibold mb-3">Blocks</h3>
      <div className="flex flex-col gap-2">
        <button className="gds-btn" onClick={() => onAdd?.("hero")}>
          Add Hero
        </button>
        <button className="gds-btn" onClick={() => onAdd?.("text")}>
          Add Text
        </button>
        <button className="gds-btn" onClick={() => onAdd?.("features")}>
          Add Features
        </button>
      </div>
    </aside>
  );
}
