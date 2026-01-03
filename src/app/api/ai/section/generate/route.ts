import { NextRequest, NextResponse } from "next/server";
import { generateSection } from "@/lib/ai/generateSection";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, context } = body;

    if (!section) {
      return NextResponse.json(
        { error: "Missing section definition" },
        { status: 400 },
      );
    }

    const result = await generateSection({ section, context });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_SECTION_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate section" },
      { status: 500 },
    );
  }
}
