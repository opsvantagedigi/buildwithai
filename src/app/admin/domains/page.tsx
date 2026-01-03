import React from "react";

export default function AdminDomainsPage() {
  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">Admin · Domains</h1>
      <p className="text-sm text-slate-500 mb-6">
        This view will list domains known to the platform, their RDAP status,
        DNS health, registrar, and any issues detected by Domain‑Intel.
      </p>
      <p className="text-sm text-slate-500">
        Implement later: table of domains, filters, and deep links into the
        builder and domain diagnostics.
      </p>
    </main>
  );
}
