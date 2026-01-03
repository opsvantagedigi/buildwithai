"use client";

import React from "react";
import BlockRenderer from "./BlockRenderer";
import PageNavigator from "./PageNavigator";

type Block = { id: string; type: string; data: any };
type Props = { blocks: Block[]; className?: string };

export default function Canvas({ blocks = [], className = "" }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="mb-4">
        <PageNavigator />
      </div>

      <div className="space-y-6">
        {blocks.length === 0 && (
          <div className="text-sm text-slate-500">Empty page — add a block.</div>
        )}
        {blocks.map((b) => (
          <div key={b.id} className="border rounded p-3">
            <BlockRenderer block={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
