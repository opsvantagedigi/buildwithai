import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsContent from "@/components/docs/DocsContent";

const markdown = `
# Platform architecture

This section will act as the high-level overview:

- Global Design System (ODBWAIL)
- AI Builder Engine
- Domain‑Intel layer
- Deployment and observability
`;

export default function PlatformDocsPage() {
  return (
    <DocsLayout>
      <DocsContent>{markdown}</DocsContent>
    </DocsLayout>
  );
}

