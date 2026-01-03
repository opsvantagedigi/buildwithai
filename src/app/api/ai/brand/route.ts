import { NextRequest, NextResponse } from "next/server";
import { generateBrand } from "@/lib/ai/generateBrand";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business } = body;

    if (!business) {
      return NextResponse.json(
        { error: "Missing business description" },
        { status: 400 },
      );
    }

    const result = await generateBrand({ business });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_BRAND_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate brand" },
      { status: 500 },
    );
  }
}
