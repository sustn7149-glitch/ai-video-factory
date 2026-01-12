"use client";

import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    Save,
    Film,
    Youtube,
    ExternalLink,
    Wand2,
    Scissors,
    Palette,
    Bold,
    Italic,
    Underline,
    Bot,
    CheckCircle,
    TrendingUp,
    History
} from "lucide-react";
import clsx from "clsx";

interface WorkspaceProps {
    id: string;
}

// ... imports


export default function WorkspaceClient({ id }: WorkspaceProps) {
    const router = useRouter();
    const createProject = useMutation(api.projects.createProject);
    const [title, setTitle] = useState(""); // Empty init
    const [isCreating, setIsCreating] = useState(false);
    const [scriptContent, setScriptContent] = useState<string>("");
    const trend = useQuery(api.trends.getTrend, { id: id as Id<"trends"> });
    const updateTrend = useMutation(api.trends.updateTrend); // persist draft
    const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

    // Sync state when trend loads
    useEffect(() => {
        if (trend) {
            setTitle(trend.title);
            // If trend has a draft script or similar, load it here. 
            // Currently trends schema doesn't seem to store script, but maybe AI summary or we generate it.
            // For now, let's leave script empty or load a placeholder if empty.
            if (!scriptContent) {
                // Priority: Saved Draft -> AI Summary -> Empty
                if (trend.draftScript) {
                    setScriptContent(trend.draftScript);
                } else if (trend.aiSummary) {
                    setScriptContent(trend.aiSummary);
                }
            }
        }
    }, [trend]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Use useAction for OpenAI calls
    const generateScript = useAction(api.actions.generateScript);

    const handleScriptChange = (val: string) => {
        setScriptContent(val);

        // Debounce Auto-Save
        if (saveTimer) clearTimeout(saveTimer);
        const timer = setTimeout(() => {
            saveDraft(val);
        }, 2000);
        setSaveTimer(timer);
    };

    const saveDraft = async (val: string) => {
        if (!trend) return;
        await updateTrend({
            id: trend._id,
            draftScript: val,
            hasScript: val.length > 0
        });
        console.log("Draft saved");
    };

    const handleAiGenerate = async () => {
        try {
            setIsGenerating(true);
            const result = await generateScript({
                topic: title,
                sourceText: "아이폰 16 디자인 유출 정리: 수직 카메라 부활? 최근 맥루머스에 따르면...", // In real app, pass full source text
            });

            // Direct plain text output for textarea
            setScriptContent(result);
            // Immediate save
            saveDraft(result);

        } catch (error: any) {
            console.error("AI Generation Failed:", error);
            // Show more specific error to user
            const errorMessage = error.message || "Unknown error";
            alert(`대본 생성 실패: ${errorMessage}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCreateProject = async () => {
        if (!trend) return;
        try {
            setIsCreating(true);
            await createProject({
                title: title,
                trendId: trend._id,
                source: "Planning",
                referenceUrl: trend.url,
                referenceText: trend.aiSummary, // Use AI Summary as initial reference text or empty
                script: scriptContent, // Pass the edited script content
            });
            alert("제작 리스트에 추가되었습니다");
            router.push('/production');
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("프로젝트 생성에 실패했습니다.");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
            {/* Header */}
            <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/planning" className="flex items-center text-[#666666] hover:text-[#111111] transition-colors">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span className="text-[14px] font-medium">소재 기획</span>
                    </Link>
                    <span className="text-[#E5E5E5]">|</span>
                    <span className="text-[14px] font-bold text-[#111111]">{title || "제목을 입력하세요"}</span>
                    {trend?.isDraftCreated && (
                        <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                            제작 중
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-[#888888] hover:text-[#111111] transition-colors">
                        <Save className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleCreateProject}
                        disabled={isCreating}
                        className="flex items-center px-4 py-2 bg-[#111111] hover:opacity-90 text-white rounded-lg text-[13px] font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                        {isCreating ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Film className="w-4 h-4 mr-2" />
                        )}
                        {isCreating ? "생성 중..." : "영상 제작으로 넘기기"}
                    </button>
                </div>
            </header>

            {/* Main Layout (3 Columns) */}
            <main className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1920px] mx-auto w-full">

                {/* Left Panel: Reference (Source) */}
                <section className="w-[320px] flex-shrink-0 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-white rounded-md shadow-sm">
                            <FileIcon className="w-4 h-4 text-[#666666]" />
                        </div>
                        <h2 className="text-[14px] font-bold text-[#111111]">참고 자료</h2>
                    </div>

                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col gap-4 min-h-[300px]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[14px] font-bold flex items-center gap-2">
                                <FileIcon className="w-4 h-4" />
                                참고 원문 (AI Summary)
                            </h2>
                            <a href={trend?.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3.5 h-3.5 text-[#AAAAAA] hover:text-[#111111] cursor-pointer" />
                            </a>
                        </div>
                        {/* Forced Text Mode */}
                        <div className="flex-1 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] p-4 overflow-y-auto max-h-[400px]">
                            {trend?.aiSummary ? (
                                <p className="text-[13px] text-[#333333] leading-relaxed whitespace-pre-wrap font-sans">
                                    {trend.aiSummary}
                                </p>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-[13px] text-[#888888] mb-2">요약된 내용이 없습니다.</p>
                                    <a href={trend?.url} target="_blank" className="text-blue-600 underline text-[12px]">
                                        원문 보러가기
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-[#888888]" />
                            <span className="text-[12px] font-bold text-[#444444]">관련 인기 영상 (벤치마킹)</span>
                        </div>
                        <div className="space-y-3">
                            {/* TODO: Fetch actual related videos */}
                            <div className="p-4 text-center text-gray-400 text-[12px] bg-gray-50 rounded-lg">
                                관련 데이터 분석 중...
                            </div>
                        </div>
                    </div>
                </section>

                {/* Center Panel: Editor */}
                <section className="flex-1 bg-white rounded-xl shadow-sm border border-[#E5E5E5] flex flex-col overflow-hidden">
                    {/* Editor Header */}
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-2 py-1 bg-blue-50 border border-blue-100 rounded text-[11px] font-bold text-blue-600 flex items-center">
                                <Youtube className="w-3 h-3 mr-1" />
                                channel: 테크팁 (모드: 위트)
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="text-[11px] font-bold text-[#888888] mb-1 block">영상 제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-[24px] font-bold text-[#111111] outline-none placeholder-[#CCCCCC]"
                            />
                        </div>
                    </div>

                    {/* AI Toolbar */}
                    <div className="px-8 py-2 flex items-center justify-between border-y border-[#F5F5F5] bg-[#FAFAFA]/50">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleAiGenerate}
                                disabled={isGenerating}
                                className="flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[12px] font-bold transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5 mr-1.5" />}
                                {isGenerating ? "AI 작성 중..." : "AI 다시 쓰기"}
                            </button>
                            <button className="flex items-center px-3 py-1.5 bg-white border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#444444] rounded-lg text-[12px] font-medium transition-colors">
                                <Scissors className="w-3.5 h-3.5 mr-1.5" />
                                줄이기
                            </button>
                            <button className="flex items-center px-3 py-1.5 bg-white border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#444444] rounded-lg text-[12px] font-medium transition-colors">
                                <Palette className="w-3.5 h-3.5 mr-1.5" />
                                톤 변경
                            </button>
                        </div>
                        <div className="flex items-center gap-1 border-l border-[#E5E5E5] pl-4 text-[#AAAAAA]">
                            {/* Toolbar removed as per request */}
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 overflow-y-auto p-0 relative h-full">
                        <textarea
                            value={scriptContent}
                            onChange={(e) => handleScriptChange(e.target.value)}
                            onBlur={() => saveDraft(scriptContent)}
                            placeholder="AI로 대본을 생성하거나 직접 작성해보세요..."
                            className="w-full h-[500px] p-8 text-[14px] leading-7 text-[#333333] outline-none resize-none font-sans bg-white"
                            spellCheck={false}
                            disabled={false}
                            readOnly={false}
                        />
                    </div>
                </section>

                {/* Right Panel: Validation */}
                <section className="w-[300px] flex-shrink-0 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-blue-50 rounded-md shadow-sm text-blue-600">
                            <Bot className="w-4 h-4" />
                        </div>
                        <h2 className="text-[14px] font-bold text-[#111111]">검증 에이전트</h2>
                        <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-bold">완성</span>
                    </div>

                    {/* Fact Check Card */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-start gap-3 mb-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <h3 className="text-[13px] font-bold text-blue-800">팩트 체크 대기 중</h3>
                        </div>
                        <p className="text-[12px] text-blue-800/80 leading-relaxed mb-4">
                            대본을 작성하면 자동으로 팩트 체크가 진행됩니다.
                        </p>
                    </div>

                    {/* Prediction Card */}
                    <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[12px] font-medium text-[#666666]">예상 성과 예측</span>
                            <TrendingUp className="w-4 h-4 text-[#CCCCCC]" />
                        </div>
                        <div className="p-4 text-center text-[12px] text-[#888888]">
                            데이터 분석 대기 중...
                        </div>
                    </div>

                    <button className="w-full py-3 bg-white border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#444444] rounded-lg text-[12px] font-bold flex items-center justify-center transition-colors shadow-sm">
                        <History className="w-4 h-4 mr-2" />
                        이전 버전 기록 보기
                    </button>
                </section>

            </main>
        </div >
    );
}

// Icon helper
function FileIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
    )
}
