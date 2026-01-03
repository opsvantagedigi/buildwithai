"use client";

import React, { useState } from "react";

type Props = {
  text?: string;
  onRewrite: (value: string) => void;
};

export function AIRewriteButton({ text, onRewrite }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleRewrite() {
    if (!text) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: "rewrite", context: { text } }),
      });

      const json = await res.json();
      if (json?.text) onRewrite(json.text);
    } catch (err) {
      console.error("[AI_REWRITE_ERROR]", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRewrite}
      disabled={loading}
      className="text-xs px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
    >
      {loading ? "Rewriting…" : "Rewrite with AI"}
    </button>
  );
}
