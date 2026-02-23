import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const AnalysisSchema = z.object({
    score: z.number().min(0).max(100),
    missing_components: z.array(z.string()),
    intent: z.string(),
    clarity_score: z.number().min(0).max(10),
    suggestions: z.array(z.object({
        type: z.string(),
        message: z.string()
    })),
    risk_level: z.enum(["low", "medium", "high"]),
    hallucination_probability: z.number().min(0).max(1),
    estimated_tokens: z.number()
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;

export async function analyzePrompt(prompt: string, context?: string): Promise<AnalysisResult> {
    const { object } = await generateObject({
        model: google("gemini-1.5-pro-latest"),
        schema: AnalysisSchema,
        system: "You are a Prompt Engineering Expert. Analyze the user's prompt for enterprise readiness. Evaluate Role, Context, Constraints, Format, and Goal. Provide suggestions and risk analysis.",
        prompt: `User Prompt: ${prompt}\nBusiness Context: ${context || "None provided"}`,
    });

    return object;
}

export async function optimizePrompt(prompt: string, analysis: AnalysisResult, context?: string): Promise<string> {
    const { text } = await generateText({
        model: google("gemini-1.5-pro-latest"),
        system: "You are an expert Prompt Engineer. Rewrite the user's prompt to be 'enterprise-ready' using the provided analysis. Ensure the optimized prompt includes a clear Persona, Context, Constraints, and Output Format. Keep it concise yet powerful.",
        prompt: `Original Prompt: ${prompt}\nMissing Components: ${analysis.missing_components.join(", ")}\nContext: ${context || "None"}\nGoal: ${analysis.intent}`,
    });

    return text;
}
