"use client";

import React from "react";
import { Shield, Eye, Lock, Globe, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, Badge, Button } from "@/components/shared/ui";

export default function GovernancePage() {
    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Governance & Policy</h2>
                    <p className="text-zinc-500 text-lg">Define security perimeters, compliance rules, and PII masking protocols.</p>
                </div>
                <Button className="gap-2"><Lock size={16} /> Update Directives</Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Policy Status */}
                <Card className="lg:col-span-2 p-8 space-y-8" glass>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <Shield className="text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Standard Enterprise Directive</h3>
                                <p className="text-sm text-zinc-500">v1.2.4 · Last updated Oct 12, 2025</p>
                            </div>
                        </div>
                        <Badge variant="accent">ENFORCING</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PolicyRule
                            title="PII Automatic Masking"
                            status="enabled"
                            description="Automatically detects and masks names, emails, and phone numbers before API transmission."
                        />
                        <PolicyRule
                            title="Competitive Neutrality"
                            status="enabled"
                            description="Prevents mentioning internal code names or trade secrets in LLM prompts."
                        />
                        <PolicyRule
                            title="Format Standardization"
                            status="warning"
                            description="Enforces 'Chain-of-Thought' reasoning in all complex technical requests."
                        />
                        <PolicyRule
                            title="Hallucination Guard"
                            status="enabled"
                            description="Adds verification steps to any prompt with a high factual accuracy requirement."
                        />
                    </div>
                </Card>

                {/* Compliance Sidebar */}
                <Card className="p-8 space-y-8">
                    <h3 className="text-lg font-bold">Compliance Matrix</h3>
                    <div className="space-y-6">
                        <ComplianceItem label="SOC2 Type II" status="Compliant" />
                        <ComplianceItem label="GDPR Article 25" status="Compliant" />
                        <ComplianceItem label="HIPAA Privacy" status="Not Configured" />
                        <ComplianceItem label="ISO 27001" status="Audit Pending" />
                    </div>
                    <Button variant="secondary" className="w-full">View Audit Trail</Button>
                </Card>
            </div>

            {/* Restricted Topics */}
            <Card className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-white/[0.04] pb-6">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-400" />
                        <h3 className="text-lg font-bold">Restricted Topic Quarantine</h3>
                    </div>
                    <Button variant="ghost" size="sm">Manage List</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {["Financial Projections", "M&A Strategy", "Employee PII", "Customer Passwords", "Source Code (Pre-Alpha)", "Internal Salary Tiers"].map(topic => (
                        <Badge key={topic} variant="outline" className="py-2 px-4 border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 cursor-default transition-all">
                            {topic}
                        </Badge>
                    ))}
                </div>
            </Card>
        </div>
    );
}

const PolicyRule = ({ title, status, description }: any) => (
    <div className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white">{title}</h4>
            {status === 'enabled' ? (
                <CheckCircle size={14} className="text-emerald-500" />
            ) : (
                <AlertTriangle size={14} className="text-amber-400" />
            )}
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
            {description}
        </p>
    </div>
);

const ComplianceItem = ({ label, status }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${status === 'Compliant' ? 'text-emerald-500' : 'text-zinc-600'}`}>
            {status}
        </span>
    </div>
);
