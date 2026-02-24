"use client";

import { useState } from "react";
import { Button, Textarea, Card, Badge } from "@/components/shared/ui";
import { Sparkles, Send, Loader2, CheckCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PromptConsole() {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleRunAgent = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Agent failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <Textarea
                    placeholder="Enter your prompt idea here (e.g. 'Write a blog post about AI ethics')..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="relative text-lg p-6 bg-zinc-900/50 border-white/10"
                />
            </div>

            <div className="flex justify-end">
                <Button
                    variant="accent"
                    size="lg"
                    onClick={handleRunAgent}
                    disabled={isLoading || !prompt}
                    className="min-w-[160px]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Deploy Agent
                        </>
                    )
                    }
                </Button>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <Card className="p-6 bg-white/[0.02] border-white/5">
                            <div className="flex items-center gap-2 mb-4 text-indigo-400">
                                <Zap size={18} />
                                <span className="font-bold uppercase tracking-wider text-xs">Strategist Reasoning</span>
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                                {result.text}
                            </p>

                            {result.toolResults && result.toolResults.some((tr: any) => tr.toolName === 'optimize_prompt') && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <CheckCircle size={18} />
                                        <span className="font-bold uppercase tracking-wider text-xs">Optimized Enterprise Prompt</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 font-mono text-xs text-zinc-400 overflow-x-auto">
                                        {result.toolResults.find((tr: any) => tr.toolName === 'optimize_prompt')?.result}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
