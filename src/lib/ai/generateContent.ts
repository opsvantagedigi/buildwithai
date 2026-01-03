import type {
  ContentGenerationRequest,
  ContentGenerationResult,
} from "@/types/ai";

export async function generateContent(
  input: ContentGenerationRequest,
): Promise<ContentGenerationResult> {
  const { slot, context } = input;

  // Placeholder stub for different content slots.
  switch (slot) {
    case "hero":
      return {
        slot,
        text: "Build a complete website in seconds — powered by AI.",
      };
    default:
      return {
        slot,
        text: `Generated content for ${slot} with context: ${context ?? "none"}`,
      };
  }
}

