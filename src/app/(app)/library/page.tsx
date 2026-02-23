"use client";

import React from "react";
import { Plus, Grid, List as ListIcon, Star, Info } from "lucide-react";
import { Card, Badge, Button, Input } from "@/components/shared/ui";
import { INDUSTRY_TEMPLATES } from "@/lib/templates";

export default function LibraryPage() {
    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Prompt Library</h2>
                    <p className="text-zinc-500 text-lg">Centralized repository for verified, top-performing enterprise templates.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2"><Star size={16} /> Favorites</Button>
                    <Button className="gap-2"><Plus size={16} /> New Template</Button>
                </div>
            </header>

            <div className="flex gap-4 items-center border-b border-white/[0.04] pb-8">
                <button className="text-sm font-bold border-b-2 border-indigo-500 pb-2 px-1">Global Templates</button>
                <button className="text-sm font-medium text-zinc-500 hover:text-white transition-colors pb-2 px-1">Private Library</button>
                <button className="text-sm font-medium text-zinc-500 hover:text-white transition-colors pb-2 px-1">Department Shared</button>
                <div className="ml-auto flex gap-4">
                    <button className="p-2 bg-white/5 rounded-lg text-white"><Grid size={18} /></button>
                    <button className="p-2 text-zinc-600 hover:text-white transition-colors"><ListIcon size={18} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {INDUSTRY_TEMPLATES.map((t) => (
                    <Card key={t.id} className="p-8 space-y-6 flex flex-col hover:border-indigo-500/30 transition-all group">
                        <div className="flex justify-between items-start">
                            <Badge variant="accent">{t.category}</Badge>
                            <button className="text-zinc-700 hover:text-amber-400 transition-colors">
                                <Star size={18} />
                            </button>
                        </div>
                        <div className="space-y-2 flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{t.name}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed font-medium line-clamp-2">
                                {t.description}
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center">
                                    <span className="text-[10px] font-bold">P</span>
                                </div>
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">PROMPT PILOT</span>
                            </div>
                            <Button size="sm" variant="secondary">Use Template</Button>
                        </div>
                    </Card>
                ))}

                {/* Example of a custom user template */}
                <Card className="p-8 space-y-6 flex flex-col border-dashed border-white/[0.1] bg-transparent hover:bg-white/[0.01] transition-all group">
                    <div className="flex justify-between items-start">
                        <Badge variant="default">Engineering</Badge>
                        <button className="text-amber-400">
                            <Star size={18} fill="currentColor" />
                        </button>
                    </div>
                    <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">API Endpoint Architect</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                            Converts plain text requirements into production-ready FastAPI endpoint definitions with full typing.
                        </p>
                    </div>
                    <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-indigo-400">A</span>
                            </div>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">ADMIN_901</span>
                        </div>
                        <Button size="sm" variant="secondary">Use Template</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
