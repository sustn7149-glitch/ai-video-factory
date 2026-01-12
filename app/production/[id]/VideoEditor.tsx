"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    Settings,
    Upload,
    Calendar,
    ChevronDown,
    Plus,
    RefreshCw,
    Play,
    CheckCircle,
    Smartphone,
    Monitor,
    Film,
    Music,
    Image as ImageIcon,
    Mic,
    MoreHorizontal,
    GripVertical,
    Wand2
} from "lucide-react";
import clsx from "clsx";

interface VideoEditorProps {
    id: string;
}

export default function VideoEditor({ id }: VideoEditorProps) {
    const [aspectRatio, setAspectRatio] = useState<'shorts' | 'wide'>('shorts');
    const [selectedThumbnail, setSelectedThumbnail] = useState(0);

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col text-[#111111]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/production" className="flex items-center text-[#666666] hover:text-[#111111] transition-colors">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span className="text-[14px] font-medium">워크스페이스</span>
                    </Link>
                    <span className="text-[#E5E5E5]">|</span>
                    <span className="text-[16px] font-bold text-[#111111]">비디오 스튜디오</span>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-[18px] font-bold">AI 뉴스 Ep.1</h1>
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[11px] font-bold rounded">영상편집</span>
                </div>
            </header>

            <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 flex gap-6 overflow-hidden">

                {/* Left Panel: Settings & Script */}
                <section className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">

                    {/* Video Info */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[14px] font-bold flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" />
                                영상 정보 (Video Info)
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[12px] font-bold text-[#666666] mb-1.5">실명</label>
                                <input
                                    type="text"
                                    defaultValue="오늘의 주요 뉴스는 인공지능 기술의 급격한 발전이 산업 전반에 미치는 영향에 대한 것입니다."
                                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[13px] text-[#333333] outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-[#666666] mb-1.5">태그</label>
                                <div className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[13px] text-[#333333] flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-white border border-[#DDD] rounded text-[11px] font-medium"># AI</span>
                                    <span className="px-2 py-0.5 bg-white border border-[#DDD] rounded text-[11px] font-medium"># Tech</span>
                                    <span className="px-2 py-0.5 bg-white border border-[#DDD] rounded text-[11px] font-medium"># News</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-[#666666] mb-1.5">고정댓글</label>
                                <input
                                    type="text"
                                    defaultValue="구독과 좋아요 부탁드립니다!"
                                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[13px] text-[#333333] outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[12px] font-bold text-[#666666] mb-1.5">음성</label>
                                    <div className="flex gap-2">
                                        <select className="flex-1 px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] outline-none">
                                            <option>AI Reporter</option>
                                        </select>
                                        <select className="flex-1 px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] outline-none">
                                            <option>News Intro</option>
                                        </select>
                                        <button className="px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] font-medium">
                                            1.0x
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Info */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[14px] font-bold flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" />
                                업로드 정보 (Upload Info)
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                                <label className="block text-[12px] font-bold text-[#666666] mb-1.5">채널</label>
                                <div className="relative">
                                    <select className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] outline-none appearance-none">
                                        <option>한입썰</option>
                                    </select>
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-[#666666] mb-1.5">예약</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="2026/01/02 18:00"
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] outline-none"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[12px] font-bold text-[#666666] mb-2">플랫폼</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-black focus:ring-black" />
                                    <span className="text-[13px] font-medium">YouTube</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded text-black focus:ring-black" />
                                    <span className="text-[13px] font-medium text-[#888888]">Instagram</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded text-black focus:ring-black" />
                                    <span className="text-[13px] font-medium text-[#888888]">TikTok</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Script & Scenes */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-sm flex-1 flex flex-col">
                        <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center">
                            <h2 className="text-[14px] font-bold">대본 및 씬 구성 (Script & Scenes)</h2>
                            <button className="text-[12px] font-bold text-[#666666] hover:text-[#111111] flex items-center">
                                <Plus className="w-4 h-4 mr-1" />
                                씬 추가
                            </button>
                        </div>

                        {/* Headers */}
                        <div className="flex items-center px-6 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5] text-[11px] font-bold text-[#888888]">
                            <div className="w-12">No.</div>
                            <div className="flex-1">대본 (Script)</div>
                            <div className="w-[180px]">비주얼 (Visuals)</div>
                            <div className="w-[180px]">오디오/효과</div>
                            <div className="w-8"></div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto">
                            <SceneRow
                                number={1}
                                script="오늘의 주요 뉴스는 인공지능 기술의 급격한 발전이 산업 전반에 미치는 영향에 대한 것입니다. 특히 생성형 AI의 도입으로..."
                                visuals={['bg-rose-200', 'bg-slate-700', 'bg-teal-800']}
                                audios={['뉴스 인트로 BGM', '줌 인 효과']}
                            />
                            <SceneRow
                                number={2}
                                script="다음 소식입니다. 글로벌 IT 기업들이 앞다퉈 AI 데이터센터를 확장하고 있습니다."
                                visuals={['bg-gradient-to-br from-blue-200 to-purple-200', 'bg-gray-400', 'bg-stone-300']}
                                audios={['기계음 (Humming)']}
                            />
                            <SceneRow
                                number={3}
                                script="이로 인해 전력 소비 문제도 새로운 이슈로 떠오르고 있습니다."
                                visuals={['bg-yellow-100', 'bg-indigo-300', 'bg-blue-200']}
                                audios={['슬로우 모션']}
                            />
                            {/* Empty Row Placeholder */}
                            <div className="px-6 py-4 flex items-center border-b border-[#F5F5F5] opacity-50 hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
                                <div className="w-12 text-[12px] text-[#AAAAAA] font-mono">4</div>
                                <div className="flex-1 flex items-center gap-2 text-[#AAAAAA]">
                                    <Plus className="w-4 h-4" />
                                    <span className="text-[13px]">장면 추가하기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Preview & Action */}
                <section className="w-[480px] flex flex-col gap-6">
                    {/* Preview Card */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-6">
                            <h2 className="text-[14px] font-bold">실시간 미리보기</h2>
                            <span className="text-[11px] font-mono text-[#888888]">00:15 / 01:30</span>
                        </div>

                        {/* Toggle */}
                        <div className="bg-[#F5F5F5] p-1 rounded-lg flex gap-1 mb-8">
                            <button
                                onClick={() => setAspectRatio('shorts')}
                                className={clsx(
                                    "px-4 py-1.5 rounded-md text-[12px] font-bold flex items-center gap-2 transition-all",
                                    aspectRatio === 'shorts' ? "bg-white text-[#111111] shadow-sm" : "text-[#888888] hover:text-[#666666]"
                                )}
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                                숏츠 (9:16)
                            </button>
                            <button
                                onClick={() => setAspectRatio('wide')}
                                className={clsx(
                                    "px-4 py-1.5 rounded-md text-[12px] font-bold flex items-center gap-2 transition-all",
                                    aspectRatio === 'wide' ? "bg-white text-[#111111] shadow-sm" : "text-[#888888] hover:text-[#666666]"
                                )}
                            >
                                <Monitor className="w-3.5 h-3.5" />
                                와이드 (16:9)
                            </button>
                        </div>

                        {/* Phone Mockup */}
                        <div className="relative w-[280px] h-[580px] bg-[#111111] rounded-[40px] border-8 border-[#222222] shadow-2xl overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] duration-300">
                            {/* Notch / Dynamic Island */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-[#222222] rounded-b-xl z-20" />

                            {/* Video Screen */}
                            <div className="flex-1 bg-[#000000] relative group cursor-pointer">
                                {/* Fake Video Content */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                                <div className="absolute inset-x-0 bottom-24 p-6 z-20 text-center">
                                    <p className="text-white text-[18px] font-bold leading-tight drop-shadow-md">
                                        오늘의 주요 뉴스는<br />
                                        <span className="text-yellow-400">인공지능 기술</span>의 급격한 발전입니다
                                    </p>
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                                    </div>
                                </div>

                                {/* Background Abstract */}
                                <div className="absolute inset-0 bg-blue-900 overflow-hidden">
                                    <div className="absolute top-1/4 left-0 w-full h-1/2 bg-blue-500 blur-[60px] opacity-40 mix-blend-screen animate-pulse" />
                                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1 bg-[#333333] w-full">
                                <div className="h-full bg-white w-1/3" />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[13px] font-bold">AI 추천 썸네일</h2>
                            <button className="text-[11px] text-[#666666] flex items-center hover:text-black">
                                <RefreshCw className="w-3 h-3 mr-1" />
                                재생성
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedThumbnail(i)}
                                    className={clsx(
                                        "aspect-[9/16] rounded-lg cursor-pointer relative group overflow-hidden border-2 transition-all",
                                        selectedThumbnail === i ? "border-black ring-1 ring-black" : "border-transparent hover:border-[#DDDDDD]"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-full h-full",
                                        i === 0 ? "bg-rose-200" : i === 1 ? "bg-slate-600" : "bg-gradient-to-tr from-blue-300 to-indigo-300"
                                    )} />
                                    {/* Text Overlay Mock */}
                                    <div className="absolute bottom-2 left-2 right-2">
                                        <div className="h-1 bg-white/50 w-2/3 rounded mb-1" />
                                        <div className="h-1 bg-white/50 w-1/2 rounded" />
                                    </div>

                                    {selectedThumbnail === i && (
                                        <div className="absolute top-1 right-1 bg-black text-white rounded-full p-0.5">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Render Button */}
                    <button className="w-full py-4 bg-black hover:bg-[#333333] text-white rounded-xl text-[16px] font-bold shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center">
                        <Film className="w-5 h-5 mr-2" />
                        영상 렌더링 (Video Rendering)
                    </button>
                    <div className="text-center text-[11px] text-[#888888]">
                        예상 소요 시간: 약 2분 30초
                    </div>

                </section>
            </main>
        </div>
    );
}

function SceneRow({ number, script, visuals, audios }: { number: number, script: string, visuals: string[], audios: string[] }) {
    return (
        <div className="px-6 py-4 flex items-start border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors group">
            {/* No */}
            <div className="w-12 text-[13px] font-bold text-blue-600 mt-1">{number}</div>

            {/* Script */}
            <div className="flex-1 pr-6">
                <p className="text-[13px] leading-relaxed text-[#333333] whitespace-pre-wrap">
                    {script}
                </p>
            </div>

            {/* Visuals */}
            <div className="w-[180px] grid grid-cols-2 gap-2">
                <div className={`aspect-square rounded-lg ${visuals[0]} shadow-sm border border-black/5 relative group/img`}>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className={`flex-1 rounded-lg ${visuals[1]} shadow-sm opacity-60`} />
                    <div className={`flex-1 rounded-lg ${visuals[2]} shadow-sm opacity-60`} />
                </div>
                <button className="col-span-2 text-[10px] text-[#888888] hover:text-[#111111] flex items-center mt-1">
                    <Wand2 className="w-3 h-3 mr-1" />
                    프롬프트 수정
                </button>
            </div>

            {/* Audio */}
            <div className="w-[180px] pl-4 space-y-2">
                {audios.map((audio, idx) => (
                    <div key={idx} className="flex items-center px-2 py-1.5 bg-white border border-[#E5E5E5] rounded text-[11px] text-[#555555]">
                        <Music className="w-3 h-3 mr-1.5 text-[#888888]" />
                        {audio}
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="w-8 flex justify-end">
                <button className="p-1 text-[#CCCCCC] hover:text-[#111111]">
                    <RefreshCw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
