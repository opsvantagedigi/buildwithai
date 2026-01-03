import type { PageGenerationRequest, PageGenerationResult } from "@/types/ai";

export async function generatePage(
  input: PageGenerationRequest,
): Promise<PageGenerationResult> {
  // Placeholder: call your LLM with the page intent and context.
  const { page, context } = input;

  return {
    page: {
      ...page,
      sections: page.sections ?? [
        { id: "section-1", type: "generic", data: { context } },
      ],
    },
  };
}

