"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Target, TrendingUp, ArrowRight, CheckCircle, Globe, Cpu } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-accent/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                            <Zap size={18} className="text-black" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">PromptPilot</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</button>
                        <Link href="/dashboard" className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all">
                            Go to App
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6">
                <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-8 inline-block">
                            Introducing PromptPilot 2.4
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
                            The AI Efficiency <br /> Infrastructure.
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Analyze, score, and optimize your enterprise AI instructions. Reduce token waste by 40% and ensure absolute compliance.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                Launch Workspace <ArrowRight size={20} />
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                                Book a Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="py-12 border-y border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale contrast-125">
                    <span className="text-xl font-bold tracking-tighter italic">LINEAR</span>
                    <span className="text-xl font-bold tracking-tighter italic">VERCEL</span>
                    <span className="text-xl font-bold tracking-tighter italic">STRIPE</span>
                    <span className="text-xl font-bold tracking-tighter italic">NOTION</span>
                    <span className="text-xl font-bold tracking-tighter italic">SCALE</span>
                </div>
            </section>

            {/* Grid Features */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Target className="text-indigo-400" />}
                            title="Real-Time Scoring"
                            description="Get instant scores (0-100) based on role clarity, context depth, and objective precision."
                        />
                        <FeatureCard
                            icon={<Shield className="text-emerald-400" />}
                            title="Governance Ready"
                            description="Every prompt is logged, versioned, and checked against enterprise compliance standards."
                        />
                        <FeatureCard
                            icon={<Cpu className="text-amber-400" />}
                            title="Token Optimization"
                            description="Automatically rewrite prompts to be concise yet effective, reducing API costs instantly."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/[0.04] px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                                <Zap size={14} className="text-black" />
                            </div>
                            <span className="font-bold tracking-tight">PromptPilot</span>
                        </div>
                        <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                            Standardizing the way enterprises interact with Large Language Models. Built for the technical elite.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                        <FooterList title="Product" items={["Features", "Dashboard", "Governance", "Privacy"]} />
                        <FooterList title="Company" items={["About", "Customers", "Enterprise", "Security"]} />
                        <FooterList title="Resources" items={["Docs", "Blog", "Status", "API"]} />
                    </div>
                </div>
            </footer>
        </div>
    );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 glass-panel space-y-4"
    >
        <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm">
            {description}
        </p>
    </motion.div>
);

const FooterList = ({ title, items }: { title: string, items: string[] }) => (
    <div className="space-y-4">
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{title}</h4>
        <ul className="space-y-2">
            {items.map(i => (
                <li key={i} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">{i}</li>
            ))}
        </ul>
    </div>
);
