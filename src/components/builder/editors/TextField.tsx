"use client";

import React from "react";

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export function TextField({ label, value, onChange }: Props) {
  return (
    <label className="block text-xs font-medium text-slate-600">
      {label}
      <input
        className="mt-1 w-full border rounded px-2 py-1 text-sm"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
