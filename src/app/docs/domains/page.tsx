import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsContent from "@/components/docs/DocsContent";

const markdown = `
# Domains & Domain‑Intel

This section will explain:

- Domain availability inside the builder
- RDAP details and what they mean
- DNS status indicators
- How domain suggestions are generated
`;

export default function DomainDocsPage() {
  return (
    <DocsLayout>
      <DocsContent>{markdown}</DocsContent>
    </DocsLayout>
  );
}

