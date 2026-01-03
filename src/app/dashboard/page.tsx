"use client";

import { useEffect, useState } from "react";

type SiteEntry = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export default function DashboardPage() {
  const [sites, setSites] = useState<SiteEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/sites");
      const data = await res.json();
      setSites(data?.sites ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-xl font-semibold mb-4">Sites</h1>

      {loading && <div className="text-slate-400">Loading…</div>}

      {!loading && sites.length === 0 && (
        <div className="text-slate-400">No sites found.</div>
      )}

      {!loading && sites.length > 0 && (
        <div className="space-y-3">
          {sites.map((site) => (
            <div
              key={site.id}
              className="border border-slate-700 rounded p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{site.name}</div>
                <div className="text-xs text-slate-400">
                  Updated: {new Date(site.updatedAt).toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`/builder/site/${site.id}`}
                  className="text-xs underline text-blue-300"
                >
                  Open Builder
                </a>
                <a
                  href={`/api/publish/preview?siteId=${site.id}`}
                  className="text-xs underline text-slate-300"
                >
                  Preview
                </a>
                <a
                  href={`/api/publish/staging?siteId=${site.id}`}
                  className="text-xs underline text-purple-300"
                >
                  Stage
                </a>
                <a
                  href={`/api/publish?siteId=${site.id}`}
                  className="text-xs underline text-green-300"
                >
                  Publish
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
