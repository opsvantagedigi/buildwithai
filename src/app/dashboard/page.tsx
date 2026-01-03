"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/sites/list");
      const data = await res.json();
      setSites(data.sites ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-slate-200 space-y-6">
      <h1 className="text-xl font-semibold">Your Sites</h1>

      <div>
        <a href="/templates" className="text-sm underline text-blue-300">
          + New Site
        </a>
      </div>

      {loading && <div className="text-slate-400">Loading…</div>}

      {!loading && sites.length === 0 && (
        <div className="text-slate-400">No sites yet.</div>
      )}

      {!loading && sites.length > 0 && (
        <div className="space-y-4">
          {sites.map((site) => (
            <div
              key={site.id}
              className="border border-slate-700 rounded p-4 space-y-2"
            >
              <div className="font-semibold">{site.name}</div>

              <div className="flex gap-4 text-xs">
                <a
                  href={`/builder/site/${site.id}`}
                  className="underline text-blue-300"
                >
                  Open Builder
                </a>

                <a
                  href={`/site/${site.id}/changelog`}
                  className="underline text-blue-300"
                >
                  Changelog
                </a>

                <a
                  href={`/site/${site.id}/settings`}
                  className="underline text-purple-300"
                >
                  Settings
                </a>

                <a
                  href={`/api/publish?siteId=${site.id}`}
                  className="underline text-green-300"
                >
                  Publish
                </a>

                <a
                  href={`/api/publish/promote?siteId=${site.id}`}
                  className="underline text-yellow-300"
                >
                  Promote
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
