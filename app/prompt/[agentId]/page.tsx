"use client";

import { use, useState } from "react";
import { ArrowLeft, Save, Sparkles, Beaker, Users, Settings } from "lucide-react";
import Link from "next/link";
import CoreEditor from "@/components/prompt/CoreEditor";
import PersonaTable from "@/components/prompt/PersonaTable";
import TestLab from "@/components/prompt/TestLab";
import clsx from "clsx";

type Tab = 'core' | 'persona' | 'test';

export default function AgentEditorPage({ params }: { params: Promise<{ agentId: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState<Tab>('core');

    // Mock Data Logic
    const agentName = resolvedParams.agentId === 'script-writer'
        ? "스크립트 작가 봇 (Script Writer Bot)"
        : "범용 AI 에이전트 (General AI)";

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-[#E5E5E5] bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/prompt" className="text-[#888888] hover:text-[#111111] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#888888] tracking-widest uppercase">CORE ENGINE</span>
                        </div>
                        <h1 className="text-[18px] font-bold text-[#111111] leading-tight">
                            {agentName}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center text-[12px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                        시스템 상태: 정상
                    </div>
                    <div className="h-4 w-[1px] bg-[#E5E5E5]" />
                    <button className="flex items-center text-[#666666] hover:text-[#111111]">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white rounded-md text-[13px] font-medium transition-colors shadow-sm">
                        <Save className="w-4 h-4" />
                        변경 사항 저장
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="px-6 border-b border-[#E5E5E5] bg-white">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('core')}
                        className={clsx(
                            "flex items-center py-4 text-[14px] font-medium border-b-2 transition-all",
                            activeTab === 'core' ? "border-[#111111] text-[#111111]" : "border-transparent text-[#888888] hover:text-[#555555]"
                        )}
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        코어 시스템 프롬프트
                    </button>
                    <button
                        onClick={() => setActiveTab('persona')}
                        className={clsx(
                            "flex items-center py-4 text-[14px] font-medium border-b-2 transition-all",
                            activeTab === 'persona' ? "border-blue-600 text-blue-600" : "border-transparent text-[#888888] hover:text-[#555555]"
                        )}
                    >
                        <Users className="w-4 h-4 mr-2" />
                        채널 페르소나
                    </button>
                    <button
                        onClick={() => setActiveTab('test')}
                        className={clsx(
                            "flex items-center py-4 text-[14px] font-medium border-b-2 transition-all",
                            activeTab === 'test' ? "border-indigo-600 text-indigo-600" : "border-transparent text-[#888888] hover:text-[#555555]"
                        )}
                    >
                        <Beaker className="w-4 h-4 mr-2" />
                        테스트 랩
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex">
                    {/* Center Panel */}
                    <div className={clsx(
                        "flex-1 h-full overflow-y-auto p-8",
                        activeTab === 'test' ? "bg-white" : "bg-white"
                    )}>
                        <div className="max-w-6xl mx-auto h-full">
                            {activeTab === 'core' && <CoreEditor />}
                            {activeTab === 'persona' && <PersonaTable />}
                            {activeTab === 'test' && <TestLab />}
                        </div>
                    </div>

                    {/* Right Panel (Only custom if needed, or generic info) - For simplicity based on request, implementing as part of component or specific sidebar */}
                    {/* If "Right side panel" was strictly required separate from tabs, I would add it here. 
               However, based on the components (Persona Table uses full width, Test Lab splits screen), 
               I will assume the 'Right Panel' mentioned in requirements is context-aware or integrated into the tabs 
               (like the 'Applied Personas' list in the mockup usually sits on the right of the Core Editor).
               
               Let's add a conditional Right Panel for Core Editor to match the description "Left main content + Right side panel".
           */}

                    {activeTab === 'core' && (
                        <div className="w-[300px] border-l border-[#E5E5E5] bg-[#FAFAFA] p-6 overflow-y-auto hidden xl:block">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-[14px] font-bold text-[#111111]">적용된 페르소나</h3>
                                <span className="bg-[#EEEEEE] text-[#666666] text-[10px] font-bold px-1.5 py-0.5 rounded-full">12개</span>
                            </div>
                            <p className="text-[12px] text-[#888888] mb-4">선택 시 에디터 변수에 값이 미리보기 됩니다.</p>

                            <div className="space-y-3">
                                {['한입썰', 'AI 뉴스', '데일리 브이로그'].map((name, i) => (
                                    <div key={i} className={clsx(
                                        "p-3 rounded-lg border cursor-pointer transition-all",
                                        i === 0 ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100" : "bg-white border-[#E5E5E5] hover:border-[#CCCCCC]"
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 mr-2">
                                                    {name[0]}
                                                </div>
                                                <span className="text-[13px] font-medium text-[#333333]">{name}</span>
                                            </div>
                                            {i === 0 && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="text-[#888888]">Tone</span>
                                                <span className="text-[#444444] font-medium text-right">
                                                    {i === 0 ? "유머러스" : i === 1 ? "전문적" : "차분함"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-[11px]">
                                                <span className="text-[#888888]">Target</span>
                                                <span className="text-[#444444] font-medium text-right">
                                                    {i === 0 ? "Z세대" : i === 1 ? "전문가" : "직장인"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-[#DDDDDD] rounded-lg text-[12px] text-[#888888] hover:text-[#666666] hover:bg-[#F5F5F5]">
                                    + 9개 더보기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
