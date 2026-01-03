import type {
  SectionGenerationRequest,
  SectionGenerationResult,
} from "@/types/ai";

export async function generateSection(
  input: SectionGenerationRequest,
): Promise<SectionGenerationResult> {
  const { section, context } = input;

  return {
    section: {
      ...section,
      data: {
        ...(section.data ?? {}),
        generatedFrom: context ?? "initial",
      },
    },
  };
}

