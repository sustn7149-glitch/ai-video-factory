"use client";

import { useState } from "react";
import { TrendItem, ScriptDraft } from "@/types/planning";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";

interface ScriptWorkspaceProps {
    initialTrend?: TrendItem;
    onBack: () => void;
}

export default function ScriptWorkspace({ initialTrend, onBack }: ScriptWorkspaceProps) {
    const [draft, setDraft] = useState<ScriptDraft>({
        id: "new",
        title: initialTrend ? `${initialTrend.keyword} 관련 영상` : "",
        topic: initialTrend ? initialTrend.keyword : "",
        target_audience: "일반 대중",
        content: initialTrend ? `[도입부]\n${initialTrend.keyword}에 대해 들어보셨나요? 이게 요즘 왜 화제냐면...\n\n[본론]\n1. 첫 번째 이유...\n2. 두 번째 이유...\n\n[결론]\n지금 바로 확인해보세요!` : "",
        status: 'draft',
        created_at: new Date().toISOString()
    });

    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setTimeout(() => {
            setDraft(prev => ({
                ...prev,
                content: prev.content + `\n\n[AI 추가 생성 내용: ${prompt}]\n추가적인 분석 결과에 따르면...`
            }));
            setPrompt("");
            setIsGenerating(false);
        }, 1200);
    };

    return (
        <div className="h-full flex flex-col max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center text-[14px] text-[#888888] hover:text-[#111111] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    뒤로가기
                </button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded bg-[#111111] text-white text-[14px] font-medium hover:opacity-90">
                        제작으로 넘기기
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
                {/* Editor Area (Main Focus) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <input
                        type="text"
                        value={draft.title}
                        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                        className="w-full text-[24px] font-bold text-[#111111] placeholder:text-[#CCCCCC] border-none outline-none bg-transparent p-0"
                        placeholder="제목을 입력하세요..."
                    />

                    <textarea
                        value={draft.content}
                        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                        className="flex-1 w-full resize-none text-[16px] leading-8 text-[#333333] placeholder:text-[#CCCCCC] border-none outline-none bg-transparent p-0 font-sans"
                        placeholder="여기에 대본을 작성하거나 AI에게 요청하세요..."
                    />
                </div>

                {/* AI Assistant Sidebar (Right) */}
                <div className="lg:col-span-4 pl-8 border-l border-[#F5F5F5]">
                    <div className="sticky top-6 space-y-6">
                        <div>
                            <h3 className="text-[12px] font-bold text-[#888888] uppercase tracking-wider mb-2">Target Audience</h3>
                            <select
                                value={draft.target_audience}
                                onChange={(e) => setDraft({ ...draft, target_audience: e.target.value })}
                                className="w-full text-[14px] bg-[#FAFAFA] border border-[#EEEEEE] rounded px-2 py-2 outline-none focus:border-[#CCCCCC]"
                            >
                                <option>일반 대중</option>
                                <option>IT 전문가</option>
                                <option>청소년</option>
                                <option>비즈니스맨</option>
                            </select>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold text-[#888888] uppercase tracking-wider mb-2">AI Assistant</h3>
                            <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#EEEEEE]">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full h-24 text-[14px] bg-transparent outline-none resize-none placeholder:text-[#AAAAAA]"
                                    placeholder="AI에게 수정을 요청해보세요. (예: 좀 더 재치있게 바꿔줘)"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[10px] text-[#AAAAAA]">Enter to send</span>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating || !prompt}
                                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#111111] text-white disabled:opacity-20 hover:opacity-80 transition-opacity"
                                    >
                                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h3 className="text-[12px] font-bold text-[#888888] uppercase tracking-wider mb-2">Stats</h3>
                            <div className="text-[12px] text-[#666666]">
                                단어 수: {draft.content.length}자<br />
                                예상 길이: {Math.ceil(draft.content.length / 10)}초
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
