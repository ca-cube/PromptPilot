"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Command, LayoutDashboard, History, Settings, Zap, BookOpen, Layers, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Command, label: "Prompt Lab", href: "/lab" },
    { icon: LayoutDashboard, label: "Analytics", href: "/dashboard" },
    { icon: History, label: "History", href: "/history" },
    { icon: BookOpen, label: "Library", href: "/library" },
    { icon: Layers, label: "Governance", href: "/governance" },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] border-r border-white/[0.04] bg-zinc-950/50 backdrop-blur-3xl flex flex-col h-screen sticky top-0 flex-shrink-0 z-50">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-10 px-2 cursor-pointer group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <Zap size={18} className="text-black" />
                    </motion.div>
                    <span className="font-bold text-[16px] tracking-tighter text-gradient">PromptPilot</span>
                </Link>

                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden",
                                    isActive
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-zinc-200"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-white/[0.04] border border-white/[0.05] rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon size={18} className={cn(
                                    "relative z-10 transition-colors",
                                    isActive ? "text-indigo-400" : "group-hover:text-zinc-300"
                                )} />
                                <span className="relative z-10 text-[13.5px] font-semibold">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.04] space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Gateway Ready</span>
                        </div>
                        <Badge variant="success" className="h-4 px-1.5">v2.4</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
                            <User size={14} className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-zinc-300 leading-tight">Admin_901</p>
                            <p className="text-[9px] text-zinc-500 font-medium">Enterprise Tier</p>
                        </div>
                    </div>
                </div>

                <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-white transition-all hover:bg-white/[0.02]">
                    <Settings size={18} />
                    <span className="text-[13px] font-semibold">Workspace Settings</span>
                </Link>
            </div>
        </aside>
    );
};

const Badge = ({ children, variant, className }: any) => (
    <div className={cn("rounded-full border flex items-center justify-center font-bold text-[9px] uppercase tracking-tighter",
        variant === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "",
        className
    )}>
        {children}
    </div>
)
