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
export async function runAgent(prompt: string, context?: string) {
    const { text, toolCalls, toolResults } = await generateText({
        model: google("gemini-1.5-pro-latest"),
        system: `You are the PromptPilot Core Intelligence. 
        Your goal is to process user prompts using an agentic approach. 
        1. First, analyze the intent.
        2. Use the 'optimize_prompt' tool if the prompt is weak.
        3. Use the 'simulate_execution' tool to predict the outcome.
        4. Provide a final reasoned response with the optimized prompt and the simulation result.
        
        Always be professional, concise, and focused on enterprise value.`,
        prompt: `User Prompt: ${prompt}\nContext: ${context || "None"}`,
        tools: {
            optimize_prompt: {
                description: "Optimizes a prompt for better AI performance.",
                parameters: z.object({
                    originalPrompt: z.string(),
                    reasoning: z.string().description("Why this optimization is needed"),
                }),
                execute: async ({ originalPrompt, reasoning }) => {
                    // In a real agent, this might call another service or model
                    const analysis = await analyzePrompt(originalPrompt);
                    return optimizePrompt(originalPrompt, analysis);
                }
            },
            simulate_execution: {
                description: "Simulates how an LLM would react to this prompt.",
                parameters: z.object({
                    prompt: z.string(),
                    persona: z.string().description("The persona of the LLM to simulate"),
                }),
                execute: async ({ prompt, persona }) => {
                    const { text } = await generateText({
                        model: google("gemini-1.5-flash-latest"),
                        system: `Simulate being a ${persona}. How would you respond to this prompt?`,
                        prompt,
                    });
                    return { simulation: text, status: "success" };
                }
            }
        },
        maxSteps: 5, // Allow the agent to deliberate
    });

    return { text, toolCalls, toolResults };
}
