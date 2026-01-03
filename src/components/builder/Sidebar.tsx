"use client";

import React from "react";
import type { BuilderBlock } from "@/types/builder";

type Props = {
  blocks: BuilderBlock[];
  selectedBlockId?: string | null;
  onAddBlock: (type: string) => void;
  onRemoveBlock: (id: string) => void;
  onSelectBlock?: (id: string) => void;
};

export function Sidebar({
  blocks,
  selectedBlockId,
  onAddBlock,
  onRemoveBlock,
  onSelectBlock,
}: Props) {
  const blockTypes = [
    { type: "hero", label: "Hero" },
    { type: "features", label: "Features" },
    { type: "testimonials", label: "Testimonials" },
    { type: "faq", label: "FAQ" },
    { type: "cta", label: "Call to Action" },
  ];

  return (
    <aside className="w-72 border-r bg-slate-50 p-4 flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold mb-2">Add sections</h2>
        <div className="grid grid-cols-1 gap-2">
          {blockTypes.map((bt) => (
            <button
              key={bt.type}
              className="border rounded px-3 py-2 text-xs text-left bg-white hover:bg-slate-100"
              onClick={() => onAddBlock(bt.type)}
            >
              {bt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-sm font-semibold mb-2">Sections</h2>
        {blocks.length === 0 ? (
          <p className="text-xs text-slate-400">No sections yet. Add a hero or features to start.</p>
        ) : (
          <ul className="space-y-1">
            {blocks.map((block, index) => {
              const isSelected = block.id === selectedBlockId;
              return (
                <li
                  key={block.id}
                  className={[
                    "flex items-center justify-between text-xs border rounded px-2 py-1 cursor-pointer",
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white hover:bg-slate-100 border-slate-200",
                  ].join(" ")}
                  onClick={() => onSelectBlock?.(block.id)}
                >
                  <span className="truncate">
                    {index + 1}. {block.type}
                    {isSelected && " • editing"}
                  </span>
                  <button
                    className={"text-[10px] " + (isSelected ? "text-slate-200" : "text-red-500")}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBlock(block.id);
                    }}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
