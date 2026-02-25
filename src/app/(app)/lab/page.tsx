"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Copy, CheckCircle, RefreshCcw, Shield, Info, Send, Command, Target, Trash, Layout } from "lucide-react";
import { Badge, Card, Button } from "@/components/shared/ui";
import { INDUSTRY_TEMPLATES } from "@/lib/templates";

interface AnalysisResult {
    score: number;
    missing: string[];
    suggestions: { type: string; message: string }[];
    optimized: string;
    tokens: number;
    cost: number;
    risk_level: 'low' | 'medium' | 'high';
    hallucination_probability: number;
}

export default function PromptLabPage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [copied, setCopied] = useState(false);

    const applyTemplate = (templatePrompt: string) => {
        setPrompt(templatePrompt);
        setAnalysis(null);
    };

    const performAnalysis = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            // Extract optimization and analysis from agent tool results
            const toolOutput = data.toolResults?.find((tr: any) => tr.toolName === "optimize_prompt")?.result;
            const optimizedPrompt = toolOutput?.optimized || data.text;
            const realAnalysis = toolOutput?.analysis;

            setAnalysis({
                score: realAnalysis?.score || 85,
                missing: realAnalysis?.missing_components || [],
                suggestions: realAnalysis?.suggestions || [{ type: "info", message: data.text.split('.')[0] || "Agent analyzed and optimized the strategy." }],
                optimized: optimizedPrompt,
                tokens: realAnalysis?.estimated_tokens || 450,
                cost: (realAnalysis?.estimated_tokens || 450) * 0.00001,
                risk_level: realAnalysis?.risk_level || 'low',
                hallucination_probability: realAnalysis?.hallucination_probability || 0.02
            });
        } catch (error: any) {
            console.error("Lab Error:", error);
            alert("Analysis failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (analysis?.optimized) {
            navigator.clipboard.writeText(analysis.optimized);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Prompt Lab</h2>
                    <p className="text-zinc-500 text-lg">Architect enterprise-grade prompts with real-time analysis.</p>
                </div>
                <div className="flex gap-3">
                    <Badge>RAW MODE</Badge>
                    <Badge variant="accent">V3.4 ENGINE</Badge>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Templates Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Layout size={16} className="text-zinc-500" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Industry Templates</h3>
                    </div>
                    <div className="space-y-3">
                        {INDUSTRY_TEMPLATES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => applyTemplate(t.prompt)}
                                className="w-full text-left p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all group"
                            >
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">{t.category}</p>
                                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{t.name}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">{t.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-6 space-y-8">
                    <Card className="!p-0 overflow-hidden relative group" glass>
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-50" />

                        <div className="p-6 border-b border-white/[0.04] bg-white/[0.01] flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Input Kernel</span>
                                <div className="h-4 w-px bg-white/[0.06]" />
                                <span className="text-[10px] font-mono text-zinc-600">{prompt.length} CHR</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-white/5 rounded transition-colors text-zinc-600 hover:text-white" onClick={() => setPrompt("")}>
                                    <Trash size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <textarea
                                className="w-full bg-transparent border-none text-white text-lg font-medium font-sans focus:outline-none placeholder:text-zinc-700 min-h-[400px] leading-relaxed resize-none"
                                placeholder="What exactly should the AI do today...?"
                                value={prompt}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                            />
                        </div>

                        <div className="p-6 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
                            <div className="flex gap-6">
                                <ToolToggle icon={<Target size={14} />} label="Detect Intent" active />
                                <ToolToggle icon={<Shield size={14} />} label="Check Compliance" />
                            </div>
                            <Button
                                onClick={performAnalysis}
                                disabled={loading || !prompt.trim()}
                                className="px-6 py-3"
                            >
                                {loading ? <RefreshCcw size={16} className="animate-spin" /> : <Zap size={16} />}
                                {loading ? "ANALYZING..." : "Architect & Optimize"}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Intelligence Area */}
                <div className="lg:col-span-3 space-y-10">
                    <AnimatePresence mode="wait">
                        {!analysis ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[500px] border border-dashed border-white/[0.06] rounded-2xl flex flex-col items-center justify-center p-12 text-center bg-white/[0.01]">
                                <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-6">
                                    <Command size={24} className="text-zinc-600" />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Kernel Idle</h4>
                                <p className="text-xs text-zinc-600 leading-relaxed">Enter your prompt or select a template to start real-time intelligence simulation.</p>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                {/* Score Panel */}
                                <Card className="p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 text-indigo-500/20 scale-[4] group-hover:scale-[4.5] transition-all duration-700">
                                        <Target />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Calculated PCI Index</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-6xl font-black ${analysis.score > 70 ? 'text-emerald-400' : analysis.score > 40 ? 'text-amber-400' : 'text-rose-400'}`}>{analysis.score}</span>
                                            <span className="text-sm font-bold text-zinc-600">UNITS</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${analysis.score}%` }}
                                                className={`h-full ${analysis.score > 70 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : analysis.score > 40 ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}
                                            />
                                        </div>
                                    </div>
                                </Card>

                                {/* Gaps */}
                                <Card className="p-8 space-y-6">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/[0.04] pb-4">Structural Analysis</h4>
                                    <div className="space-y-4">
                                        {analysis.suggestions.map((s, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="mt-1 flex-shrink-0">
                                                    {s.type === "missing" ? <Info size={14} className="text-zinc-500" /> : <Zap size={14} className="text-indigo-400" />}
                                                </div>
                                                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{s.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Intelligence Matrix */}
                                <Card className="p-8 space-y-4">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Intelligence Matrix</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-zinc-500">Risk level</span>
                                            <Badge variant={analysis.risk_level === 'high' ? 'destructive' : 'default'} className="uppercase text-[8px]">{analysis.risk_level}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-zinc-500">Hallucination Prob</span>
                                            <span className="text-xs font-mono text-zinc-300">{(analysis.hallucination_probability * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Output Panel */}
            <AnimatePresence>
                {analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 pt-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-bold">Optimized Engine Output</h3>
                                <Badge variant="accent">v3.4-prod</Badge>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="flex gap-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <span>Lp: {analysis.tokens} tk</span>
                                    <span>Ef: ${analysis.cost.toFixed(4)} exp</span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className="p-2"
                                    >
                                        {copied ? <CheckCircle size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    </Button>
                                    <Button size="sm">
                                        <Send size={14} /> Send to Model
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 rounded-2xl bg-[#030303] border border-white/[0.04] font-mono text-sm text-zinc-400 leading-9 select-all whitespace-pre-wrap selection:bg-indigo-500/20">
                            {analysis.optimized}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const ToolToggle = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
    <div className={`flex items-center gap-2 cursor-pointer transition-colors ${active ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"}`}>
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
);
