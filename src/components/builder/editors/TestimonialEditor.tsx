"use client";

import React from "react";

type Testimonial = {
  name: string;
  quote: string;
  avatar?: string;
};

type Props = {
  testimonials: Testimonial[];
  onChange: (items: Testimonial[]) => void;
};

export function TestimonialEditor({ testimonials, onChange }: Props) {
  function updateItem(index: number, key: keyof Testimonial, value: string) {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  }

  function addItem() {
    onChange([...testimonials, { name: "", quote: "", avatar: "" }]);
  }

  function removeItem(index: number) {
    onChange(testimonials.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-slate-600">Testimonials</h3>

      {testimonials.map((item, index) => (
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
            placeholder="Name"
            value={item.name}
            onChange={(e) => updateItem(index, "name", e.target.value)}
          />

          <textarea
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder="Quote"
            value={item.quote}
            onChange={(e) => updateItem(index, "quote", e.target.value)}
          />

          <input
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder="Avatar URL"
            value={item.avatar}
            onChange={(e) => updateItem(index, "avatar", e.target.value)}
          />
        </div>
      ))}

      <button
        className="px-2 py-1 text-xs bg-slate-200 rounded hover:bg-slate-300"
        onClick={addItem}
      >
        + Add Testimonial
      </button>
    </div>
  );
}
