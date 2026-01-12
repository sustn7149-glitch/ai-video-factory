"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import {
    Search,
    Bell,
    Filter,
    Plus,
    ChevronDown,
    MoreHorizontal,
    Youtube,
    Newspaper,
    Layout,
    FileText,
    Check,
    X,
    Sparkles,
    Loader2
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function PlanningPage() {
    const router = useRouter();
    const trends = useQuery(api.trends.get);
    const createProject = useMutation(api.projects.createProject);

    const [selectedIds, setSelectedIds] = useState<string[]>([]); // Changed to string[] for Convex ID
    const [isCreating, setIsCreating] = useState(false);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (!trends) return;
        if (selectedIds.length === trends.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(trends.map((item: any) => item._id));
        }
    };

    const handleCreateDraft = async () => {
        if (selectedIds.length === 0 || !trends) return;

        setIsCreating(true);
        try {
            // Create projects for each selected trend
            const selectedItems = trends.filter((t: any) => selectedIds.includes(t._id));

            await Promise.all(selectedItems.map((item: any) =>
                createProject({
                    title: item.title,
                    source: item.source
                })
            ));

            // Show simple alert instead of toast for now (Component not found)
            alert(`${selectedIds.length}개의 프로젝트가 생성되었습니다.`);
            router.push('/production');
        } catch (error) {
            console.error("Failed to create drafts:", error);
            alert("프로젝트 생성 중 오류가 발생했습니다.");
        } finally {
            setIsCreating(false);
            setSelectedIds([]);
        }
    };

    if (trends === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                    <span className="text-[14px] font-bold text-[#666666]">기획 데이터를 불러오는 중입니다...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-[#111111] flex flex-col relative">
            {/* Top Header */}
            <header className="h-16 px-6 border-b border-[#E5E5E5] flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <h1 className="text-[18px] font-bold tracking-tight">기획 센터</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-[#666666] hover:text-[#111111]"><Search className="w-5 h-5" /></button>
                    <button className="text-[#666666] hover:text-[#111111]"><Bell className="w-5 h-5" /></button>
                    <div className="h-8 w-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-[11px] font-bold text-orange-600">
                        관리자
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[24px] font-bold">소재/기획</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#666666]">초안 생성된 건 제외</span>
                        <button className="w-10 h-5 bg-[#E5E5E5] rounded-full relative transition-colors hover:bg-[#DDDDDD]">
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {['출처 (전체)', '조회수', 'AI 점수', '기간'].map((label) => (
                        <button key={label} className="flex items-center px-3 py-1.5 border border-[#E5E5E5] rounded-lg text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA] bg-white">
                            {label}
                            <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-[#888888]" />
                        </button>
                    ))}
                    <button className="flex items-center px-3 py-1.5 text-[13px] font-bold text-[#111111] hover:bg-[#F5F5F5] rounded-lg">
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        조건 저장
                    </button>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {['#인기 뉴스', '#유튜브 숏츠 발굴', '#블라인드 베스트', '#이번주 급상승', '#AI 추천 고득점'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#F5F5F5] text-[#555555] rounded-full text-[12px] font-medium whitespace-nowrap cursor-pointer hover:bg-[#EEEEEE]">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Data Grid */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm">
                    {/* Grid Header */}
                    <div className="flex items-center px-6 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5] text-[12px] font-medium text-[#888888]">
                        <div className="w-12 flex items-center justify-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                checked={trends.length > 0 && selectedIds.length === trends.length}
                                onChange={toggleSelectAll}
                            />
                        </div>
                        <div className="w-12 text-center">번호</div>
                        <div className="flex-1 min-w-[300px]">이미지 / 제목</div>
                        <div className="w-32 text-center">출처</div>
                        <div className="w-24 text-center">조회수</div>
                        <div className="w-24 text-center">좋아요</div>
                        <div className="w-24 text-center">AI 점수</div>
                        <div className="w-24 text-center">생성일</div>
                    </div>

                    {/* Grid Body */}
                    {trends.length === 0 ? (
                        <div className="p-12 text-center text-[#888888] text-sm">
                            표시할 트렌드 데이터가 없습니다.
                        </div>
                    ) : (
                        trends.map((item: any, index: number) => {
                            const isSelected = selectedIds.includes(item._id);
                            // Fallback values for missing fields in basic scheme
                            const views = item.views || '1.2만';
                            const likes = item.likes || '-';
                            const createdAt = item.createdAt || '오늘';
                            const thumbnailColor = item.thumbnailColor || 'bg-gray-100';
                            const sourceName = item.source || 'WEB';

                            return (
                                <div
                                    key={item._id}
                                    className={clsx(
                                        "flex items-center px-6 py-4 border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA] transition-colors group",
                                        isSelected && "bg-blue-50/30"
                                    )}
                                >
                                    {/* Checkbox */}
                                    <div className="w-12 flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black transition-all"
                                            checked={isSelected}
                                            onChange={() => toggleSelect(item._id)}
                                        />
                                    </div>

                                    {/* No. */}
                                    <div className="w-12 text-center text-[13px] text-[#888888] font-mono">
                                        {index + 1}
                                    </div>

                                    {/* Title & Image */}
                                    <div className="flex-1 min-w-[300px] flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg ${thumbnailColor} border border-black/5 mx-2 shadow-sm flex-shrink-0`} />
                                        <Link href={`/planning/${item._id}`} className="text-[14px] font-bold text-[#111111] line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer hover:underline">
                                            {item.title}
                                        </Link>
                                    </div>

                                    {/* Source */}
                                    <div className="w-32 flex justify-center">
                                        <span className="px-2 py-1 rounded border border-[#EEEEEE] bg-[#FAFAFA] text-[11px] font-medium text-[#666666]">
                                            {sourceName}
                                        </span>
                                    </div>

                                    {/* Views */}
                                    <div className="w-24 text-center text-[13px] text-[#444444]">
                                        {views}
                                    </div>

                                    {/* Likes */}
                                    <div className="w-24 text-center text-[13px] text-[#444444]">
                                        {likes}
                                    </div>

                                    {/* AI Score */}
                                    <div className="w-24 flex justify-center">
                                        <span className={clsx(
                                            "text-[13px] font-bold",
                                            (item.aiScore || 0) >= 90 ? "text-green-600" :
                                                (item.aiScore || 0) >= 70 ? "text-orange-500" : "text-[#888888]"
                                        )}>
                                            {item.aiScore || 0}
                                        </span>
                                    </div>

                                    {/* Created At */}
                                    <div className="w-24 text-center text-[12px] text-[#999999]">
                                        {createdAt}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* Floating Action Bar */}
            <div className={clsx(
                "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#111111] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 transition-all duration-300 z-50",
                selectedIds.length > 0 ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
            )}>
                <span className="text-[14px] font-medium border-r border-[#333333] pr-6">
                    <span className="font-bold text-white">{selectedIds.length}개</span> 선택됨
                </span>
                <button
                    onClick={handleCreateDraft}
                    disabled={isCreating}
                    className="flex items-center text-[14px] font-bold hover:text-gray-300 transition-colors disabled:opacity-50"
                >
                    {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                    {isCreating ? "생성 중..." : "초안 생성"}
                </button>
                <button
                    onClick={() => setSelectedIds([])}
                    className="p-1 hover:bg-[#333333] rounded-full transition-colors"
                >
                    <X className="w-4 h-4 text-[#666666]" />
                </button>
            </div>
        </div>
    );
}
