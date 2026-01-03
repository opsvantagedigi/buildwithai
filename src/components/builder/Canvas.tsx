"use client";

import React from "react";
import BlockRenderer from "./BlockRenderer";
import PageNavigator from "./PageNavigator";

type Block = { id: string; type: string; data: any };
type Props = { blocks: Block[]; className?: string; selectedBlockId?: string | null; onSelectBlock?: (id: string) => void };

export default function Canvas({ blocks = [], className = "", selectedBlockId, onSelectBlock }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="mb-4">
        <PageNavigator />
      </div>

      <div className="space-y-6">
        {blocks.length === 0 && (
          <div className="text-sm text-slate-500">Empty page — add a block.</div>
        )}
        {blocks.map((b) => {
          const isSelected = b.id === selectedBlockId;
          return (
            <div
              key={b.id}
              className={[
                "border rounded p-3 cursor-pointer transition-colors",
                isSelected ? "border-slate-900 ring-2 ring-slate-900/40" : "border-slate-200 hover:border-slate-300",
              ].join(" ")}
              onClick={() => onSelectBlock?.(b.id)}
            >
              <div className={[(isSelected ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-700"), "absolute -mt-6 ml-3 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide"].join(" ")}>{b.type}{isSelected ? " • selected" : ""}</div>
              <BlockRenderer block={b} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
