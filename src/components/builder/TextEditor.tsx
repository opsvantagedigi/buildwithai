"use client";

import React from "react";

type Props = { value?: string; onChange?: (v: string) => void };

export default function TextEditor({ value = "", onChange }: Props) {
  return (
    <textarea
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      rows={6}
    />
  );
}
