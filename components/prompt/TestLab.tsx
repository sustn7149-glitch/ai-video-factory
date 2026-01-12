"use client";

import { useState } from "react";
import { Play, ThumbsUp, ThumbsDown, Copy, ExternalLink, RefreshCw } from "lucide-react";

export default function TestLab() {
    const [topic, setTopic] = useState("iPhone 16 출시");
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleRunTest = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setResult(`안녕하세요 여러분! 아이폰 16이 드디어 출시되었습니다... 🍎✨\n진짜 역대급 카메라 업그레이드라고 하는데요, 과연 제 콩팥을 팔아야 할까요? ㅋㅋ\n\n일단 디자인부터 보면 티타늄 마감이 아주 미쳤습니다. 너무 가벼워서 손목 나갈 일은 없겠어요.\n근데 가격은... 음... 😅 제 통장이 우는 소리 들리시나요?\n\n그래도 A18 칩셋 성능이 미쳤다고 하니까, 게임 성능 테스트 바로 들어가보겠습니다. 고고씽! 🚀`);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="h-full flex gap-6">
            {/* Left: Configuration */}
            <div className="w-1/3 flex flex-col gap-6 border-r border-[#E5E5E5] pr-6">
                <div>
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4">테스트 설정</h3>
                    <p className="text-[12px] text-[#666666] mb-6">
                        페르소나와 변수 값을 입력하여 결과를 확인하세요.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[12px] font-medium text-[#444444] mb-1.5">페르소나 선택</label>
                            <select className="w-full text-[14px] p-2.5 rounded border border-[#E5E5E5] bg-white outline-none focus:border-blue-500">
                                <option>한입썰 (톤: 유머러스, 타겟: Z세대)</option>
                                <option>AI 뉴스</option>
                                <option>데일리 브이로그</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[12px] font-medium text-[#444444] mb-1.5">테스트 입력 (주제)</label>
                            <textarea
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full h-32 text-[14px] p-3 rounded border border-[#E5E5E5] bg-white outline-none focus:border-blue-500 resize-none"
                                placeholder="테스트할 주제나 상황을 입력하세요..."
                            />
                            <div className="flex justify-end mt-1 text-[10px] text-[#AAAAAA]">
                                {topic.length}/100
                            </div>
                        </div>

                        <div>
                            <label className="block text-[12px] font-medium text-[#444444] mb-1.5">생성 길이</label>
                            <div className="h-1.5 w-full bg-[#EEEEEE] rounded-full overflow-hidden">
                                <div className="h-full w-1/4 bg-blue-500 rounded-full" />
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-[#888888] font-mono">
                                <span>Short (shorts)</span>
                                <span>Long</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleRunTest}
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[14px] font-bold transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                        {isGenerating ? "생성 중..." : "테스트 실행"}
                    </button>
                </div>
            </div>

            {/* Right: Output */}
            <div className="flex-1 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5] p-6 flex flex-col items-center justify-center min-h-[500px]">
                {result ? (
                    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-green-600 text-[13px] font-bold">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                결과 미리보기
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-1.5 text-[#888888] hover:text-[#111111] hover:bg-white rounded transition-colors"><Copy className="w-4 h-4" /></button>
                                <button className="p-1.5 text-[#888888] hover:text-[#111111] hover:bg-white rounded transition-colors"><ExternalLink className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
                            <div className="h-6 bg-[#FAFAFA] border-b border-[#F0F0F0] flex items-center px-3 space-x-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                <span className="ml-2 text-[10px] text-[#999999] font-mono">output_script.txt</span>
                            </div>
                            <div className="p-6 text-[14px] leading-relaxed text-[#333333] whitespace-pre-wrap">
                                {result}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center items-center gap-4">
                            <span className="text-[12px] text-[#888888]">이 결과가 마음에 드시나요?</span>
                            <button className="flex items-center px-3 py-1.5 border border-[#E5E5E5] bg-white rounded-full text-[12px] font-medium text-[#444444] hover:bg-[#FAFAFA]">
                                <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> 좋음
                            </button>
                            <button className="flex items-center px-3 py-1.5 border border-[#E5E5E5] bg-white rounded-full text-[12px] font-medium text-[#444444] hover:bg-[#FAFAFA]">
                                <ThumbsDown className="w-3.5 h-3.5 mr-1.5" /> 나쁨
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-[#999999]">
                        <div className="w-16 h-16 bg-[#EEEEEE] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-6 h-6 text-[#CCCCCC] ml-1" />
                        </div>
                        <p className="text-[14px]">좌측 패널에서 설정을 완료하고<br />'테스트 실행' 버튼을 눌러주세요.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
