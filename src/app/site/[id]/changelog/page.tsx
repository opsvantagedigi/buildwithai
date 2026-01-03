"use client";

import { useEffect, useState } from "react";
import { VersionCard } from "@/components/VersionCard";

export default function ChangelogPage({
  params,
}: {
  params: { id: string };
}) {
  const siteId = params.id;
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/sites/${siteId}/changelog`);
      const data = await res.json();
      setVersions(data?.versions ?? []);
      setLoading(false);
    }
    load();
  }, [siteId]);

  return (
    <div className="p-6 text-slate-200 space-y-4">
      <h1 className="text-xl font-semibold">Changelog</h1>

      {loading && <div className="text-slate-400">Loading…</div>}

      {!loading && versions.length === 0 && (
        <div className="text-slate-400">No versions published yet.</div>
      )}

      {!loading && versions.length > 0 && (
        <div className="space-y-4">
          {versions
            .sort((a, b) => b.version - a.version)
            .map((snapshot) => (
              <VersionCard key={snapshot.version} snapshot={snapshot} />
            ))}
        </div>
      )}
    </div>
  );
}
