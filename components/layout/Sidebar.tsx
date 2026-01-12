"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FileText,
    Video,
    BarChart2,
    Cpu,
    Settings,
    Sparkles
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
    {
        name: "설정",
        href: "/settings",
        icon: Settings,
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-[240px] flex-col border-r border-[#E5E5E5] bg-white text-[#111111]">
            <div className="flex h-14 items-center px-4 mt-2">
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white">
                        <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[14px] font-semibold tracking-tight">
                        AI 유튜브 자동화
                    </span>
                </div>
            </div>

            <nav className="flex-1 space-y-0.5 px-3 py-6">
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
                            <span className="text-[14px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-[#FAFAFA] border border-[#EEEEEE]" />
                    <div>
                        <p className="text-[14px] font-medium text-[#111111]">
                            User
                        </p>
                        <p className="text-[12px] text-[#888888]">
                            Free Plan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
