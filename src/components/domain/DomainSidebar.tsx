"use client";

import React from "react";
import DomainSuggestionCard from "@/components/gds/DomainSuggestionCard";
import DNSViewer from "@/components/gds/DNSViewer";
import RDAPPanel from "@/components/gds/RDAPPanel";
import DomainConnectHelper from "@/components/gds/DomainConnectHelper";

type DomainSuggestion = {
  domain: string;
  price?: string;
  status: "available" | "taken" | "unknown";
  badge?: string;
};

type Props = {
  currentDomain?: string;
  suggestions?: DomainSuggestion[];
};

export function DomainSidebar({ currentDomain, suggestions = [] }: Props) {
  return (
    <aside className="w-80 border-l bg-slate-50 p-4 flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold mb-2">Domain suggestions</h2>
        <div className="space-y-2">
          {suggestions.map((s) => (
            <DomainSuggestionCard key={s.domain} {...s} />
          ))}
          {suggestions.length === 0 && (
            <p className="text-xs text-slate-400">
              Domain ideas from AI and Domain‑Intel will appear here.
            </p>
          )}
        </div>
      </div>

      {currentDomain && (
        <>
          <div>
            <h3 className="text-xs font-semibold mb-1">
              RDAP & ownership details
            </h3>
            <RDAPPanel domain={currentDomain} />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-1">DNS records</h3>
            <DNSViewer domain={currentDomain} />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-1">Connect your domain</h3>
            <DomainConnectHelper domain={currentDomain} />
          </div>
        </>
      )}
    </aside>
  );
}
