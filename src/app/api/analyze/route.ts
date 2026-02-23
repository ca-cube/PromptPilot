import { NextResponse } from "next/server";
import { analyzePrompt } from "@/lib/intelligence";

export async function POST(req: Request) {
    try {
        const { prompt, context } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const analysis = await analyzePrompt(prompt, context);
        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error("Analysis Error:", error);
        return NextResponse.json({ error: error.message || "Failed to analyze prompt" }, { status: 500 });
    }
}
