"use client";

import { TrendItem } from "@/types/planning";
import { TrendingUp, ArrowRight, ExternalLink } from "lucide-react";

// Mock Data (Same as before)
const MOCK_TRENDS: TrendItem[] = [
    {
        id: "t1",
        keyword: "AI Video Automation",
        source: "Youtube",
        volume: "500K+",
        growth: 120,
        summary: "Creators are looking for ways to automate Faceless channels using AI agents.",
        related_hashtags: ["#AI", "#Automation", "#PassiveIncome"],
    },
    {
        id: "t2",
        keyword: "GPT-5 Rumors",
        source: "Google Trends",
        volume: "1M+",
        growth: 85,
        summary: "Speculations about the next generation of LLMs are trending in tech communities.",
        related_hashtags: ["#GPT5", "#OpenAI", "#TechNews"],
    },
    {
        id: "t3",
        keyword: "Sustainable Tech",
        source: "News",
        volume: "200K+",
        growth: 45,
        summary: "Green technology solutions are gaining traction among Gen Z consumers.",
        related_hashtags: ["#GreenTech", "#Sustainability", "#Future"],
    },
];

interface TrendFeedProps {
    onSelectTrend: (trend: TrendItem) => void;
}

export default function TrendFeed({ onSelectTrend }: TrendFeedProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-end justify-between border-b border-[#E5E5E5] pb-4">
                <div>
                    <h2 className="text-[18px] font-semibold text-[#111111]">지금 뜨는 트렌드</h2>
                    <p className="text-[14px] text-[#666666] mt-1">
                        실시간으로 수집된 키워드를 분석하여 제공합니다.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[12px] text-[#888888] font-medium">Live Updates</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_TRENDS.map((trend) => (
                    <div
                        key={trend.id}
                        onClick={() => onSelectTrend(trend)}
                        className="group cursor-pointer rounded-lg border border-[#E5E5E5] bg-white p-5 transition-all hover:border-[#CCCCCC] hover:shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="inline-flex items-center rounded bg-[#FAFAFA] border border-[#EEEEEE] px-2 py-1 text-[12px] font-medium text-[#666666]">
                                {trend.source}
                            </span>
                            <span className="flex items-center text-[12px] font-medium text-green-600">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {trend.growth}% 상승
                            </span>
                        </div>

                        <h3 className="text-[16px] font-semibold text-[#111111] group-hover:underline decoration-1 underline-offset-4">
                            {trend.keyword}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#555555] line-clamp-2">
                            {trend.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {trend.related_hashtags.map(tag => (
                                <span key={tag} className="text-[12px] text-[#999999]">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#F5F5F5] flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="flex items-center text-[12px] font-medium text-[#111111]">
                                대본 생성하기
                                <ArrowRight className="ml-1 w-3 h-3" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
