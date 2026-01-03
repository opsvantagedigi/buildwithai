import { NextRequest, NextResponse } from "next/server";
import { generatePage } from "@/lib/ai/generatePage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, context } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Missing page definition" },
        { status: 400 },
      );
    }

    const result = await generatePage({ page, context });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_PAGE_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate page" },
      { status: 500 },
    );
  }
}
