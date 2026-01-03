import React from "react";
import ReleaseCard from "@/components/gds/ReleaseCard";
import type { ReleaseSummary } from "@/types/release";

type Props = {
  releases: ReleaseSummary[];
};

export function ReleaseList({ releases }: Props) {
  return (
    <div className="space-y-4">
      {releases.map((r) => (
        <ReleaseCard key={r.version} {...r} />
      ))}
    </div>
  );
}
