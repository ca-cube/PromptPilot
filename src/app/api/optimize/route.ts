import { NextResponse } from "next/server";
import { optimizePrompt } from "@/lib/intelligence";

export async function POST(req: Request) {
    try {
        const { prompt, analysis, context } = await req.json();
        if (!prompt || !analysis) {
            return NextResponse.json({ error: "Prompt and analysis are required" }, { status: 400 });
        }

        const optimized = await optimizePrompt(prompt, analysis, context);
        return NextResponse.json({ optimized });
    } catch (error: any) {
        console.error("Optimization Error:", error);
        return NextResponse.json({ error: error.message || "Failed to optimize prompt" }, { status: 500 });
    }
}
