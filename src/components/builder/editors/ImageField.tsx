"use client";

import React, { useRef } from "react";

type Props = {
  label: string;
  value?: string;
  onChange: (value: string | null) => void;
};

export function ImageField({ label, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return onChange(null);

    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-600">{label}</label>

      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-full h-auto rounded border mb-2"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="text-xs"
        onChange={handleFile}
      />
    </div>
  );
}
