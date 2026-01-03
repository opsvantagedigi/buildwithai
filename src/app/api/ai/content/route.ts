import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/ai/generateContent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slot, context } = body;

    if (!slot) {
      return NextResponse.json(
        { error: "Missing content slot" },
        { status: 400 },
      );
    }

    const result = await generateContent({ slot, context });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_CONTENT_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
