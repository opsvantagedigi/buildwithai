"use client";

import React, { useRef } from "react";

type Props = { onUpload?: (url: string) => void };

export default function ImageUploader({ onUpload }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          onUpload?.(url);
        }}
      />
    </div>
  );
}
