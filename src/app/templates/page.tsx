"use client";

import { useEffect, useState } from "react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/templates/list");
      const data = await res.json();
      setTemplates(data.templates ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-slate-200 space-y-6">
      <h1 className="text-xl font-semibold">Choose a Template</h1>

      {loading && <div className="text-slate-400">Loading templates…</div>}

      {!loading && templates.length === 0 && (
        <div className="text-slate-400">No templates available.</div>
      )}

      {!loading && templates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div
              key={t.id}
              className="border border-slate-700 rounded p-4 space-y-2"
            >
              <img
                src={t.thumbnail}
                alt={t.name}
                className="w-full h-40 object-cover rounded"
              />

              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-slate-400">{t.category}</div>

              <a
                href={`/api/templates/create?templateId=${t.id}`}
                className="text-sm underline text-blue-300"
              >
                Use Template
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
