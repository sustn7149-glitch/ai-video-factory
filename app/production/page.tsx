"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import {
    Search,
    Bell,
    Plus,
    ChevronDown,
    Video,
    Mic,
    Loader2
} from "lucide-react";
import clsx from "clsx";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
    scripting: { label: '대본작성', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
    editing: { label: '영상편집', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    rendering: { label: '렌더링', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    scheduled: { label: '업로드예약', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    uploaded: { label: '업로드완료', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
};

export default function ProductionPage() {
    const projects = useQuery(api.projects.get);

    if (projects === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                    <span className="text-[14px] font-bold text-[#666666]">프로젝트 목록을 불러오는 중입니다...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-[#111111] flex flex-col">
            {/* Top Header */}
            <header className="h-16 px-8 border-b border-[#E5E5E5] flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                        <Video className="w-4 h-4" />
                    </div>
                    <h1 className="text-[18px] font-bold tracking-tight">영상 제작 워크스페이스</h1>
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
                    <h2 className="text-[24px] font-bold">영상 제작 관리</h2>
                    <button className="flex items-center px-4 py-2 bg-[#111111] hover:opacity-90 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" />
                        새 프로젝트
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {['상태', '채널', '작업자'].map((label) => (
                        <button key={label} className="flex items-center px-3 py-1.5 border border-[#E5E5E5] rounded-lg text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA] bg-white">
                            {label}
                            <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-[#888888]" />
                        </button>
                    ))}
                </div>

                {/* Data Grid */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm">
                    {/* Grid Header */}
                    <div className="flex items-center px-6 py-2 bg-[#FAFAFA] border-b border-[#E5E5E5] text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                        <div className="w-16 text-center">번호</div>
                        <div className="w-24 text-left">생성일시</div>
                        <div className="flex-1 min-w-[300px] pl-4">이미지 / 제목</div>
                        <div className="w-24 text-center">작업자</div>
                        <div className="w-24 text-center">음성</div>
                        <div className="w-24 text-center">채널</div>
                        <div className="w-28 text-left pl-4">업로드 예약</div>
                        <div className="w-24 text-center">진행상태</div>
                    </div>

                    {/* Grid Body */}
                    {projects.length === 0 ? (
                        <div className="p-12 text-center text-[#888888] text-sm">
                            생성된 프로젝트가 없습니다. 기획 센터에서 새 초안을 생성해보세요.
                        </div>
                    ) : (
                        projects.map((project: any, index: number) => {
                            const statusStyle = STATUS_CONFIG[project.status] || STATUS_CONFIG['scripting'];
                            const dateObj = new Date(project._creationTime);
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                            const day = String(dateObj.getDate()).padStart(2, '0');
                            const dateStr = `${year}.${month}.${day}`;
                            const timeStr = dateObj.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });

                            // Mocking missing fields for now
                            const operator = "Kim";
                            const operatorAvatar = "bg-orange-200";
                            const voice = "AI Voice";
                            const channel = "Default";

                            return (
                                <div
                                    key={project._id}
                                    className="flex items-center px-6 border-b border-[#F5F5F5] last:border-0 hover:bg-gray-50 transition-colors group h-[42px]"
                                >
                                    {/* No. */}
                                    <div className="w-16 text-center text-[11px] text-[#888888] font-mono">
                                        {index + 1}
                                    </div>

                                    {/* Created Date */}
                                    <div className="w-24 text-left text-[11px] text-[#666666] leading-tight font-mono">
                                        <div className="font-medium text-[#111111]">{dateStr}</div>
                                        {/* <div className="text-[#AAAAAA] text-[10px] mt-0.5">{timeStr}</div> */}
                                    </div>

                                    {/* Title & Image */}
                                    <div className="flex-1 min-w-[300px] flex items-center gap-3 pl-4 overflow-hidden">
                                        <div className={`w-8 h-8 rounded-md ${project.thumbnailUrl ? 'bg-cover' : 'bg-gray-100'} border border-black/5 flex-shrink-0 shadow-sm`} />
                                        <Link href={`/production/${project._id}`} className="text-[13px] font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-pointer block max-w-full">
                                            {project.title}
                                        </Link>
                                    </div>

                                    {/* Operator */}
                                    <div className="w-24 flex justify-center items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full ${operatorAvatar} flex items-center justify-center text-[9px] font-bold text-[#444444] border border-black/5`}>
                                            {operator[0]}
                                        </div>
                                        <span className="text-[12px] text-[#444444]">{operator}</span>
                                    </div>

                                    {/* Voice */}
                                    <div className="w-24 flex flex-col items-center justify-center">
                                        <div className="flex items-center text-[12px] font-medium text-[#444444]">
                                            <Mic className="w-3 h-3 mr-1 text-[#888888]" />
                                            {voice}
                                        </div>
                                    </div>

                                    {/* Channel */}
                                    <div className="w-24 flex justify-center">
                                        <span className="px-1.5 py-0.5 rounded border border-[#EEEEEE] bg-[#FAFAFA] text-[11px] font-medium text-[#666666]">
                                            {channel}
                                        </span>
                                    </div>

                                    {/* Upload Scheduled */}
                                    <div className="w-28 text-left pl-4 text-[11px] text-[#666666] leading-tight font-mono">
                                        <span className="text-[#DDDDDD]">-</span>
                                    </div>

                                    {/* Status */}
                                    <div className="w-24 flex justify-center">
                                        <span className={clsx(
                                            "px-2 py-0.5 rounded text-[11px] font-bold border",
                                            statusStyle.bg,
                                            statusStyle.text,
                                            statusStyle.border
                                        )}>
                                            {statusStyle.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
}
