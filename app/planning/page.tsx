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
    // Filter States
    const [sourceFilter, setSourceFilter] = useState("전체");
    const [minAiScore, setMinAiScore] = useState(0);
    const [periodFilter, setPeriodFilter] = useState("전체");
    const [excludeDrafts, setExcludeDrafts] = useState(false);

    // Saved Filter State
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [newFilterName, setNewFilterName] = useState("");

    const trends = useQuery(api.trends.get, {
        source: sourceFilter === "전체" ? undefined : sourceFilter,
        minAiScore: minAiScore > 0 ? minAiScore : undefined,
        period: periodFilter === "전체" ? undefined : periodFilter,
        excludeDrafts: excludeDrafts ? true : undefined
    });
    const savedFilters = useQuery(api.trends.getSavedFilters);
    const saveFilter = useMutation(api.trends.saveFilter);
    const deleteFilter = useMutation(api.trends.deleteFilter);

    const createProject = useMutation(api.projects.createProject);

    const [selectedIds, setSelectedIds] = useState<string[]>([]); // Changed to string[] for Convex ID
    const [isCreating, setIsCreating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = trends ? Math.ceil(trends.length / itemsPerPage) : 0;
    const paginatedTrends = trends
        ? trends.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

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
                    source: item.source,
                    referenceUrl: item.url, // Pass real URL
                    referenceText: item.title // Use title as initial text ref
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
                    <div className="flex items-center gap-3">
                        <h2 className="text-[24px] font-bold">소재/기획</h2>
                        <span className="text-[13px] text-[#888888] font-medium pt-1">총 {trends.length}건</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#666666]">초안 생성된 건 제외</span>
                        <button
                            onClick={() => setExcludeDrafts(!excludeDrafts)}
                            className={clsx(
                                "w-10 h-5 rounded-full relative transition-colors",
                                excludeDrafts ? "bg-black" : "bg-[#E5E5E5] hover:bg-[#DDDDDD]"
                            )}
                        >
                            <div className={clsx(
                                "absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all",
                                excludeDrafts ? "left-6" : "left-1"
                            )} />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between mb-8">

                    <div className="flex items-center gap-3">
                        {/* Source Filter */}
                        <div className="relative">
                            <select
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-1.5 border border-[#E5E5E5] rounded-lg text-[13px] font-medium text-[#444444] bg-white hover:bg-[#FAFAFA] focus:outline-none focus:border-black transition-colors cursor-pointer"
                            >
                                <option value="전체">출처 (전체)</option>
                                <option value="Naver News">Naver News</option>
                                <option value="YouTube">YouTube</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* AI Score Filter */}
                        <div className="relative">
                            <select
                                value={minAiScore}
                                onChange={(e) => setMinAiScore(Number(e.target.value))}
                                className="appearance-none pl-3 pr-8 py-1.5 border border-[#E5E5E5] rounded-lg text-[13px] font-medium text-[#444444] bg-white hover:bg-[#FAFAFA] focus:outline-none focus:border-black transition-colors cursor-pointer"
                            >
                                <option value={0}>AI 점수 (전체)</option>
                                <option value={90}>90점 이상</option>
                                <option value={80}>80점 이상</option>
                                <option value={70}>70점 이상</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Period Filter */}
                        <div className="relative">
                            <select
                                value={periodFilter}
                                onChange={(e) => setPeriodFilter(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-1.5 border border-[#E5E5E5] rounded-lg text-[13px] font-medium text-[#444444] bg-white hover:bg-[#FAFAFA] focus:outline-none focus:border-black transition-colors cursor-pointer"
                            >
                                <option value="전체">기간 (전체)</option>
                                <option value="오늘">오늘</option>
                                <option value="1주일">1주일</option>
                                <option value="1개월">1개월</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Save Filter Button */}
                        <button
                            onClick={() => setIsSaveModalOpen(true)}
                            className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded-full text-[#444444] hover:bg-black hover:text-white hover:border-black transition-all"
                            title="필터 저장"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Rows Per Page Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#666666]">보기:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset to first page
                            }}
                            className="px-2 py-1.5 border border-[#E5E5E5] rounded-lg text-[12px] font-medium text-[#444444] outline-none cursor-pointer"
                        >
                            <option value={10}>10개씩</option>
                            <option value={30}>30개씩</option>
                            <option value={50}>50개씩</option>
                        </select>
                    </div>
                </div>

                {/* Saved Filter Tags */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {savedFilters?.map((filter: any) => (
                        <span
                            key={filter._id}
                            onClick={() => {
                                setSourceFilter(filter.conditions.source || "전체");
                                setMinAiScore(filter.conditions.minAiScore || 0);
                                setPeriodFilter(filter.conditions.period || "전체");
                                setExcludeDrafts(filter.conditions.excludeDrafts || false);
                            }}
                            className="px-3 py-1 bg-[#F5F5F5] text-[#555555] rounded-full text-[12px] font-medium whitespace-nowrap cursor-pointer hover:bg-[#EEEEEE] flex items-center gap-1 group"
                        >
                            {filter.name}
                            <X
                                className="w-3 h-3 text-[#999999] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm("이 필터를 삭제하시겠습니까?")) deleteFilter({ id: filter._id });
                                }}
                            />
                        </span>
                    ))}
                    {(!savedFilters || savedFilters.length === 0) && (
                        <span className="text-[12px] text-[#888888] italic px-2">저장된 필터가 없습니다. + 버튼을 눌러보세요.</span>
                    )}
                </div>

                {/* Data Grid */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm mb-6">
                    {/* Grid Header */}
                    <div className="flex items-center px-6 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5] text-[11px] font-semibold text-[#888888]">
                        <div className="w-12 flex items-center justify-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                checked={paginatedTrends.length > 0 && paginatedTrends.every((t: any) => selectedIds.includes(t._id))}
                                onChange={() => {
                                    const pageIds = paginatedTrends.map((t: any) => t._id);
                                    if (pageIds.every((id: string) => selectedIds.includes(id))) {
                                        setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
                                    } else {
                                        setSelectedIds(prev => [...Array.from(new Set([...prev, ...pageIds]))]);
                                    }
                                }}
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
                    {paginatedTrends.length === 0 ? (
                        <div className="p-12 text-center text-[#888888] text-sm">
                            표시할 트렌드 데이터가 없습니다.
                        </div>
                    ) : (
                        paginatedTrends.map((item: any, index: number) => {
                            const isSelected = selectedIds.includes(item._id);
                            // Fallback values for missing fields in basic scheme
                            // Fix view count display logic
                            let views = item.views;
                            if (!views || views === 0 || item.source === 'Naver News') {
                                views = '-';
                            }

                            const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                            const likes = item.likes || '-';
                            const createdAt = item.createdAt || '오늘';
                            const thumbnailColor = item.thumbnailColor || 'bg-gray-100';
                            const sourceName = item.source || 'WEB';

                            return (
                                <div
                                    key={item._id}
                                    className={clsx(
                                        "flex items-center px-6 border-b border-[#F5F5F5] last:border-0 hover:bg-gray-50 transition-colors group h-[42px]", // Higher Density Row
                                        isSelected ? "bg-blue-50/40" : (item.hasScript ? "bg-blue-50/30" : "")
                                    )}
                                >
                                    {/* Checkbox */}
                                    <div className="w-12 flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black transition-all cursor-pointer"
                                            checked={isSelected}
                                            onChange={() => toggleSelect(item._id)}
                                        />
                                    </div>

                                    {/* No. */}
                                    <div className="w-12 text-center text-[11px] text-[#888888] font-mono">
                                        {globalIndex}
                                    </div>

                                    {/* Title & Image */}
                                    <div className="flex-1 min-w-[300px] flex items-center gap-3 overflow-hidden">
                                        <div className={`w-8 h-8 rounded-md ${thumbnailColor} border border-black/5 mx-1 shadow-sm flex-shrink-0`} />
                                        <div className="flex flex-col gap-0.5 overflow-hidden">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/planning/${item._id}`} className="text-[13px] font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-pointer block max-w-full">
                                                    {item.title}
                                                </Link>
                                                {/* Draft Badge */}
                                                {item.isDraftCreated && (
                                                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded border border-gray-200 whitespace-nowrap">
                                                        제작 중
                                                    </span>
                                                )}
                                                {/* Script Badge - Forced Render */}
                                                {(item.hasScript || item.isDraftCreated) && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded ml-2 flex items-center gap-1">
                                                        📝 대본 보유
                                                    </span>
                                                )}
                                            </div>
                                            {item.aiSummary && (
                                                <span className="text-[11px] text-gray-400 truncate block max-w-full">
                                                    {item.aiSummary}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Source */}
                                    <div className="w-32 flex justify-center">
                                        <span className="px-1.5 py-0.5 rounded text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100">
                                            {sourceName}
                                        </span>
                                    </div>

                                    {/* Views */}
                                    <div className="w-24 text-center text-[12px] font-medium font-mono text-gray-600">
                                        {views}
                                    </div>

                                    {/* Likes */}
                                    <div className="w-24 text-center text-[12px] font-medium font-mono text-gray-600">
                                        {likes}
                                    </div>

                                    {/* AI Score Badge */}
                                    <div className="w-24 flex justify-center">
                                        <span className={clsx(
                                            "text-[11px] font-bold px-2 py-0.5 rounded-full font-mono min-w-[32px] text-center",
                                            (item.aiScore || 0) >= 90 ? "bg-green-100 text-green-700" :
                                                (item.aiScore || 0) >= 70 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"
                                        )}>
                                            {item.aiScore || 0}
                                        </span>
                                    </div>

                                    {/* Created At / Hover Action */}
                                    <div className="w-24 flex justify-center items-center relative">
                                        <span className="text-[11px] text-gray-400 font-mono group-hover:opacity-0 transition-opacity absolute">
                                            {createdAt}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(item._id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded-lg hover:bg-gray-800 transition-all absolute shadow-sm"
                                        >
                                            선택
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-[13px] text-[#666666] border border-[#E5E5E5] rounded hover:bg-[#FAFAFA] disabled:opacity-50"
                        >
                            이전
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={clsx(
                                    "w-8 h-8 flex items-center justify-center text-[13px] font-bold rounded",
                                    currentPage === page
                                        ? "bg-black text-white"
                                        : "text-[#666666] hover:bg-[#F5F5F5]"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-[13px] text-[#666666] border border-[#E5E5E5] rounded hover:bg-[#FAFAFA] disabled:opacity-50"
                        >
                            다음
                        </button>
                    </div>
                )}
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
            {/* Save Filter Modal */}
            {isSaveModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
                            <h3 className="font-bold text-[16px]">필터 저장</h3>
                            <button onClick={() => setIsSaveModalOpen(false)} className="text-[#888888] hover:text-black">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-[13px] text-[#666666] mb-4">현재 적용된 필터 조건을 저장하여 나중에 쉽게 불러올 수 있습니다.</p>

                            <div className="bg-[#FAFAFA] p-3 rounded-lg mb-4 text-[12px] text-[#555555] space-y-1">
                                <div className="flex justify-between">
                                    <span>출처:</span> <span className="font-medium">{sourceFilter}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>AI 점수:</span> <span className="font-medium">{minAiScore > 0 ? `${minAiScore}점 이상` : '전체'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>기간:</span> <span className="font-medium">{periodFilter}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>초안 제외:</span> <span className="font-medium">{excludeDrafts ? 'Yes' : 'No'}</span>
                                </div>
                            </div>

                            <label className="block text-[12px] font-bold text-[#333333] mb-1.5">필터 이름</label>
                            <input
                                type="text"
                                autoFocus
                                value={newFilterName}
                                onChange={(e) => setNewFilterName(e.target.value)}
                                placeholder="예: 고득점 AI 뉴스"
                                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-[13px] outline-none focus:border-black mb-6"
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsSaveModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-[#E5E5E5] text-[13px] font-medium text-[#666666] hover:bg-[#F5F5F5]"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={() => {
                                        if (!newFilterName.trim()) return alert("필터 이름을 입력해주세요.");
                                        saveFilter({
                                            name: newFilterName,
                                            conditions: {
                                                source: sourceFilter === "전체" ? undefined : sourceFilter,
                                                minAiScore: minAiScore > 0 ? minAiScore : undefined,
                                                period: periodFilter === "전체" ? undefined : periodFilter,
                                                excludeDrafts: excludeDrafts ? true : undefined
                                            }
                                        });
                                        setNewFilterName("");
                                        setIsSaveModalOpen(false);
                                    }}
                                    className="flex-1 py-2.5 rounded-lg bg-black text-[13px] font-bold text-white hover:bg-[#333333]"
                                >
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
