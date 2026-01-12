"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    FileText,
    Video,
    BarChart2,
    Cpu,
    Settings,
    Sparkles,
    ChevronRight,
    Circle
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
    {
        name: "소재 기획",
        href: "/planning",
        icon: FileText,
    },
    {
        name: "영상 제작",
        href: "/production",
        icon: Video,
    },
    {
        name: "성과 분석",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        name: "프롬프트",
        href: "/prompt",
        icon: Cpu,
    },
];

const settingsTabs = [
    { id: 'planning', label: '소재 기획', href: '/settings?tab=planning' },
    { id: 'production', label: '영상 제작', href: '/settings?tab=production' },
    { id: 'analytics', label: '성과 분석', href: '/settings?tab=analytics' },
    { id: 'prompts', label: '프롬프트', href: '/settings?tab=prompts' },
    { id: 'general', label: '전체 설정', href: '/settings?tab=general' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);

    const isSettingsActive = pathname.startsWith("/settings");
    const currentTab = searchParams.get("tab") || "planning";

    return (
        <div className="flex h-screen w-[240px] flex-shrink-0 flex-col border-r border-[#E5E5E5] bg-white text-[#111111]">
            <div className="flex h-14 items-center px-4 mt-2 flex-shrink-0">
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white">
                        <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[14px] font-semibold tracking-tight whitespace-nowrap">
                        AI 유튜브 자동화
                    </span>
                </div>
            </div>

            <nav className="flex-1 space-y-0.5 px-3 py-6 overflow-y-auto scrollbar-hide">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "group flex items-center rounded-md px-3 py-2 transition-all",
                                isActive
                                    ? "bg-[#F5F5F5] text-[#111111]"
                                    : "text-[#666666] hover:bg-[#FAFAFA] hover:text-[#111111]"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "mr-3 h-4 w-4 flex-shrink-0",
                                    isActive ? "text-[#111111]" : "text-[#999999] group-hover:text-[#666666]"
                                )}
                                strokeWidth={2}
                            />
                            <span className="text-[14px] font-medium whitespace-nowrap">{item.name}</span>
                        </Link>
                    );
                })}

                {/* Settings Toggle Group */}
                <div className="pt-1">
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className={clsx(
                            "w-full group flex items-center rounded-md px-3 py-2 transition-all text-left",
                            isSettingsActive && !isSettingsOpen
                                ? "bg-[#F5F5F5] text-[#111111]"
                                : "text-[#666666] hover:bg-[#FAFAFA] hover:text-[#111111]"
                        )}
                    >
                        <Settings
                            className={clsx(
                                "mr-3 h-4 w-4 flex-shrink-0",
                                isSettingsActive ? "text-[#111111]" : "text-[#999999] group-hover:text-[#666666]"
                            )}
                            strokeWidth={2}
                        />
                        <span className="text-[14px] font-medium flex-1 whitespace-nowrap">설정</span>
                        <div className={clsx(
                            "w-4 h-4 flex items-center justify-center transition-transform duration-200 text-[#999999]",
                            isSettingsOpen ? "rotate-90" : "rotate-0"
                        )}>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                    </button>

                    {/* Sub Menu */}
                    <div className={clsx(
                        "flex flex-col gap-0.5 overflow-hidden transition-all duration-300 ease-in-out ml-2",
                        isSettingsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        {settingsTabs.map((tab) => {
                            const isActive = isSettingsActive && currentTab === tab.id;
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={clsx(
                                        "flex items-center gap-2.5 px-3 py-1.5 pl-8 rounded text-[13px] transition-colors w-full text-left",
                                        isActive
                                            ? "bg-[#F5F5F5] text-[#111111] font-semibold"
                                            : "text-[#666666] hover:bg-gray-50 hover:text-[#111111]"
                                    )}
                                >
                                    {/* Dot indicator for active or just text? Notion uses just highlighted background usually or text color. I'll use text color + bg. */}
                                    <span className="whitespace-nowrap">{tab.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-[#E5E5E5] flex-shrink-0">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-[#FAFAFA] border border-[#EEEEEE]" />
                    <div>
                        <p className="text-[14px] font-medium text-[#111111] whitespace-nowrap">
                            User
                        </p>
                        <p className="text-[12px] text-[#888888] whitespace-nowrap">
                            Free Plan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
