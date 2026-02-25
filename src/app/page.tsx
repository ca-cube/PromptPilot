"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Target, TrendingUp, ArrowRight, CheckCircle, Globe, Cpu, ChevronRight, Activity, Sparkles, Box } from "lucide-react";
import Link from "next/link";
import { Button, Card, Badge, Modal } from "@/components/shared/ui";
import { useState } from "react";
import { PromptConsole } from "@/components/PromptConsole";

export default function LandingPage() {
    const [isPromptOpen, setIsPromptOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-indigo-500/30">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-slow-fade" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-slow-fade" style={{ animationDelay: "1s" }} />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 blur-[80px] rounded-full animate-slow-fade" style={{ animationDelay: "2s" }} />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-background/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            <Zap size={22} className="text-black fill-current" />
                        </motion.div>
                        <span className="font-bold text-xl tracking-tighter text-gradient">PromptPilot</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-bold text-zinc-500">
                        <Link href="#features" className="hover:text-white transition-colors tracking-tight">Capabilities</Link>
                        <Link href="#solutions" className="hover:text-white transition-colors tracking-tight">Architecture</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors tracking-tight">Enterprise</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block text-sm font-bold text-zinc-400 hover:text-white transition-colors px-4">Log in</button>
                        <Link href="/dashboard">
                            <Button variant="primary" size="md" className="rounded-full shadow-lg">
                                Launch Console <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-52 pb-32 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-10 backdrop-blur-md">
                                <Badge variant="accent" className="px-2 py-0">v2.4</Badge>
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Next-Gen Prompt Governance</span>
                                <ChevronRight size={12} className="text-zinc-600" />
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.9] text-gradient">
                                The AI Trust <br /> Infrastructure.
                            </h1>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium tracking-tight">
                                Standardizing enterprise AI interaction with deterministic scoring, token-level optimization, and global compliance filters.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button
                                    variant="accent"
                                    size="lg"
                                    className="h-16 px-10 rounded-2xl text-lg group"
                                    onClick={() => setIsPromptOpen(true)}
                                >
                                    Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button variant="secondary" size="lg" className="h-16 px-10 rounded-2xl text-lg">
                                    Explore Documentation
                                </Button>
                            </div>

                            {/* Dashboard Preview / Abstract Mockup */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-32 relative group"
                            >
                                <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000" />
                                <div className="relative glass-dark rounded-[2.5rem] border border-white/10 p-4 aspect-[16/9] max-w-5xl mx-auto overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                                    <div className="w-full h-full rounded-[1.8rem] bg-zinc-950 flex flex-col overflow-hidden">
                                        <div className="h-12 border-b border-white/5 flex items-center px-6 gap-3">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                            </div>
                                            <div className="flex-1" />
                                            <div className="w-32 h-2 rounded-full bg-white/5" />
                                        </div>
                                        <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                                            <div className="col-span-3 space-y-4">
                                                <div className="h-20 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse" />
                                                <div className="h-20 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                                <div className="h-20 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse" style={{ animationDelay: "0.4s" }} />
                                            </div>
                                            <div className="col-span-9 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
                                                <div className="p-8 space-y-6">
                                                    <div className="flex justify-between items-center">
                                                        <div className="w-48 h-4 rounded-full bg-white/10" />
                                                        <div className="w-24 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/20" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="w-full h-2 rounded-full bg-white/5" />
                                                        <div className="w-full h-2 rounded-full bg-white/5" />
                                                        <div className="w-4/5 h-2 rounded-full bg-white/5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Brands / Social Proof */}
                <section className="py-24 border-y border-white/[0.04] bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-12">Empowering teams at global scale</p>
                        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale invert">
                            <span className="text-2xl font-black tracking-tighter italic">LINEAR</span>
                            <span className="text-2xl font-black tracking-tighter italic">VERCEL</span>
                            <span className="text-2xl font-black tracking-tighter italic">STRIPE</span>
                            <span className="text-2xl font-black tracking-tighter italic">NOTION</span>
                            <span className="text-2xl font-black tracking-tighter italic">SCALE</span>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-40 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gradient">Built for the Technical Elite.</h2>
                            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">Enterprise-grade utilities designed to scale with your AI requirements.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureItem
                                icon={<Activity className="text-indigo-400" />}
                                title="Deterministic Scoring"
                                description="Calculate prompt maturity (PCI) using 12 vector-based metrics including clarity, role depth, and intent precision."
                            />
                            <FeatureItem
                                icon={<Shield className="text-emerald-400" />}
                                title="Governance Engine"
                                description="Audit logs, version control, and real-time PII filtering for every interaction across your organization."
                            />
                            <FeatureItem
                                icon={<Sparkles className="text-amber-400" />}
                                title="Latency Scaling"
                                description="Automatically prune redundant instructions to reduce token waste by up to 40% without losing context."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-40 px-6">
                    <div className="max-w-5xl mx-auto">
                        <Card className="p-20 text-center relative overflow-hidden group" hover={false}>
                            <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Ready to Standardize <br /> Your AI Stack?</h2>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Button variant="accent" size="lg" className="rounded-full px-12 h-16 text-lg">
                                        Join Early Access
                                    </Button>
                                    <Button variant="ghost" size="lg" className="text-white hover:text-indigo-400">
                                        Contact Sales
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-24 border-t border-white/[0.04] px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-20 border-b border-white/[0.04] pb-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                    <Zap size={18} className="text-black fill-current" />
                                </div>
                                <span className="font-bold text-lg tracking-tighter">PromptPilot</span>
                            </div>
                            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed font-medium">
                                The trust layer for enterprise AI. Built in SF. Distributed globally.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
                            <FooterColumn title="Platform" links={["Infrastructure", "Governance", "Security", "Uptime"]} />
                            <FooterColumn title="Company" links={["About", "Investors", "Careers", "Contact"]} />
                            <FooterColumn title="Resources" links={["Docs", "API Reference", "Status", "Privacy"]} />
                        </div>
                    </div>
                    <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">© 2024 PromptPilot Infrastructure Inc.</p>
                        <div className="flex gap-8">
                            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">GitHub</span>
                            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Twitter</span>
                            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Discord</span>
                        </div>
                    </div>
                </div>
            </footer>

            <Modal
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                title="PromptPilot Intelligence Console"
            >
                <PromptConsole />
            </Modal>
        </div>
    );
}

const FeatureItem = ({ icon, title, description }: any) => (
    <Card className="p-10 space-y-6 group" glass>
        <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500 shadow-xl group-hover:shadow-indigo-500/10">
            {icon}
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-zinc-500 leading-relaxed font-medium tracking-tight">
            {description}
        </p>
    </Card>
);

const FooterColumn = ({ title, links }: any) => (
    <div className="space-y-8">
        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{title}</h4>
        <ul className="space-y-4">
            {links.map((link: string) => (
                <li key={link} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors cursor-pointer">{link}</li>
            ))}
        </ul>
    </div>
);
