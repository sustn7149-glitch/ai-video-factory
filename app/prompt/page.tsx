"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {
    Plus,
    Search,
    Bell,
    ChevronDown,
    ChevronRight,
    Bot,
    Briefcase,
    BarChart3,
    Zap,
    LayoutGrid,
    MoreHorizontal
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function PromptDashboard() {
    const agents = useQuery(api.agents.get);
    const [expandedAgents, setExpandedAgents] = useState<string[]>([]);

    // Expand first two agents by default when data loads
    if (agents && expandedAgents.length === 0 && agents.length > 0) {
        // This is a simple effect simulation, might cause re-renders but acceptable for now
        // A better way is useEffect but referencing agents inside.
    }

    const toggleAgent = (id: string) => {
        setExpandedAgents(prev =>
            prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
        );
    };

    if (agents === undefined) {
        return (
            <div className="p-8 min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[14px] font-bold text-[#666666]">데이터를 불러오는 중입니다...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#111111] p-6 pb-24">
            {/* Top Header */}
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <LayoutGrid className="w-6 h-6 text-[#111111]" />
                    <h1 className="text-[20px] font-bold tracking-tight">프롬프트 인텔리전스 센터</h1>
                    <span className="flex items-center text-[11px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full ml-1">
                        <Zap className="w-3 h-3 mr-1 fill-current" />
                        자동 최적화: ON (다음: 월 03:00)
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-[#666666] hover:text-[#111111]"><Search className="w-5 h-5" /></button>
                    <button className="text-[#666666] hover:text-[#111111]"><Bell className="w-5 h-5" /></button>
                    <div className="h-8 w-8 rounded-full bg-[#EEEEEE] border border-[#E5E5E5]" />
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <span className="text-[12px] font-medium text-[#666666]">활성 에이전트</span>
                        <Bot className="w-5 h-5 text-[#DDDDDD]" />
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[32px] font-bold text-[#111111]">{agents.length}</span>
                        <span className="text-[11px] text-[#888888] mb-1">코어 엔진</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <span className="text-[12px] font-medium text-[#666666]">배포 페르소나</span>
                        <Briefcase className="w-5 h-5 text-[#DDDDDD]" />
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[32px] font-bold text-[#111111]">
                            {agents.reduce((acc: number, agent: any) => acc + (agent.personas?.length || 0), 0)}
                        </span>
                        <span className="text-[11px] text-[#888888] mb-1">채널 전체</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <span className="text-[12px] font-medium text-[#666666]">평균 효율성</span>
                        <BarChart3 className="w-5 h-5 text-[#DDDDDD]" />
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[32px] font-bold text-[#111111]">94.2</span>
                        <span className="flex items-center text-[11px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mb-1">
                            ▲ 1.5
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-[#E5E5E5] rounded text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA]">
                        필터
                    </button>
                    <div className="h-8 w-[1px] bg-[#E5E5E5] mx-1" />
                    <span className="text-[12px] text-[#888888] flex items-center">에이전트: 전체</span>
                </div>
                <button className="flex items-center px-4 py-2 bg-[#111111] hover:opacity-90 text-white rounded-lg text-[13px] font-medium transition-colors">
                    <Plus className="w-4 h-4 mr-1.5" />
                    새 에이전트 생성
                </button>
            </div>

            {/* Main List */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="flex items-center px-6 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5] text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    <div className="flex-1">에이전트 / 페르소나 (AGENT & PERSONA)</div>
                    <div className="w-40">버전 및 상태 (STATUS)</div>
                    <div className="w-40">핵심 지표 (METRICS)</div>
                    <div className="w-32 text-right">관리 (ACTION)</div>
                </div>

                {/* List Items */}
                {agents.map((agent: any) => {
                    const isExpanded = expandedAgents.includes(agent._id);
                    const isPending = agent.status === 'pending';
                    const hasPersonas = agent.personas && agent.personas.length > 0;

                    return (
                        <div key={agent._id} className="border-b border-[#F5F5F5] last:border-0">
                            {/* Parent Row (Agent) */}
                            <div className="flex items-center px-6 py-4 hover:bg-[#FAFAFA] transition-colors group">
                                <div className="flex-1 flex items-center gap-4">
                                    <button
                                        onClick={() => toggleAgent(agent._id)}
                                        className={clsx(
                                            "transition-colors",
                                            hasPersonas ? "text-[#AAAAAA] hover:text-[#111111]" : "text-transparent cursor-default"
                                        )}
                                        disabled={!hasPersonas}
                                    >
                                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>
                                    <div className="w-10 h-10 rounded-lg bg-[#F0F0F0] flex items-center justify-center text-[20px]">
                                        {agent.name.includes('스크립트') ? '✍️' : agent.name.includes('썸네일') ? '🎨' : '🕵️'}
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-[#111111]">{agent.name}</div>
                                        <div className="text-[12px] text-[#888888]">{agent.type}</div>
                                    </div>
                                </div>

                                <div className="w-40">
                                    {isPending ? (
                                        <div className="flex flex-col items-start gap-1.5">
                                            <span className="text-[12px] font-medium text-[#444444] line-through opacity-50">v1.2</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[12px] font-bold text-blue-600">→ {agent.version}</span>
                                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                                    승인 대기
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="text-[13px] font-medium text-[#111111]">{agent.version}</span>
                                            <span className="flex items-center text-[10px] font-bold text-green-600">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                                                활성
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="w-40">
                                    <div className="text-[12px] text-[#888888] mb-0.5">{agent.metrics?.label || '-'}</div>
                                    <div className="text-[14px] font-bold text-[#111111]">{agent.metrics?.value || '-'}</div>
                                </div>

                                <div className="w-32 flex justify-end">
                                    {isPending ? (
                                        <Link
                                            href={`/prompt/review/${agent._id}`}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-black text-white text-[12px] font-bold rounded hover:opacity-80 transition-opacity whitespace-nowrap"
                                        >
                                            제안 검토
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/prompt/${agent._id}`}
                                            className="inline-flex items-center justify-center px-3 py-1.5 border border-[#E5E5E5] bg-white text-[12px] font-medium text-[#444444] rounded hover:bg-[#FAFAFA] whitespace-nowrap"
                                        >
                                            엔진 편집
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Child Rows (Personas) */}
                            {
                                isExpanded && agent.personas && agent.personas.map((persona: any) => (
                                    <div key={persona.id} className="flex items-center px-6 py-3 bg-[#FFFFFF] border-t border-[#F9F9F9]">
                                        <div className="flex-1 flex items-center pl-14 gap-3">
                                            <div className="h-6 w-[1px] bg-[#E5E5E5]" />
                                            <div className="w-5 h-5 rounded bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center">
                                                <Briefcase className="w-3 h-3 text-[#888888]" />
                                            </div>
                                            <span className="text-[13px] font-medium text-[#444444]">채널: {persona.name}</span>
                                        </div>

                                        <div className="w-40 flex items-center">
                                            <span className="text-[11px] text-[#666666] bg-[#FAFAFA] border border-[#EEEEEE] px-1.5 py-0.5 rounded">
                                                모드: {persona.mode}
                                            </span>
                                        </div>

                                        <div className="w-40 flex items-center gap-2">
                                            <div className="w-24 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${persona.score}%` }}
                                                />
                                            </div>
                                            <span className="text-[12px] font-bold text-[#111111]">{persona.score}</span>
                                        </div>

                                        <div className="w-32 flex justify-end">
                                            <button className="p-1 text-[#CCCCCC] hover:text-[#111111]">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
