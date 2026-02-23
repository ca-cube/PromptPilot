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
    Database,
    Search,
    Filter,
    Plus,
    Activity
} from "lucide-react";
import { Card, Badge, Button, Input } from "@/components/shared/ui";
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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 pb-20"
        >
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <motion.h2 variants={item} className="text-4xl font-black tracking-tight mb-2 text-gradient">Intelligence Dashboard</motion.h2>
                    <motion.p variants={item} className="text-zinc-500 text-lg">Real-time metrics on prompt maturity and AI efficiency.</motion.p>
                </div>
                <motion.div variants={item} className="flex items-center gap-3">
                    <Button variant="secondary" size="md">
                        <Filter size={16} /> Filters
                    </Button>
                    <Button variant="accent" size="md">
                        <Plus size={16} /> New Audit
                    </Button>
                </motion.div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Avg. Prompt Score"
                    value="74.2"
                    change="+12.5%"
                    trend="up"
                    icon={<TrendingUp size={18} className="text-indigo-400" />}
                    delay={0.1}
                />
                <StatCard
                    title="Token Savings"
                    value="$1,240"
                    change="+18.2%"
                    trend="up"
                    icon={<Zap size={18} className="text-amber-400" />}
                    delay={0.2}
                />
                <StatCard
                    title="Risk Incidents"
                    value="4"
                    change="-60%"
                    trend="down"
                    icon={<Shield size={18} className="text-emerald-400" />}
                    delay={0.3}
                />
                <StatCard
                    title="Active Seats"
                    value="128"
                    change="+4%"
                    trend="up"
                    icon={<Users size={18} className="text-zinc-400" />}
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Quality Chart */}
                <Card className="lg:col-span-2 p-8 space-y-8 min-h-[450px]" glass>
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Activity size={18} className="text-indigo-400" />
                                Prompt Quality Trend
                            </h3>
                            <p className="text-sm text-zinc-500">Average PCI Index over the last 7 days</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Live Pulse</span>
                        </div>
                    </div>
                    <div className="h-[320px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#818cf820', strokeWidth: 1 }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(9, 9, 11, 0.9)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Category Breakdown */}
                <Card className="p-8 space-y-8 min-h-[450px]" glass>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">Category Distribution</h3>
                        <p className="text-sm text-zinc-500">Departmental usage volume</p>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff05" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 700 }}
                                    width={80}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(9, 9, 11, 0.9)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Activity Table Style */}
            <Card className="p-0 overflow-hidden" glass>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 border-b border-white/[0.04] gap-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold">Recent Intelligence Audit</h3>
                        <p className="text-sm text-zinc-500">Tracking every interaction for compliance and quality.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <Input placeholder="Search logs..." className="pl-10 h-10 py-0 w-full sm:w-[250px]" />
                        </div>
                        <Button variant="ghost" size="sm" className="h-10">VIEW ALL</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">User / Action</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">PCI Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            <ActivityRow
                                user="Armaan"
                                action="Optimized Prompt"
                                score={88}
                                time="2 mins ago"
                                category="Engineering"
                                status="OPTIMIZED"
                            />
                            <ActivityRow
                                user="Sarah"
                                action="Created Template"
                                score={94}
                                time="15 mins ago"
                                category="HR"
                                status="VERIFIED"
                            />
                            <ActivityRow
                                user="System"
                                action="Flagged Risk"
                                score={32}
                                time="1 hour ago"
                                category="Legal"
                                status="FLAGGED"
                                isHighRisk
                            />
                            <ActivityRow
                                user="James"
                                action="Batch Refactor"
                                score={76}
                                time="3 hours ago"
                                category="Sales"
                                status="OPTIMIZED"
                            />
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
}

const StatCard = ({ title, value, change, trend, icon, delay }: any) => (
    <Card className="p-6 space-y-4" glass>
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{title}</span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                {icon}
            </div>
        </div>
        <div className="flex items-baseline justify-between">
            <h4 className="text-3xl font-black">{value}</h4>
            <div className={`flex items-center gap-1 text-[11px] font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <div className="w-full h-1 bg-white/[0.03] rounded-full overflow-hidden mt-2">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay }}
                className={`h-full ${trend === 'up' ? 'bg-indigo-500' : 'bg-rose-500'}`}
            />
        </div>
    </Card>
);

const ActivityRow = ({ user, action, score, time, category, status, isHighRisk }: any) => (
    <tr className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
        <td className="px-8 py-5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/[0.05]">
                    <span className="text-xs font-bold text-indigo-300">{user[0]}</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{user}</p>
                    <p className="text-xs text-zinc-500">{action} · {time}</p>
                </div>
            </div>
        </td>
        <td className="px-8 py-5">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{category}</span>
        </td>
        <td className="px-8 py-5">
            <Badge variant={isHighRisk ? "destructive" : status === "VERIFIED" ? "success" : "accent"}>
                {status}
            </Badge>
        </td>
        <td className="px-8 py-5 text-right">
            <div className={`space-y-0.5 ${isHighRisk ? 'text-rose-400' : 'text-white'}`}>
                <p className="text-lg font-black">{score}</p>
                <div className="w-12 h-1 bg-white/5 rounded-full ml-auto">
                    <div className={`h-full rounded-full ${isHighRisk ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${score}%` }} />
                </div>
            </div>
        </td>
    </tr>
);
