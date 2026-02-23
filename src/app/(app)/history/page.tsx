"use client";

import React from "react";
import { Search, Filter, Clock, ExternalLink } from "lucide-react";
import { Card, Badge, Input, Button } from "@/components/shared/ui";

const historyData = [
    { id: 1, title: "Q4 Security Audit Log Analysis", score: 88, time: "2 hours ago", category: "Engineering", status: "optimized" },
    { id: 2, title: "Customer Success Onboarding Email", score: 92, time: "5 hours ago", category: "Sales", status: "optimized" },
    { id: 3, title: "React Performance Review Draft", score: 45, time: "Yesterday", category: "Engineering", status: "flagged" },
    { id: 4, title: "NDA for Vertex Partners", score: 96, time: "2 days ago", category: "Legal", status: "active" },
    { id: 5, title: "Social Media Campaign Q1", score: 72, time: "3 days ago", category: "Marketing", status: "draft" },
];

export default function HistoryPage() {
    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Prompt History</h2>
                    <p className="text-zinc-500 text-lg">Comprehensive audit trail of every prompt iteration and its performance.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="sm">EXPORT LOGS</Button>
                </div>
            </header>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <Input placeholder="Search prompts, categories or users..." className="pl-12" />
                </div>
                <Button variant="secondary" className="gap-2">
                    <Filter size={16} /> Filter
                </Button>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Entry Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Score</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Last Activity</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {historyData.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white/[0.05] flex items-center justify-center">
                                            <Clock size={14} className="text-zinc-500" />
                                        </div>
                                        <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{item.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs text-zinc-500">{item.category}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`text-sm font-mono font-bold ${item.score > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.score}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs text-zinc-600">{item.time}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <Badge variant={item.status === 'flagged' ? 'destructive' : item.status === 'optimized' ? 'accent' : 'default'}>
                                        {item.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-2 hover:bg-white/5 rounded transition-colors text-zinc-600 hover:text-white">
                                        <ExternalLink size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
