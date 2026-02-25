"use client";

import { useState } from "react";
import { Button, Textarea, Card, Badge } from "@/components/shared/ui";
import { Sparkles, Send, Loader2, CheckCircle, Zap, Cpu, Target, Activity } from "lucide-react";
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
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000" />
                <Textarea
                    placeholder="Describe what you want the AI to do... be as specific or as vague as you want."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="relative text-lg p-6 bg-white/[0.02] border-white/5 focus:border-indigo-500/50 transition-all duration-500"
                />
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Badge variant="outline" className="h-6">Agentic Reasoning</Badge>
                    <Badge variant="outline" className="h-6">Multi-Step</Badge>
                </div>
                <Button
                    variant="accent"
                    size="lg"
                    onClick={handleRunAgent}
                    disabled={isLoading || !prompt}
                    className="group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Strategizing...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                            Consult Pilot
                        </>
                    )
                    }
                </Button>
            </div>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4"
                    >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Agent is deliberating on strategy...</span>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <Card className="p-8 bg-zinc-950/50 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Badge variant="success">Completed</Badge>
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <Cpu size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Pilot Intelligence Report</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">Strategic Deliberation Output</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {result.text && (
                                    <div className="prose prose-invert max-w-none">
                                        <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                                            {result.text}
                                        </div>
                                    </div>
                                )}

                                {result.toolResults && result.toolResults.length > 0 ? (
                                    result.toolResults.map((tr: any, idx: number) => (
                                        <div key={idx} className="space-y-4">
                                            {tr.toolName === 'optimize_prompt' && (
                                                <div className="space-y-4 pt-6 border-t border-white/5">
                                                    <div className="flex items-center gap-2 text-emerald-400">
                                                        <Target size={16} />
                                                        <span className="font-bold uppercase tracking-wider text-[10px]">Strategically Optimized Prompt</span>
                                                    </div>
                                                    <div className="p-6 rounded-2xl bg-black border border-white/10 font-mono text-xs text-zinc-400 leading-relaxed group relative">
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(tr.result)}
                                                            className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-black text-zinc-400 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded"
                                                        >
                                                            Copy Prompt
                                                        </button>
                                                        {tr.result}
                                                    </div>
                                                </div>
                                            )}

                                            {tr.toolName === 'simulate_execution' && (
                                                <div className="p-6 rounded-2xl bg-indigo-500/[0.02] border border-indigo-500/10">
                                                    <div className="flex items-center gap-2 text-indigo-400 mb-3">
                                                        <Activity size={16} />
                                                        <span className="font-bold uppercase tracking-wider text-[10px]">Execution Simulation Result</span>
                                                    </div>
                                                    <p className="text-xs text-zinc-400 italic leading-relaxed">
                                                        {tr.result.simulation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center">
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">No external tools were required for this analysis</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
