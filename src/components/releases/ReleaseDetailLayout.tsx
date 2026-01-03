import React from "react";
import type { ReleaseDetail } from "@/types/release";

type Props = {
  release: ReleaseDetail;
};

export default function ReleaseDetailLayout({ release }: Props) {
  return (
    <main className="max-w-4xl mx-auto py-12">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">
          {release.version} — {release.title}
        </h1>
        <p className="text-xs text-slate-500 mt-1">{release.date}</p>
      </header>

      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2">Summary</h2>
        <p className="text-sm text-slate-600 whitespace-pre-line">
          {release.summary}
        </p>
      </section>

      {release.highlights && release.highlights.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside text-sm text-slate-600">
            {release.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
