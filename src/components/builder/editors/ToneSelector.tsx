"use client";

import React from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function ToneSelector({ value, onChange }: Props) {
  const tones = ["professional", "friendly", "bold", "playful", "luxury"];

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-600">
        Tone / Style
      </label>

      <select
        className="w-full border rounded px-2 py-1 text-sm"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Default</option>
        {tones.map((tone) => (
          <option key={tone} value={tone}>
            {tone}
          </option>
        ))}
      </select>
    </div>
  );
}
