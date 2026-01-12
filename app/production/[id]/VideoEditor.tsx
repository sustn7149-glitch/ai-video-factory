"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
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
    id: Id<"projects">;
}

export default function VideoEditor({ id }: VideoEditorProps) {
    const project = useQuery(api.projects.getProject, { id });
    const [title, setTitle] = useState("");
    const [referenceUrl, setReferenceUrl] = useState("");
    const [channel, setChannel] = useState("");
    const [fixedComment, setFixedComment] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [scriptContent, setScriptContent] = useState("");

    // Mutations & Actions
    const updateProject = useMutation(api.projects.updateProject);
    const generateScript = useAction(api.actions.generateScript);
    const [isGenerating, setIsGenerating] = useState(false);

    // Auto-save timer
    const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

    const handleScriptChange = (newScript: string) => {
        setScriptContent(newScript);

        // Debounce auto-save (3 seconds)
        if (saveTimer) clearTimeout(saveTimer);
        const timer = setTimeout(() => {
            saveScriptToDB(newScript);
        }, 3000);
        setSaveTimer(timer);
    };

    const saveScriptToDB = async (script: string) => {
        await updateProject({ id, script });
        console.log("Script saved to DB");
    };

    const handleAiRewrite = async () => {
        if (!project) return;
        if (!project.referenceText && !scriptContent) {
            alert("참고 원문이나 작성된 대본이 없습니다.");
            return;
        }

        try {
            setIsGenerating(true);
            const result = await generateScript({
                topic: project.title,
                sourceText: project.referenceText || scriptContent,
            });

            // Update State AND DB
            setScriptContent(result);
            await updateProject({ id, script: result });

        } catch (error) {
            console.error("AI Generation Failed:", error);
            alert("AI 대본 생성 실패");
        } finally {
            setIsGenerating(false);
        }
    };

    // UI States
    const [aspectRatio, setAspectRatio] = useState<'shorts' | 'wide'>('shorts');
    const [selectedThumbnail, setSelectedThumbnail] = useState(0);

    // Sync state with project data when loaded
    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setReferenceUrl(project.referenceUrl || "");
            setFixedComment(""); // Default empty or load if exists
            setScheduledTime(""); // Default empty
            setFixedComment(""); // Default empty or load if exists
            setScheduledTime(""); // Default empty
            setScriptContent(project.script || ""); // Load script from project.script, force empty string if undefined
            // Add other fields if necessary
        }
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
                    <span className="text-[14px] font-bold text-[#666666]">프로젝트 불러오는 중...</span>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-[18px] font-bold">{project.title}</h1>
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[11px] font-bold rounded">영상편집</span>
                </div>
            </header>

            <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 flex gap-6 overflow-hidden">

                {/* Left Panel: Settings & Script */}
                <section className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">

                    {/* Source Viewer (Reference Text) - FORCED TEXT MODE */}
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col gap-4 min-h-[300px]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[14px] font-bold flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" />
                                참고 원문 (Reference Text)
                            </h2>
                            {project.referenceUrl && (
                                <a
                                    href={project.referenceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[11px] font-bold text-gray-700 transition-colors"
                                >
                                    🔗 원문 전체 보러가기
                                </a>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] p-4 overflow-y-auto max-h-[400px]">
                            {/* Priority: ReferenceText -> URL -> Error Message */}
                            {project.referenceText ? (
                                <p className="text-[13px] text-[#333333] leading-relaxed whitespace-pre-wrap font-sans">
                                    {project.referenceText}
                                </p>
                            ) : project.referenceUrl ? (
                                <div className="text-center py-10">
                                    <p className="text-[13px] text-[#666666] mb-2">원문 텍스트가 없습니다.</p>
                                    <a href={project.referenceUrl} target="_blank" className="text-blue-600 underline text-[12px]">
                                        {project.referenceUrl}
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-[14px] font-bold text-red-500">데이터 로딩 실패</p>
                                    <p className="text-[12px] text-red-400 mt-1">참고 원문이나 URL이 없습니다.</p>
                                </div>
                            )}
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
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        placeholder="YYYY/MM/DD HH:MM"
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
                    <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-sm flex-1 flex flex-col min-h-[400px]">
                        <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-gray-50">
                            <h2 className="text-[14px] font-bold flex items-center gap-2">
                                📝 대본 에디터 (Script Editor)
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleAiRewrite}
                                    disabled={isGenerating}
                                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                                    AI 다시 쓰기
                                </button>
                                <button className="px-3 py-1.5 bg-white border border-[#E5E5E5] hover:bg-gray-50 text-[#444444] rounded-lg text-[12px] font-medium transition-colors">
                                    줄이기
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-0 relative h-full">
                            <textarea
                                value={scriptContent}
                                onChange={(e) => handleScriptChange(e.target.value)}
                                onBlur={() => saveScriptToDB(scriptContent)}
                                placeholder="여기에 대본을 작성하거나 AI로 생성하세요..."
                                className="w-full h-[500px] p-6 text-[14px] leading-7 text-[#333333] outline-none resize-none font-sans bg-white"
                                spellCheck={false}
                                // Ensure no disabled/readOnly
                                disabled={false}
                                readOnly={false}
                            />
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
                                        {title || "제목 없음"}
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
                                    {/* Just a placeholder background */}
                                    <div className="absolute top-1/4 left-0 w-full h-1/2 bg-blue-500 blur-[60px] opacity-40 mix-blend-screen animate-pulse" />
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
