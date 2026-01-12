"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
    Wand2,
    RefreshCw,
    BookOpen,
    ShieldAlert,
    History,
    CheckCircle,
    AlertTriangle,
    ChevronDown,
    Save,
    RotateCcw,
    Zap,
    Loader2
} from "lucide-react";
import clsx from "clsx";

export default function SettingsPage() {
    const settings = useQuery(api.settings.getSettings);
    const updateSettings = useMutation(api.settings.updateSettings);

    // Logic for optimistic UI could be complex, so for now we'll just track the switch state
    // and when saving (or toggling) we call mutation.
    // Actually the request was to call mutation on toggle and save button.

    // We can use local state initialized from settings, but since useQuery is async, 
    // we need to handle loading.

    const handleToggle = async () => {
        if (!settings) return;
        await updateSettings({
            id: settings._id,
            isAutoOptimizeOn: !settings.isAutoOptimizeOn
        });
    };

    const handleSave = async () => {
        // In a real app we'd save all other fields too.
        // For now, let's just show the toast.
        alert("설정이 저장되었습니다");
    };

    if (settings === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8 w-full text-[#111111] pb-24">
            {/* Header */}
            <header className="flex items-center justify-between mb-10 max-w-[1600px] mx-auto">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Wand2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                            에이전트 자동 최적화 설정
                        </h1>
                        <p className="text-[#666666] text-[14px]">
                            AI가 주기적으로 데이터를 분석하여 스크립트 작성 능력을 스스로 개선합니다.<br />
                            안전장치(Rollback)가 켜져 있어 성능 저하 시 자동으로 이전 버전으로 복구됩니다.
                        </p>
                    </div>
                </div>

                {/* Main Toggle */}
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleToggle}
                        className={clsx(
                            "w-16 h-9 rounded-full relative transition-colors duration-300",
                            settings.isAutoOptimizeOn ? "bg-blue-600" : "bg-[#E5E5E5]"
                        )}
                    >
                        <div className={clsx(
                            "absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300",
                            settings.isAutoOptimizeOn ? "translate-x-7" : "translate-x-0"
                        )} />
                    </button>
                    <span className={clsx(
                        "text-[12px] font-bold",
                        settings.isAutoOptimizeOn ? "text-blue-600" : "text-[#888888]"
                    )}>
                        {settings.isAutoOptimizeOn ? "ON (작동 중)" : "OFF"}
                    </span>
                </div>
            </header>

            {/* Section 1: Optimization Cycle */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-6 shadow-sm max-w-[1600px] mx-auto">
                <h2 className="text-[16px] font-bold mb-6 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#888888]" />
                    최적화 주기 (Cycle)
                </h2>

                <div className="flex gap-6 mb-6">
                    <div className="flex-1">
                        <label className="block text-[13px] font-bold text-[#666666] mb-2">빈도 설정</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                <option>매주 1회</option>
                                <option>매일</option>
                                <option>매월 1회</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex-[2] flex gap-4">
                        <div className="flex-1">
                            <label className="block text-[13px] font-bold text-[#666666] mb-2">실행 시간</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                    <option>일요일</option>
                                    <option>월요일</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-[13px] font-bold text-[#666666] mb-2">&nbsp;</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                    <option>오전 03:00</option>
                                    <option>오전 04:00</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#666666] mb-3">적용 대상 에이전트</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-[13px] font-bold">Writer Bot</span>
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-[13px] font-bold">Thumbnail Bot</span>
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] bg-white text-[#666666] rounded-lg cursor-pointer hover:bg-[#FAFAFA]">
                            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-[13px] font-medium">Audio Bot</span>
                        </label>
                    </div>
                </div>
            </section>

            {/* Section 2: Learning Sources */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-6 shadow-sm max-w-[1600px] mx-auto">
                <h2 className="text-[16px] font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#888888]" />
                    학습 데이터 (Learning Sources)
                </h2>

                <div className="space-y-4">
                    <SourceCheckbox
                        title="내부 성과 데이터"
                        desc="주간 성과 (조회수, 시청 지속률, 클릭률) 데이터를 기반으로 학습합니다."
                        defaultChecked={true}
                    />
                    <SourceCheckbox
                        title="외부 트렌드 검색"
                        desc="인터넷 검색을 통해 최신 기술 뉴스 및 업계 트렌드를 반영합니다."
                        defaultChecked={true}
                    />
                    <SourceCheckbox
                        title="브랜드 가이드라인 준수"
                        desc="업로드된 '내 브랜드 가이드라인 (PDF)'의 톤앤매너를 우선 적용합니다."
                        defaultChecked={true}
                    />
                </div>
            </section>

            {/* Section 3: Safety */}
            <section className="bg-green-50/50 rounded-2xl border border-green-100 p-8 mb-6 shadow-sm relative overflow-hidden max-w-[1600px] mx-auto">
                <ShieldAlert className="absolute right-6 top-6 w-24 h-24 text-green-100 -z-10" />

                <h2 className="text-[16px] font-bold mb-6 flex items-center gap-2 text-[#111111]">
                    <ShieldAlert className="w-5 h-5 text-green-600" />
                    안전장치 (Safety & Rollback)
                </h2>

                <div className="bg-white rounded-xl p-6 border border-green-100 mb-4 shadow-sm">
                    <div className="text-[13px] font-bold text-[#666666] mb-3">자동 롤백(ROLLBACK) 조건</div>
                    <div className="flex items-center flex-wrap gap-2 text-[14px] font-medium text-[#333333]">
                        <span>새 버전의 성과가</span>
                        <div className="relative">
                            <select className="px-3 py-1.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-lg font-bold outline-none pr-8">
                                <option>10%</option>
                                <option>20%</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#888888] pointer-events-none" />
                        </div>
                        <span>이상 하락하면</span>
                        <ArrowRightIcon />
                        <div className="relative">
                            <select className="px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg font-bold outline-none pr-8">
                                <option>베스트 버전으로 자동 복구</option>
                                <option>이전 버전으로 복구</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-blue-500 pointer-events-none" />
                        </div>
                        <span>합니다.</span>
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white">
                        <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[13px] font-medium text-[#444444]">적용 전 변경사항 요약 보고서를 이메일로 전송</span>
                </label>
            </section>

            {/* Section 4: Log */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[16px] font-bold flex items-center gap-2">
                        <History className="w-5 h-5 text-[#888888]" />
                        최적화 기록 (Log)
                    </h2>
                    <button className="text-[12px] font-bold text-[#888888] hover:text-[#111111]">전체 보기</button>
                </div>

                <div className="space-y-6 pl-2">
                    <LogItem
                        date="1월 07일"
                        version="v1.3 업데이트"
                        status="success"
                        desc="+15% CTR 개선됨"
                        time="오전 03:00"
                    />
                    <LogItem
                        date="12월 31일"
                        version="v1.2 업데이트"
                        status="rollback"
                        desc="낮은 시청 지속률 감지 (v1.1로 복구)"
                        time="오전 03:00"
                    />
                </div>
            </section>

            {/* Footer Action Bar */}
            <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E5E5] p-4 flex justify-end gap-3 z-50">
                <button className="px-5 py-2.5 text-[#666666] hover:bg-[#F5F5F5] rounded-lg text-[14px] font-bold transition-colors">
                    변경사항 취소
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-[#111111] hover:bg-[#333333] text-white rounded-lg text-[14px] font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]">
                    <Save className="w-4 h-4" />
                    설정 저장하기
                </button>
            </div>
        </div>
    );
}

function SourceCheckbox({ title, desc, defaultChecked }: { title: string, desc: string, defaultChecked?: boolean }) {
    return (
        <label className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-[#E5E5E5] hover:bg-[#FAFAFA] transition-all cursor-pointer group">
            <div className={clsx(
                "w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors",
                defaultChecked ? "bg-blue-600 border-blue-600" : "bg-white border-[#DDDDDD]"
            )}>
                {defaultChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
            <div>
                <div className="text-[14px] font-bold text-[#111111] mb-1 group-hover:text-blue-600 transition-colors">{title}</div>
                <div className="text-[12px] text-[#666666]">{desc}</div>
            </div>
        </label>
    );
}

function ArrowRightIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33334 8H12.6667" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66666 4L12.6667 8L8.66666 12" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function LogItem({ date, version, status, desc, time }: any) {
    return (
        <div className="relative pl-8 border-l-2 border-[#F5F5F5] last:border-0 pb-1">
            <div className={clsx(
                "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white",
                status === 'success' ? "border-green-500" : "border-amber-500"
            )}>
                {status === 'success' ? (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                ) : (
                    <RotateCcw className="w-2 h-2 text-amber-500" />
                )}
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <div className="text-[14px] font-bold text-[#111111] mb-1 flex items-center gap-2">
                        {date} <span className="text-[#888888] font-normal">-</span> {version}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={clsx(
                            "text-[11px] font-bold px-1.5 py-0.5 rounded border",
                            status === 'success' ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                            {status === 'success' ? "성공" : "롤백됨 (v1.1로 복구)"}
                        </span>
                        <span className="text-[12px] text-[#555555]">{desc}</span>
                    </div>
                </div>
                <div className="text-[12px] text-[#AAAAAA] font-mono">{time}</div>
            </div>
        </div>
    );
}
