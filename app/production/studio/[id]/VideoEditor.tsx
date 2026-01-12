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
    Pause,
    Wand2
} from "lucide-react";
import clsx from "clsx";

interface VideoEditorProps {
    id: string;
}

export default function VideoEditor({ id }: VideoEditorProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            Wait for Editor... ID: {id}
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
