import type { BrandGenerationRequest, BrandGenerationResult } from "@/types/ai";

export async function generateBrand(
  input: BrandGenerationRequest,
): Promise<BrandGenerationResult> {
  const { business } = input;

  return {
    name: business.name ?? "Your Brand",
    tagline: "Powered by AI, crafted for humans.",
    tone: "confident",
    palette: ["#0F172A", "#3B82F6", "#22C55E", "#FACC15"],
  };
}

