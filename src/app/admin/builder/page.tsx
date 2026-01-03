import React from "react";

export default function AdminBuilderPage() {
  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">Admin · Builder analytics</h1>
      <p className="text-sm text-slate-500 mb-6">
        This view will surface builder usage metrics: sites created, templates
        used, AI calls, failures, and performance.
      </p>
      <p className="text-sm text-slate-500">
        Implement later: charts, stats, and links to Release Center / Docs for
        changes that impact builder behavior.
      </p>
    </main>
  );
}

