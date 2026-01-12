"use client";

import { useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

import { useState } from "react";
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
    const [title, setTitle] = useState("아이폰 16, 디자인 진짜 이렇게 나옴? (충격)");
    const [isCreating, setIsCreating] = useState(false);
    const [scriptContent, setScriptContent] = useState<string>(`
        <div class="mb-8 group">
            <div class="flex items-center mb-2">
                <span class="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Scene 1 · 도입</span>
            </div>
            <div class="prose max-w-none">
                <p class="text-[15px] leading-relaxed text-[#333333]">
                    여러분, 아이폰 15 산 지 얼마나 됐다고 벌써 16 루머가 쏟아지고 있습니다.
                    근데 이번 디자인, 호불호가 좀 갈릴 것 같은데요?
                </p>
                <p class="text-[15px] leading-relaxed text-[#333333] mt-2">
                    오늘은 유출된 렌더링을 바탕으로 <span class="bg-green-100 px-1 py-0.5 rounded text-green-800 font-medium">아이폰 16 디자인 변화 포인트</span>를 딱 3가지로 정리해 드립니다.
                </p>
            </div>
        </div>
        <div class="mb-8 group">
             <div class="flex items-center mb-2">
                <span class="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Scene 2 · 본론</span>
            </div>
            <div class="prose max-w-none">
                 <p class="text-[15px] leading-relaxed text-[#333333]">
                    가장 큰 변화는 바로 <span class="bg-green-100 px-1 py-0.5 rounded text-green-800 font-medium">수직형 카메라 배열</span>입니다.
                    아이폰 12 이후로 대각선 배열을 유지해왔는데, 이번에 다시 돌아가는 이유가 뭘까요?
                    바로 애플 비전 프로를 위한 공간 비디오 촬영 때문이라고 합니다.
                </p>
            </div>
        </div>
    `);
    const [isGenerating, setIsGenerating] = useState(false);

    // Use useAction for OpenAI calls
    const generateScript = useAction(api.actions.generateScript);

    const handleAiGenerate = async () => {
        try {
            setIsGenerating(true);
            const result = await generateScript({
                topic: title,
                sourceText: "아이폰 16 디자인 유출 정리: 수직 카메라 부활? 최근 맥루머스에 따르면...", // In real app, pass full source text
            });

            // Format the result into HTML for the editor (Simple formatting)
            const formattedResult = result.split('\n').map(line => `<p class="text-[15px] leading-relaxed text-[#333333] mb-2">${line}</p>`).join('');

            setScriptContent(`
                <div class="mb-4">
                    <div class="flex items-center mb-2"><span class="text-[11px] font-bold text-blue-600 uppercase tracking-wider">AI Generated Script</span></div>
                    <div class="prose max-w-none">${formattedResult}</div>
                </div>
            `);

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
        try {
            setIsCreating(true);
            await createProject({
                title: title,
                source: "Planning"
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
                    <span className="text-[14px] font-bold text-[#111111]">아이폰 16 디자인 유출 정리</span>
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                        조안 작성 중
                    </span>
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

                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="px-2 py-0.5 bg-[#F5F5F5] text-[#666666] text-[10px] font-medium rounded">유튜브 9:16</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#AAAAAA] hover:text-[#111111] cursor-pointer" />
                        </div>
                        <h3 className="text-[13px] font-bold text-[#111111] mb-3 leading-snug">
                            아이폰 16 디자인 유출 정리: 수직 카메라 부활?
                        </h3>
                        <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mb-4 shadow-inner" />
                        <p className="text-[12px] text-[#666666] leading-relaxed line-clamp-4">
                            최근 맥루머스에 따르면 아이폰 16의 디자인이 전작과 크게 달라질 것이라고 합니다.
                            특히 카메라 배열이 아이폰 12 시절의 수직 배열로 회귀할 가능성이 높다고 하며,
                            이는 공간 비디오 촬영 기능을 위한 설계 변경으로 추정됩니다...
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-[#888888]" />
                            <span className="text-[12px] font-bold text-[#444444]">관련 인기 영상 (벤치마킹)</span>
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-lg border border-[#E5E5E5] p-3 flex gap-3 hover:border-[#CCCCCC] transition-colors cursor-pointer group">
                                    <div className="w-20 h-12 bg-[#F0F0F0] rounded-md flex-shrink-0 overflow-hidden">
                                        {i === 1 ? (
                                            <div className="w-full h-full bg-slate-800" />
                                        ) : (
                                            <div className="w-full h-full bg-stone-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[11px] font-bold text-[#111111] mb-1 truncate group-hover:text-blue-600 transition-colors">
                                            {i === 1 ? "애플이 디자인을 바꾼 진짜 이유" : "아이폰 16 vs 15 비교"}
                                        </div>
                                        <div className="text-[10px] text-[#888888]">조회수 {i === 1 ? "45만" : "12만"} · 2일 전</div>
                                    </div>
                                </div>
                            ))}
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
                            <button className="p-1 hover:text-[#333333] hover:bg-[#EEEEEE] rounded"><Bold className="w-4 h-4" /></button>
                            <button className="p-1 hover:text-[#333333] hover:bg-[#EEEEEE] rounded"><Italic className="w-4 h-4" /></button>
                            <button className="p-1 hover:text-[#333333] hover:bg-[#EEEEEE] rounded"><Underline className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div dangerouslySetInnerHTML={{ __html: scriptContent }} />
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
                            <h3 className="text-[13px] font-bold text-blue-800">팩트 체크 완료</h3>
                        </div>
                        <p className="text-[12px] text-blue-800/80 leading-relaxed mb-4">
                            스크립트에 포함된 '출시일 정보'와 '카메라 배열 변경' 내용이 최신 공식 발표 및 신뢰도 높은 유출 정보와 일치합니다.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-white rounded border border-blue-100 text-[10px] text-blue-600">맥루머스 2024.03</span>
                            <span className="px-2 py-1 bg-white rounded border border-blue-100 text-[10px] text-blue-600">IT팁스터</span>
                        </div>
                    </div>

                    {/* Prediction Card */}
                    <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[12px] font-medium text-[#666666]">예상 성과 예측</span>
                            <TrendingUp className="w-4 h-4 text-[#CCCCCC]" />
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-[28px] font-bold text-[#111111]">12만회</span>
                            <span className="text-[12px] font-bold text-green-600 mb-1.5">(높음)</span>
                        </div>
                        <p className="text-[11px] text-[#888888] leading-relaxed mb-4">
                            유사 주제 영상 대비 <span className="font-bold text-[#111111]">+15%</span> 높은 클릭률이 예상됩니다. '충격', '유출' 키워드가 효과적입니다.
                        </p>
                        {/* Progress Bar Mock */}
                        <div className="h-1.5 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[75%]" />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-white border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#444444] rounded-lg text-[12px] font-bold flex items-center justify-center transition-colors shadow-sm">
                        <History className="w-4 h-4 mr-2" />
                        이전 버전 기록 보기
                    </button>
                </section>

            </main>
        </div>
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
