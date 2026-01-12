"use client";

import { useRouter } from "next/navigation";
import {
    X,
    FileText,
    Lightbulb,
    TrendingDown,
    Check,
    RefreshCw
} from "lucide-react";
import clsx from "clsx";

interface DiffLine {
    type: 'unchanged' | 'added' | 'removed' | 'header';
    number?: number;
    content: string;
}

const MOCK_DIFF: DiffLine[] = [
    { type: 'header', content: 'diff --git a/prompt.txt b/prompt.txt' },
    { type: 'unchanged', number: 18, content: '...' },
    { type: 'unchanged', number: 19, content: '### SYSTEM INSTRUCTIONS ###' },
    { type: 'unchanged', number: 20, content: '// 기본 작문 스타일 정의' },
    { type: 'removed', number: 21, content: '- "모든 문장은 30자 이내로 작성하세요."' },
    { type: 'added', number: 22, content: '+ "첫 문장은 무조건 15자 이내의 의문문으로 시작하여 호기심을 자극하세요."' },
    { type: 'unchanged', number: 23, content: '...' },
    { type: 'unchanged', number: 24, content: '' },
    { type: 'unchanged', number: 25, content: '' },
];

interface ProposalViewProps {
    agentId: string;
}

export default function ProposalView({ agentId }: ProposalViewProps) {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    const handleReject = () => {
        alert("제안이 반려되었습니다.");
        router.back();
    };

    const handleRegenerate = () => {
        alert("피드백을 반영하여 새로운 제안을 생성합니다.");
        router.back();
    };

    const handleApprove = () => {
        alert("승인 완료! 버전 v1.3으로 배포되었습니다.");
        router.back();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <header className="h-16 px-6 border-b border-[#E5E5E5] flex items-center justify-between flex-shrink-0 bg-white">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[18px] font-bold text-[#111111]">AI 프롬프트 업데이트 제안</h1>
                        <span className="text-[13px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {agentId === 'script-writer' ? '스크립트 작가 봇' : agentId} : v1.2 → v1.3
                        </span>
                        <span className="text-[12px] text-[#888888] border-l border-[#EEEEEE] pl-4">
                            주간 데이터 주기 기반 (1월 1일 - 1월 7일)
                        </span>
                    </div>
                    <button onClick={handleClose} className="p-2 text-[#888888] hover:text-[#111111] rounded-full hover:bg-[#F5F5F5] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Content Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Diff Viewer */}
                    <div className="flex-1 border-r border-[#E5E5E5] bg-[#FAFAFA] flex flex-col">
                        <div className="px-6 py-3 border-b border-[#F0F0F0] bg-white flex items-center text-[12px] font-medium text-[#666666]">
                            <FileText className="w-4 h-4 mr-2 text-[#999999]" />
                            프롬프트 변경 사항 비교
                            <span className="ml-auto font-mono text-[10px] text-[#AAAAAA]">diff --git a/prompt.txt b/prompt.txt</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-0 font-mono text-[13px]">
                            {MOCK_DIFF.map((line, idx) => (
                                <div key={idx} className={clsx(
                                    "flex items-stretch px-4 py-0.5",
                                    line.type === 'added' ? "bg-green-50" :
                                        line.type === 'removed' ? "bg-red-50" : "bg-transparent"
                                )}>
                                    {/* Line Number */}
                                    <div className="w-8 text-right text-[#AAAAAA] select-none mr-4 flex-shrink-0">
                                        {line.number || ''}
                                    </div>
                                    {/* Content */}
                                    <div className={clsx(
                                        "whitespace-pre-wrap flex-1",
                                        line.type === 'added' ? "text-green-700 font-bold" :
                                            line.type === 'removed' ? "text-red-700 font-medium opacity-60 line-through" :
                                                line.type === 'header' ? "text-[#CCCCCC]" : "text-[#444444]"
                                    )}>
                                        {line.content}
                                    </div>
                                    {/* Indicator Line */}
                                    {line.type === 'added' && <div className="w-1 bg-green-400 absolute right-0" />}
                                    {line.type === 'removed' && <div className="w-1 bg-red-400 absolute right-0" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Reasoning & Feedback */}
                    <div className="w-[450px] bg-white flex flex-col p-6 overflow-y-auto">
                        {/* AI Reasoning Card */}
                        <div className="border border-green-200 bg-green-50/30 rounded-xl p-5 mb-8 relative">
                            <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-green-500" />
                            <div className="ml-5">
                                <h3 className="text-[13px] font-bold text-[#333333] mb-4">AI 사고 과정 (최적화 논리)</h3>

                                <div className="bg-white border border-red-100 rounded-lg p-3 flex items-center mb-4 shadow-sm">
                                    <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center mr-3 text-red-500">
                                        <TrendingDown className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-bold text-[#111111]">지난주 평균 유지율 5% 하락</div>
                                        <div className="text-[11px] text-[#888888]">데이터 주기: 1월 1일 - 1월 7일</div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-[13px] text-[#444444] leading-relaxed">
                                        "도입부가 너무 길었습니다. 더 짧은 훅이 필요합니다. 독자의 주의를 즉시 끌기 위해 의문문 형식을 제안합니다."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interaction Form */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center text-[12px] font-bold text-[#111111] mb-2">
                                <div className="w-4 h-4 rounded bg-[#EEEEEE] flex items-center justify-center text-[#888888] mr-2 text-[9px]">✍️</div>
                                관리자 수정 의견 (Manager Comments)
                            </div>
                            <textarea
                                className="w-full flex-1 p-4 text-[14px] border border-[#E5E5E5] rounded-xl outline-none resize-none focus:border-[#333333] transition-colors shadow-sm bg-[#FAFAFA] focus:bg-white"
                                placeholder="반영 전 특정 지침을 추가하거나 톤을 다듬으세요..."
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="h-20 px-6 border-t border-[#E5E5E5] flex items-center justify-between flex-shrink-0 bg-white gap-4">
                    <button
                        onClick={handleReject}
                        className="px-6 py-2.5 text-[13px] font-medium text-[#666666] bg-[#F5F5F5] hover:bg-[#E5E5E5] rounded-lg transition-colors flex items-center"
                    >
                        <X className="w-4 h-4 mr-2" />
                        반려
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRegenerate}
                            className="px-6 py-2.5 text-[13px] font-bold text-[#444444] bg-white border border-[#DDDDDD] hover:bg-[#FAFAFA] rounded-lg transition-colors shadow-sm flex items-center"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            피드백 반영하여 재생성
                        </button>
                        <button
                            onClick={handleApprove}
                            className="px-8 py-2.5 text-[13px] font-bold text-white bg-[#111111] hover:bg-[#333333] rounded-lg transition-colors shadow-lg flex items-center hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            승인 및 배포
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
