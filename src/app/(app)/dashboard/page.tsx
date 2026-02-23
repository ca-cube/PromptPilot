"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Zap,
    Shield,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Database
} from "lucide-react";
import { Card, Badge } from "@/components/shared/ui";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";

const data = [
    { name: "Mon", score: 45, volume: 120 },
    { name: "Tue", score: 52, volume: 150 },
    { name: "Wed", score: 48, volume: 200 },
    { name: "Thu", score: 61, volume: 180 },
    { name: "Fri", score: 75, volume: 250 },
    { name: "Sat", score: 82, volume: 100 },
    { name: "Sun", score: 88, volume: 90 },
];

const categoryData = [
    { name: "Sales", value: 400, color: "#818cf8" },
    { name: "Marketing", value: 300, color: "#34d399" },
    { name: "HR", value: 200, color: "#f472b6" },
    { name: "Legal", value: 150, color: "#fbbf24" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-12">
            <header>
                <h2 className="text-4xl font-black tracking-tight mb-2">Intelligence Dashboard</h2>
                <p className="text-zinc-500 text-lg">Real-time metrics on prompt maturity and AI efficiency across your organization.</p>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Avg. Prompt Score"
                    value="74.2"
                    change="+12.5%"
                    trend="up"
                    icon={<TrendingUp size={18} className="text-indigo-400" />}
                />
                <StatCard
                    title="Token Savings"
                    value="$1,240"
                    change="+18.2%"
                    trend="up"
                    icon={<Zap size={18} className="text-amber-400" />}
                />
                <StatCard
                    title="Risk Incidents"
                    value="4"
                    change="-60%"
                    trend="down"
                    icon={<Shield size={18} className="text-emerald-400" />}
                />
                <StatCard
                    title="Active Seats"
                    value="128"
                    change="+4%"
                    trend="up"
                    icon={<Users size={18} className="text-zinc-400" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Quality Chart */}
                <Card className="lg:col-span-2 p-8 space-y-8" glass>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">Prompt Quality Trend</h3>
                            <p className="text-sm text-zinc-500">Average PCI Index over the last 7 days</p>
                        </div>
                        <Badge variant="accent">LIVE UPDATES</Badge>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Category Breakdown */}
                <Card className="p-8 space-y-8" glass>
                    <div>
                        <h3 className="text-lg font-bold">Category Distribution</h3>
                        <p className="text-sm text-zinc-500">Most active departments by volume</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff08" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                                    width={80}
                                />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-white/[0.04] pb-6">
                    <h3 className="text-lg font-bold">Recent Intelligence Audit</h3>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">VIEW ALL LOGS</button>
                </div>
                <div className="space-y-4">
                    <ActivityItem
                        user="Armaan"
                        action="Optimized Prompt"
                        score={88}
                        time="2 mins ago"
                        category="Engineering"
                    />
                    <ActivityItem
                        user="Sarah"
                        action="Created Template"
                        score={94}
                        time="15 mins ago"
                        category="HR"
                    />
                    <ActivityItem
                        user="System"
                        action="Flagged Risk"
                        score={32}
                        time="1 hour ago"
                        category="Legal"
                        isHighRisk
                    />
                    <ActivityItem
                        user="James"
                        action="Batch Refactor"
                        score={76}
                        time="3 hours ago"
                        category="Sales"
                    />
                </div>
            </Card>
        </div>
    );
}

const StatCard = ({ title, value, change, trend, icon }: any) => (
    <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{title}</span>
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                {icon}
            </div>
        </div>
        <div className="flex items-baseline justify-between">
            <h4 className="text-3xl font-black">{value}</h4>
            <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
    </Card>
);

const ActivityItem = ({ user, action, score, time, category, isHighRisk }: any) => (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/[0.05]">
                <span className="text-xs font-bold text-indigo-300">{user[0]}</span>
            </div>
            <div>
                <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{user} <span className="text-zinc-500 font-medium">· {action}</span></p>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> {time}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                        <Database size={10} /> {category}
                    </span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className={`text-right ${isHighRisk ? 'text-rose-400' : 'text-zinc-400'}`}>
                <p className="text-xs font-bold uppercase tracking-widest">PCI Score</p>
                <p className="text-xl font-black">{score}</p>
            </div>
            {isHighRisk && <Badge variant="destructive">RISK FLAG</Badge>}
        </div>
    </div>
);
