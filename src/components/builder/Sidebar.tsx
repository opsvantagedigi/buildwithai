"use client";

import React from "react";

type BuilderBlock = { id: string; type: string; data?: any };

type Props = {
  onAdd?: (type: string) => void;
  onAddBlock?: (type: string) => void;
  blocks?: BuilderBlock[];
  onRemoveBlock?: (id: string) => void;
  onSelectBlock?: (id: string) => void;
};

export default function Sidebar({ onAdd, onAddBlock, blocks = [], onRemoveBlock, onSelectBlock }: Props) {
  const add = onAddBlock ?? onAdd;

  return (
    <aside className="w-64 p-4 bg-slate-50 rounded">
      <h3 className="text-sm font-semibold mb-3">Pages / Blocks</h3>

      <div className="mb-3">
        <button className="gds-btn mb-2 w-full" onClick={() => add?.("hero")}>Add Hero</button>
        <button className="gds-btn mb-2 w-full" onClick={() => add?.("features")}>Add Features</button>
        <button className="gds-btn mb-2 w-full" onClick={() => add?.("cta")}>Add CTA</button>
      </div>

      <div>
        <h4 className="text-xs font-medium mb-2">Blocks</h4>
        <div className="space-y-2">
          {blocks.length === 0 && <div className="text-xs text-slate-500">No blocks</div>}
          {blocks.map((b) => (
            <div key={b.id} className="flex items-center justify-between bg-white p-2 rounded border">
              <button className="text-sm text-left" onClick={() => onSelectBlock?.(b.id)}>{b.type}</button>
              <button className="text-xs text-red-500" onClick={() => onRemoveBlock?.(b.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
