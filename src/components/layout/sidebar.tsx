"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Command, LayoutDashboard, History, Settings, Zap, BookOpen, Layers } from "lucide-react";

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
        <aside className="w-[240px] border-r border-white/[0.04] bg-sidebar flex flex-col h-screen sticky top-0 flex-shrink-0">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-10 px-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <Zap size={18} className="text-black" />
                    </div>
                    <span className="font-bold text-[15px] tracking-tight">PromptPilot</span>
                </Link>
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                                        ? "bg-white/5 text-white"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                                    }`}
                            >
                                <Icon size={18} className={isActive ? "text-accent" : "text-zinc-500 group-hover:text-zinc-400"} />
                                <span className="text-[13px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Gateway Ready</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-tight">Connected as <span className="text-zinc-300">Admin_901</span></p>
                </div>
                <div className="flex items-center gap-3 px-2 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    <Settings size={18} />
                    <span className="text-[13px] font-medium">Settings</span>
                </div>
            </div>
        </aside>
    );
};
