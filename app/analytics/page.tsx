"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import {
    Search,
    Bell,
    Settings,
    Download,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Zap,
    BarChart2,
    CheckCircle,
    Loader2
} from "lucide-react";
import clsx from "clsx";

export default function AnalyticsPage() {
    const kpiMetrics = useQuery(api.analytics.getStats);
    const performanceData = useQuery(api.analytics.getVideos);

    if (kpiMetrics === undefined || performanceData === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                    <span className="text-[14px] font-bold text-[#666666]">분석 데이터를 불러오는 중입니다...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-[#111111] p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-white rounded-lg">
                        <BarChart2 className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold">성과 분석 및 최적화</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 text-[#888888] cursor-pointer hover:text-black" />
                    <Bell className="w-5 h-5 text-[#888888] cursor-pointer hover:text-black" />
                    <div className="px-3 py-1.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full flex items-center gap-2 cursor-pointer hover:bg-[#EEEEEE]">
                        <div className="w-5 h-5 bg-amber-200 rounded-full border border-amber-300" />
                        <span className="text-[13px] font-semibold text-[#555555]">관리자</span>
                    </div>
                </div>
            </header>

            {/* KPI Cards */}
            <section className="grid grid-cols-4 gap-6 mb-10">
                {kpiMetrics.map((kpi: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm flex flex-col justify-between h-[120px]">
                        <span className="text-[13px] font-bold text-[#888888]">{kpi.label}</span>
                        <div className="flex items-end gap-3">
                            {idx === 3 ? (
                                <span className="text-[20px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                    {kpi.value}
                                </span>
                            ) : (
                                <span className="text-[32px] font-bold tracking-tight text-[#111111]">
                                    {kpi.value}
                                </span>
                            )}

                            {kpi.trend > 0 && (
                                <span className="mb-2 text-[12px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {kpi.trend}%
                                </span>
                            )}
                            {kpi.trend < 0 && (
                                <span className="mb-2 text-[12px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center">
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    {Math.abs(kpi.trend)}%
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* Filters & Actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                    <FilterButton label="채널별" />
                    <FilterButton label="프롬프트 버전별" />
                    <FilterButton label="기간" />
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-[#888888] hover:text-[#111111] hover:bg-[#F5F5F5] rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-[#888888] hover:text-[#111111] hover:bg-[#F5F5F5] rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Performance Grid */}
            <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                {/* Grid Header */}
                <div className="grid grid-cols-[3fr_1fr_1.5fr_2fr_2fr_1fr] gap-4 px-6 py-4 bg-[#FAFAFA] border-b border-[#E5E5E5]">
                    <div className="text-[12px] font-bold text-[#888888]">영상 (Video)</div>
                    <div className="text-[12px] font-bold text-[#888888] text-center">채널</div>
                    <div className="text-[12px] font-bold text-[#888888] text-center">프롬프트</div>
                    <div className="text-[12px] font-bold text-[#888888]">성과 지표</div>
                    <div className="text-[12px] font-bold text-[#888888]">AI 분석</div>
                    <div className="text-[12px] font-bold text-[#888888] text-right">게시일</div>
                </div>

                {/* Grid List */}
                <div>
                    {performanceData.length === 0 ? (
                        <div className="p-12 text-center text-[#888888] text-sm">
                            분석할 영상 데이터가 없습니다.
                        </div>
                    ) : (
                        performanceData.map((item: any) => (
                            <Link key={item._id} href={`/analytics/${item._id}`} className="grid grid-cols-[3fr_1fr_1.5fr_2fr_2fr_1fr] gap-4 px-6 py-4 border-b border-[#F5F5F5] items-center hover:bg-[#FAFAFA] transition-colors group cursor-pointer text-left">

                                {/* Video Info */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg ${item.thumbnail} shadow-sm border border-black/5 flex-shrink-0`} />
                                    <span className="text-[14px] font-bold text-[#333333] line-clamp-1 group-hover:text-black">
                                        {item.title}
                                    </span>
                                </div>

                                {/* Channel */}
                                <div className="flex justify-center">
                                    <span className="px-3 py-1 bg-[#F5F5F5] text-[#555555] text-[12px] font-bold rounded-full border border-[#E0E0E0]">
                                        {item.channel}
                                    </span>
                                </div>

                                {/* Prompt Version */}
                                <div className="flex flex-col items-center">
                                    <span className={clsx(
                                        "text-[13px] font-bold cursor-pointer hover:underline",
                                        item.promptVersion === "Ver 1.4" ? "text-blue-600" :
                                            item.promptVersion === "Ver 1.3" ? "text-orange-600" :
                                                item.promptVersion === "Ver 1.0" ? "text-purple-600" : "text-[#555555]"
                                    )}>
                                        [{item.promptVersion}]
                                    </span>
                                    <span className="text-[10px] text-[#999999] mt-0.5">Source: {item.promptSource}</span>
                                </div>

                                {/* Metrics */}
                                <div className="flex items-center gap-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-[#AAAAAA] mb-0.5">Views</div>
                                        <div className="text-[14px] font-bold text-[#111111]">{(item.views / 1000).toFixed(1)}만</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#AAAAAA] mb-0.5">CTR</div>
                                        <div className={clsx("text-[14px] font-bold", item.ctr >= 6.0 ? "text-green-600" : "text-[#111111]")}>
                                            {item.ctr}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-[#AAAAAA] mb-0.5">Ret</div>
                                        <div className={clsx("text-[14px] font-bold", parseInt(item.retention) <= 50 ? "text-red-500" : "text-[#111111]")}>
                                            {item.retention}
                                        </div>
                                    </div>
                                </div>

                                {/* AI Insights */}
                                <div className="flex items-center gap-2">
                                    {item.insightType === 'success' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                                    {item.insightType === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                                    {item.insightType === 'info' && <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />}

                                    <span className="text-[13px] font-medium text-[#444444] line-clamp-1">
                                        {item.insightText}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="text-right text-[12px] font-mono text-[#888888]">
                                    {item.date}
                                </div>

                            </Link>
                        ))
                    )}
                </div>

                {/* Footer Loading State */}
                <div className="p-8 text-center text-[12px] text-[#AAAAAA] font-medium">
                    모든 분석 데이터를 로드했습니다.
                </div>
            </div>
        </div>
    );
}

function FilterButton({ label }: { label: string }) {
    return (
        <button className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-xl flex items-center gap-2 hover:bg-[#FAFAFA] transition-colors shadow-sm">
            <span className="text-[13px] font-bold text-[#333333]">{label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#888888]" />
        </button>
    );
}
