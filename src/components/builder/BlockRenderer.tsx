"use client";

import React from "react";

type Block = { id: string; type: string; data: any };

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return (
        <div className="py-12">
          <h1 className="text-2xl font-bold">{block.data.title || "Hero Title"}</h1>
          <p className="text-slate-600">{block.data.subtitle || "Subtitle"}</p>
        </div>
      );
    case "text":
      return <div className="prose" dangerouslySetInnerHTML={{ __html: block.data.html || "<p>Text block</p>" }} />;
    default:
      return <div className="text-sm text-slate-500">Unknown block type: {block.type}</div>;
  }
}
