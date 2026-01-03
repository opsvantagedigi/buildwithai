import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsContent from "@/components/docs/DocsContent";

const markdown = `
# AI in Build With AI

This section will explain:

- How AI generates sites, pages, and sections
- What inputs are used
- Limitations and best practices
`;

export default function AiDocsPage() {
  return (
    <DocsLayout>
      <DocsContent>{markdown}</DocsContent>
    </DocsLayout>
  );
}

