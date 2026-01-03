import type { SiteGenerationRequest, SiteGenerationResult } from "@/types/ai";

export async function generateSite(
  input: SiteGenerationRequest,
): Promise<SiteGenerationResult> {
  // Placeholder: wire to your AI provider (OpenAI, Azure, etc.)
  // For now, return a minimal multi-page site structure.
  const { business, options } = input;

  return {
    pages: [
      {
        slug: "",
        title: `${business.name ?? "Your business"} — Home`,
        sections: [
          { id: "hero", type: "hero", data: { heading: business.summary } },
          { id: "about", type: "about", data: {} },
          { id: "services", type: "services", data: {} },
          { id: "contact", type: "contact", data: {} },
        ],
      },
    ],
    meta: {
      tone: options?.tone ?? "professional",
      style: options?.style ?? "modern",
    },
  };
}

