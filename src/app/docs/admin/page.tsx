import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsContent from "@/components/docs/DocsContent";

const markdown = `
# Admin Dashboard

This section will document:

- Site inventory
- Domain status per site
- AI usage logs (non-sensitive)
- KV and warm job health
- Release and change visibility
`;

export default function AdminDocsPage() {
  return (
    <DocsLayout>
      <DocsContent>{markdown}</DocsContent>
    </DocsLayout>
  );
}

