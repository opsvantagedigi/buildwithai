"use client";

import React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
  onChange: (items: FAQItem[]) => void;
};

export function FAQEditor({ items, onChange }: Props) {
  function updateItem(index: number, key: keyof FAQItem, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  }

  function addItem() {
    onChange([...items, { question: "", answer: "" }]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-slate-600">FAQ Items</h3>

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
            placeholder="Question"
            value={item.question}
            onChange={(e) => updateItem(index, "question", e.target.value)}
          />

          <textarea
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder="Answer"
            value={item.answer}
            onChange={(e) => updateItem(index, "answer", e.target.value)}
          />
        </div>
      ))}

      <button
        className="px-2 py-1 text-xs bg-slate-200 rounded hover:bg-slate-300"
        onClick={addItem}
      >
        + Add FAQ Item
      </button>
    </div>
  );
}
