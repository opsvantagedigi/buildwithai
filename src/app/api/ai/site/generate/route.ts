import { NextRequest, NextResponse } from "next/server";
import { generateSite } from "@/lib/ai/generateSite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business, options } = body;

    if (!business) {
      return NextResponse.json(
        { error: "Missing business description" },
        { status: 400 },
      );
    }

    const result = await generateSite({ business, options });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_SITE_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate site" },
      { status: 500 },
    );
  }
}
