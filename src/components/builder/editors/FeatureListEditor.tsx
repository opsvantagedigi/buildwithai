"use client";

import React from "react";

type FeatureItem = {
  title: string;
  description: string;
};

type Props = {
  items: FeatureItem[];
  onChange: (items: FeatureItem[]) => void;
};

export function FeatureListEditor({ items, onChange }: Props) {
  function updateItem(index: number, key: keyof FeatureItem, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  }

  function addItem() {
    onChange([...items, { title: "", description: "" }]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-slate-600">Features</h3>

      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded p-3 bg-slate-50 space-y-2 relative"
        >
          <button
            className="absolute top-2 right-2 text-red-500 text-xs"
            onClick={() => removeItem(index)}
          >
            ✕
          </button>

          <input
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder="Feature title"
            value={item.title}
            onChange={(e) => updateItem(index, "title", e.target.value)}
          />

          <textarea
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder="Feature description"
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
          />
        </div>
      ))}

      <button
        className="px-2 py-1 text-xs bg-slate-200 rounded hover:bg-slate-300"
        onClick={addItem}
      >
        + Add Feature
      </button>
    </div>
  );
}
