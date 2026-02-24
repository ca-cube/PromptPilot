import { NextResponse } from "next/server";
import { runAgent } from "@/lib/intelligence";

export async function POST(req: Request) {
    try {
        const { prompt, context } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const result = await runAgent(prompt, context);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Agent Error:", error);
        return NextResponse.json({ error: error.message || "Failed to run agent" }, { status: 500 });
    }
}
