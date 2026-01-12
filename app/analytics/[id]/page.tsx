"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
    ChevronLeft,

    PlayCircle,
    X,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    MessageSquare,
    Music,
    FileText,
    Image as ImageIcon,
    ArrowRight,
    Wand2,
    Film,
    BarChart2
} from "lucide-react";
import clsx from "clsx";

export default function AnalyticsDeepDive({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [insight, setInsight] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzePerformance = useAction(api.actions.analyzeVideoPerformance);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Mock Data for Demo
            const mockScript = `
                Scene 1 (Intro): 오늘의 주요 뉴스는 인공지능 기술의 급격한 발전이...
                Scene 2 (00:15): 전문가들은 이러한 변화가 시장에 미칠 영향에 대해 우려하고 있으며, 특히 일자리 감소 문제에 대해...
                Scene 3: 하지만 긍정적인 측면도 무시할 수 없습니다. 새로운...
            `;
            const mockRetention = [100, 95, 80, 75, 60, 55, 50]; // Dropping trend

            const result = await analyzePerformance({
                script: mockScript,
                retentionData: mockRetention
            });
            setInsight(result);
        } catch (error) {
            console.error(error);
            alert("분석에 실패했습니다.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <header className="h-16 border-b border-[#E5E5E5] flex items-center justify-between px-6 bg-white shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/analytics" className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#666666]" />
                    </Link>
                    <div className="w-8 h-8 rounded bg-sky-900 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white">AI</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-[16px] font-bold text-[#111111]">AI 뉴스 Ep.{id}</h1>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded flex items-center gap-1 border border-indigo-100">
                                <TrendingUp className="w-3 h-3" />
                                S급 성과 (Top 10%)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[12px] text-[#888888]">2026. 01. 05</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F5] hover:bg-[#EEEEEE] rounded-full text-[12px] font-bold text-[#444444] transition-colors">
                        <PlayCircle className="w-4 h-4" />
                        YouTube에서 보기
                    </button>
                    <Link href="/analytics" className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
                        <X className="w-5 h-5 text-[#888888]" />
                    </Link>
                </div>
            </header>

            {/* Body - 3 Column Layout */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Panel: Retention Graph */}
                <aside className="w-[400px] border-r border-[#E5E5E5] p-6 flex flex-col bg-[#FAFAFA] overflow-y-auto">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#666666]" />
                        시청 지속률 & 이탈 원인 분석
                    </h2>

                    {/* Graph Mockup */}
                    <div className="relative h-[250px] bg-white rounded-xl border border-[#E5E5E5] p-4 mb-6 shadow-sm shrink-0">
                        <div className="absolute top-4 left-4 text-[11px] font-mono text-[#AAAAAA]">100%</div>
                        <div className="absolute bottom-4 left-4 text-[11px] font-mono text-[#AAAAAA]">0%</div>

                        {/* SVG Curve */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="none">
                            <path
                                d="M0,40 C50,45 80,60 100,100 C120,140 150,130 200,110 C250,90 280,100 300,110"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {/* Boring Part Marker */}
                            <circle cx="100" cy="100" r="4" fill="#ef4444" stroke="white" strokeWidth="2" />
                            <line x1="100" y1="0" x2="100" y2="150" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                        </svg>

                        {/* Tooltip */}
                        <div className="absolute top-[55%] left-[28%] transform -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-bounce">
                            ⚠️ Boring Part
                        </div>
                    </div>

                    {/* Timeline Script */}
                    <div className="flex-1 space-y-3 pr-2">
                        <h3 className="text-[12px] font-bold text-[#888888] mb-2">타임라인 스크립트 연동</h3>

                        <div className="p-3 bg-white border border-[#E5E5E5] rounded-lg opacity-50">
                            <div className="text-[10px] text-[#888888] mb-1">Scene 1 (Intro)</div>
                            <p className="text-[12px] text-[#AAAAAA] line-clamp-2">오늘의 주요 뉴스는 인공지능 기술의 급격한 발전이...</p>
                        </div>

                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg ring-1 ring-red-200">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-red-600">Scene 2 (이탈 발생)</span>
                                <span className="text-[10px] font-mono text-red-400">00:15</span>
                            </div>
                            <p className="text-[12px] text-[#333333] leading-relaxed">
                                전문가들은 이러한 변화가 시장에 미칠 영향에 대해 우려하고 있으며, 특히 일자리 감소 문제에 대해...
                            </p>
                        </div>

                        <div className="p-3 bg-white border border-[#E5E5E5] rounded-lg opacity-50">
                            <div className="text-[10px] text-[#888888] mb-1">Scene 3</div>
                            <p className="text-[12px] text-[#AAAAAA] line-clamp-2">하지만 긍정적인 측면도 무시할 수 없습니다. 새로운...</p>
                        </div>
                    </div>
                </aside>

                {/* Center Panel: Metrics */}
                <section className="flex-1 border-r border-[#E5E5E5] p-8 flex flex-col bg-white overflow-y-auto">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-6 flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-[#666666]" />
                        핵심 지표 비교 (vs Ch. Avg)
                    </h2>

                    <div className="space-y-4 mb-8">
                        <MetricCard
                            label="조회수 (Views)"
                            value="12.5K"
                            diff="+ 23%"
                            isGood={true}
                        />
                        <MetricCard
                            label="클릭률 (CTR)"
                            value="6.2%"
                            diff="▲ 1.5%p"
                            isGood={true}
                        />
                        <MetricCard
                            label="구독자 전환"
                            value="+120"
                            badge="New!"
                        />
                    </div>

                    <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] flex-1 min-h-[200px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-slate-500" />
                                <span className="text-[13px] font-bold text-slate-600">AI 요약 의견</span>
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold flex items-center hover:bg-slate-700 transition-colors disabled:opacity-50">
                                <Wand2 className="w-3 h-3 mr-1.5" />
                                {isAnalyzing ? "분석 중..." : "AI 분석 실행"}
                            </button>
                        </div>
                        {insight ? (
                            <p className="text-[14px] leading-7 text-slate-700 font-medium whitespace-pre-wrap animate-in fade-in duration-500">
                                {insight}
                            </p>
                        ) : (
                            <p className="text-[14px] leading-7 text-slate-400 font-medium text-center py-8">
                                "AI 분석 실행" 버튼을 눌러 시청자 이탈 원인을 분석해보세요.
                            </p>
                        )}

                        <div className="flex gap-2 mt-6">
                            <div className="px-3 py-1.5 bg-white border border-green-200 text-green-700 rounded-lg text-[12px] font-bold flex items-center shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                유익함
                            </div>
                            <div className="px-3 py-1.5 bg-white border border-green-200 text-green-700 rounded-lg text-[12px] font-bold flex items-center shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                딕션 좋음
                            </div>
                            <div className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-[12px] font-bold flex items-center shadow-sm">
                                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                                BGM 큼
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Grading */}
                <aside className="w-[320px] p-8 bg-[#FAFAFA] flex flex-col overflow-y-auto">
                    <h2 className="text-[14px] font-bold text-[#111111] mb-6 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#666666]" />
                        에이전트별 성과 평가
                    </h2>

                    <div className="space-y-6 flex-1">
                        <GradeItem
                            icon={ImageIcon}
                            label="썸네일"
                            grade="Grade A"
                            gradeColor="bg-green-100 text-green-600"
                            desc="CTR이 매우 높음 (6.2%)"
                        />
                        <div className="w-full h-px bg-[#E5E5E5]" />
                        <GradeItem
                            icon={FileText}
                            label="대본"
                            grade="Grade B+"
                            gradeColor="bg-blue-100 text-blue-600"
                            desc="중반부 이탈 소폭 발생"
                        />
                        <div className="w-full h-px bg-[#E5E5E5]" />
                        <GradeItem
                            icon={Music}
                            label="오디오"
                            grade="Grade C"
                            gradeColor="bg-orange-100 text-orange-600"
                            desc="배경음악 볼륨 조절 필요"
                        />
                    </div>

                    {/* Configurations */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-5 mb-6 mt-6">
                        <span className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-3 block">Used Configuration</span>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-[#666666]">Prompt</span>
                                <span className="font-mono font-bold bg-[#F5F5F5] px-2 py-0.5 rounded">v1.4 News</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-[#666666]">Source</span>
                                <span className="font-bold text-[#333333] truncate max-w-[120px]">News Article (Econ...)</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer Actions */}
            <footer className="h-20 bg-white border-t border-[#E5E5E5] px-8 flex items-center justify-end gap-3 shrink-0 sticky bottom-0 z-10">
                <button className="px-5 py-2.5 bg-white border border-[#E5E5E5] hover:bg-[#F9F9F9] text-[#333333] rounded-xl text-[14px] font-bold flex items-center shadow-sm transition-all hover:scale-[1.02]">
                    <Wand2 className="w-4 h-4 mr-2" />
                    대본 프롬프트 튜닝하기
                </button>
                <button className="px-5 py-2.5 bg-[#111111] hover:bg-[#333333] text-white rounded-xl text-[14px] font-bold flex items-center shadow-lg transition-all hover:scale-[1.02]">
                    <Film className="w-4 h-4 mr-2" />
                    이 설정으로 후속편 생성
                </button>
            </footer>
        </div>
    );
}

function MetricCard({ label, value, diff, isGood, badge }: { label: string, value: string, diff?: string, isGood?: boolean, badge?: string }) {
    return (
        <div className="p-5 border border-[#E5E5E5] rounded-xl bg-white shadow-sm flex items-center justify-between transition-transform hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <div className="text-[12px] font-bold text-[#888888] mb-1">{label}</div>
                <div className="text-[20px] font-bold text-[#111111]">{value}</div>
            </div>

            {diff && (
                <div className={clsx(
                    "text-[12px] font-bold px-2 py-1 rounded flex items-center",
                    isGood ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                )}>
                    {diff}
                </div>
            )}

            {badge && (
                <div className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                    {badge}
                </div>
            )}
        </div>
    );
}

function GradeItem({ icon: Icon, label, grade, gradeColor, desc }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-white border border-[#E5E5E5] rounded-lg shadow-sm">
                <Icon className="w-5 h-5 text-[#444444]" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] font-bold text-[#333333]">{label}</span>
                    <span className={clsx("text-[11px] font-extrabold px-2 py-0.5 rounded", gradeColor)}>
                        {grade}
                    </span>
                </div>
                <p className="text-[11px] text-[#888888] font-medium">{desc}</p>
            </div>
        </div>
    );
}
