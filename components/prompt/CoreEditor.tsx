"use client";

import { Info, Copy } from "lucide-react";

export default function CoreEditor() {
    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 flex items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <p className="text-[14px] font-medium text-blue-900">
                        이 지침은 모든 채널에 공동으로 적용됩니다.
                    </p>
                    <p className="text-[13px] text-blue-700 mt-1">
                        파란색 태그로 표시된 변수 <span className="bg-blue-100 text-blue-600 px-1 rounded font-mono text-xs">{"{{변수명}}"}</span>는 우측의 '채널 페르소나' 설정값에 따라 동적으로 변경됩니다.
                    </p>
                </div>
            </div>

            {/* Editor Area */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#F5F5F5] bg-[#FAFAFA]">
                    <span className="text-[12px] font-mono text-[#888888]">system_prompt.md</span>
                    <button className="flex items-center text-[12px] text-[#666666] hover:text-[#111111]">
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        복사
                    </button>
                </div>
                <div className="p-0">
                    <textarea
                        className="w-full h-[500px] p-6 text-[15px] leading-8 font-medium text-[#333333] outline-none resize-none font-sans"
                        defaultValue={`당신은 높은 완독률에 특화된 전문 유튜브 스크립트 작가입니다.\n\n주요 타겟인 {{타겟}} 시청자를 위해 매력적인 도입부와 끝까지 시청하게 만드는 스토리텔링 구조를 사용하세요.\n\n어조와 매너는 항상 {{톤}} 을(를) 유지해야 합니다.\n\n절대 {{금지_단어}} 과 같은 표현은 사용하지 마세요.\n\n# 핵심 성과 지표 (KPI)\n- 시청 지속 시간 극대화\n- 댓글 참여 유도\n\n항상 시청자의 호기심을 자극하고, 정보 전달보다는 감정적인 연결에 집중하십시오.`}
                    />
                </div>
                <div className="px-4 py-2 border-t border-[#F5F5F5] text-right">
                    <span className="text-[12px] text-[#AAAAAA] font-mono">Ln 12, Col 45 UTF-8</span>
                </div>
            </div>
        </div>
    );
}
