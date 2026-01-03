import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsContent from "@/components/docs/DocsContent";

const markdown = `
# Getting started with the AI Website Builder

This section will document the full flow from:

- Idea → AI site generation
- Editing sections with AI
- Managing pages
- Publishing and connecting a domain
`;

export default function BuilderDocsPage() {
  return (
    <DocsLayout>
      <DocsContent>{markdown}</DocsContent>
    </DocsLayout>
  );
}

