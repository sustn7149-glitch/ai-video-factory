"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Database,
    Eye,
    EyeOff,
    X,
    Search,
    Wand2,
    RefreshCw,
    BookOpen,
    ShieldAlert,
    History,
    CheckCircle,
    AlertTriangle,
    ChevronDown,
    Save,
    RotateCcw,
    Zap,
    Loader2,
    Video,
    BarChart2,
    Settings,
    FileText,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import clsx from "clsx";

/*
 * We wrap the content in Suspense because usage of useSearchParams()
 * causes the page to opt into client-side rendering with potential suspending behavior in Next.js app router.
 */

function SettingsContent() {
    const settings = useQuery(api.settings.getSettings);
    const updateSettings = useMutation(api.settings.updateSettings);

    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "planning";

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const [newsApiKey, setNewsApiKey] = useState("");
    const [newsApiSecret, setNewsApiSecret] = useState("");
    const [naverDisplay, setNaverDisplay] = useState(10);
    const [naverKeywords, setNaverKeywords] = useState<string[]>([]);

    const [youtubeApiKey, setYoutubeApiKey] = useState("");
    const [youtubeKeywords, setYoutubeKeywords] = useState<string[]>([]);

    const [tavilyApiKey, setTavilyApiKey] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [crawlFrequency, setCrawlFrequency] = useState("6h");
    const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (settings) {
            setNewsApiKey(settings.newsApiKey || "");
            setNewsApiSecret(settings.newsApiSecret || "");
            setNaverDisplay(settings.naverDisplay || 10);
            setNaverKeywords(settings.naverKeywords || []);
            setYoutubeApiKey(settings.youtubeApiKey || "");
            setYoutubeKeywords(settings.youtubeKeywords || []);
            setTavilyApiKey(settings.tavilyApiKey || "");
            setKeywords(settings.keywords || []);
            setCrawlFrequency(settings.crawlFrequency || "6h");
        }
    }, [settings]);

    const toggleShowKey = (key: string) => {
        setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const removeKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    const handleToggle = async () => {
        if (!settings) return;
        await updateSettings({
            id: "_id" in settings ? settings._id : undefined,
            isAutoOptimizeOn: !settings.isAutoOptimizeOn,
            newsApiKey: settings.newsApiKey,
            newsApiSecret: settings.newsApiSecret,
            youtubeApiKey: settings.youtubeApiKey,
            tavilyApiKey: settings.tavilyApiKey,
            keywords: settings.keywords,
            crawlFrequency: settings.crawlFrequency,
            targetCountry: settings.targetCountry
        });
    };

    const handleSave = async () => {
        if (!settings) return;
        await updateSettings({
            id: "_id" in settings ? settings._id : undefined,
            isAutoOptimizeOn: settings.isAutoOptimizeOn ?? true,
            newsApiKey,
            newsApiSecret,
            naverDisplay,
            naverKeywords,
            youtubeApiKey,
            youtubeKeywords,
            tavilyApiKey,
            keywords,
            crawlFrequency,
            targetCountry: "KR"
        });
        alert("설정이 저장되었습니다");
    };

    if (settings === undefined) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        );
    }

    const tabs = [
        { id: 'planning', label: '소재 기획', icon: FileText },
        { id: 'production', label: '영상 제작', icon: Video },
        { id: 'analytics', label: '성과 분석', icon: BarChart2 },
        { id: 'prompts', label: '프롬프트', icon: Sparkles },
        { id: 'general', label: '전체 설정', icon: Settings },
    ];

    const tabsLabel: Record<string, string> = {
        planning: '소재 기획',
        production: '영상 제작',
        analytics: '성과 분석',
        prompts: '프롬프트',
        general: '전체 설정',
    };

    return (
        <div className="min-h-screen bg-white text-[#111111] flex flex-col md:flex-row w-full">
            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 w-full max-w-none overflow-y-auto">

                {/* Header for Desktop */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                        {tabsLabel[activeTab]}
                    </h2>
                    <p className="text-[#666666] text-sm">
                        {activeTab === 'planning' && "크롤링 소스 및 키워드 모니터링 설정을 관리합니다."}
                        {activeTab === 'prompts' && "AI 에이전트의 자동 최적화 및 롤백 정책을 설정합니다."}
                        {activeTab === 'production' && "영상 제작 관련 기본 설정을 관리합니다."}
                        {activeTab === 'analytics' && "대시보드 및 리포트 표시 항목을 설정합니다."}
                        {activeTab === 'general' && "계정 및 앱 기본 설정을 관리합니다."}
                    </p>
                </div>

                {/* Content: Planning */}
                {activeTab === 'planning' && (
                    <div className="flex gap-8 relative">
                        {/* Main Settings Column */}
                        <div className="flex-1 space-y-8 animate-fadeIn max-w-4xl">

                            {/* 1. Naver News Section */}
                            <section id="naver-section" className="scroll-mt-24">
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
                                            <div>
                                                <h2 className="text-[16px] font-bold text-[#111111]">네이버 뉴스 설정 (Naver News)</h2>
                                                <p className="text-[12px] text-[#666666]">최신 뉴스 트렌드를 수집하기 위한 API 및 키워드 설정</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <PasswordInput label="Client ID" value={newsApiKey} onChange={setNewsApiKey} show={showKeys['naverId']} onToggle={() => toggleShowKey('naverId')} />
                                            <PasswordInput label="Client Secret" value={newsApiSecret} onChange={setNewsApiSecret} show={showKeys['naverSecret']} onToggle={() => toggleShowKey('naverSecret')} />
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-[13px] font-bold text-[#666666]">수집 개수 설정 (Fetch Limit)</label>
                                                <span className="text-[13px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{naverDisplay}개</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="10"
                                                max="100"
                                                step="10"
                                                value={naverDisplay}
                                                onChange={(e) => setNaverDisplay(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                            />
                                            <div className="flex justify-between text-[11px] text-[#999999] mt-1">
                                                <span>10</span>
                                                <span>100</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-bold text-[#666666] mb-2">네이버 감시 키워드 (Keywords)</label>
                                            <KeywordInput
                                                keywords={naverKeywords}
                                                onAdd={(k) => setNaverKeywords([...naverKeywords, k])}
                                                onRemove={(k) => setNaverKeywords(naverKeywords.filter(w => w !== k))}
                                                placeholder="네이버 뉴스 검색 키워드 입력..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. YouTube Section */}
                            <section id="youtube-section" className="scroll-mt-24">
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg"><Video className="w-5 h-5" /></div>
                                            <div>
                                                <h2 className="text-[16px] font-bold text-[#111111]">유튜브 설정 (YouTube)</h2>
                                                <p className="text-[12px] text-[#666666]">유튜브 트렌드 및 영상 분석을 위한 설정</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        <PasswordInput label="YouTube Data API Key" value={youtubeApiKey} onChange={setYoutubeApiKey} show={showKeys['youtube']} onToggle={() => toggleShowKey('youtube')} icon="youtube" />

                                        <div>
                                            <label className="block text-[13px] font-bold text-[#666666] mb-2">유튜브 감시 키워드 (Keywords)</label>
                                            <KeywordInput
                                                keywords={youtubeKeywords}
                                                onAdd={(k) => setYoutubeKeywords([...youtubeKeywords, k])}
                                                onRemove={(k) => setYoutubeKeywords(youtubeKeywords.filter(w => w !== k))}
                                                placeholder="유튜브 검색 키워드 입력..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Community Section (Placeholder for now, can perform basic actions) */}
                            <section id="community-section" className="scroll-mt-24">
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg"><Database className="w-5 h-5" /></div>
                                            <div>
                                                <h2 className="text-[16px] font-bold text-[#111111]">커뮤니티 / 기타 설정</h2>
                                                <p className="text-[12px] text-[#666666]">기타 데이터 소스 및 주기 설정</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <PasswordInput label="Tavily API Key (웹 검색)" value={tavilyApiKey} onChange={setTavilyApiKey} show={showKeys['tavily']} onToggle={() => toggleShowKey('tavily')} icon="tavily" />
                                        <div>
                                            <label className="block text-[13px] font-bold text-[#666666] mb-2">크롤링 주기 (Frequency)</label>
                                            <div className="relative">
                                                <select
                                                    value={crawlFrequency}
                                                    onChange={(e) => setCrawlFrequency(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]"
                                                >
                                                    <option value="6h">6시간마다</option>
                                                    <option value="12h">12시간마다</option>
                                                    <option value="24h">24시간마다</option>
                                                    <option value="manual">수동 실행</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Sticky Remote Control */}
                        <aside className="w-64 hidden xl:block relative">
                            <div className="sticky top-8 space-y-4">
                                <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-sm">
                                    <h3 className="text-[12px] font-bold text-[#888888] mb-3 uppercase tracking-wider">Quick Jump</h3>
                                    <nav className="space-y-1">
                                        <button onClick={() => document.getElementById('naver-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA] hover:text-black rounded-lg transition-colors flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            네이버 뉴스
                                        </button>
                                        <button onClick={() => document.getElementById('youtube-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA] hover:text-black rounded-lg transition-colors flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            유튜브
                                        </button>
                                        <button onClick={() => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#444444] hover:bg-[#FAFAFA] hover:text-black rounded-lg transition-colors flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            커뮤니티 / 기타
                                        </button>
                                    </nav>
                                    <div className="mt-6 pt-4 border-t border-[#F5F5F5]">
                                        <button
                                            onClick={handleSave}
                                            className="w-full py-2.5 bg-black hover:bg-[#333333] text-white rounded-lg text-[13px] font-bold shadow-md transition-all flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-3.5 h-3.5" />
                                            변경사항 저장
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Content: Prompts (Auto Optimization) */}
                {activeTab === 'prompts' && (
                    <div className="space-y-6 animate-fadeIn">
                        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-[16px] font-bold flex items-center gap-2">
                                        <Wand2 className="w-5 h-5 text-[#888888]" />
                                        AI 에이전트 자동 최적화
                                    </h2>
                                    <p className="text-[#666666] text-[13px] mt-1">
                                        AI가 주기적으로 성과를 분석하여 스크립트 작성 로직을 개선합니다.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={handleToggle}
                                        className={clsx(
                                            "w-14 h-8 rounded-full relative transition-colors duration-300",
                                            settings.isAutoOptimizeOn ? "bg-blue-600" : "bg-[#E5E5E5]"
                                        )}
                                    >
                                        <div className={clsx(
                                            "absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300",
                                            settings.isAutoOptimizeOn ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-6 mb-6">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-bold text-[#666666] mb-2">빈도 설정</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                            <option>매주 1회</option>
                                            <option>매일</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                                    </div>
                                </div>
                                <div className="flex-[2] flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-[13px] font-bold text-[#666666] mb-2">실행 시간</label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                                <option>일요일</option>
                                                <option>월요일</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[13px] font-bold text-[#666666] mb-2">&nbsp;</label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl appearance-none outline-none focus:border-black font-medium text-[14px]">
                                                <option>오전 03:00</option>
                                                <option>오전 04:00</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Safety Section */}
                        <section className="bg-green-50/50 rounded-2xl border border-green-100 p-8 shadow-sm relative overflow-hidden">
                            <ShieldAlert className="absolute right-6 top-6 w-24 h-24 text-green-100 -z-10" />
                            <h2 className="text-[16px] font-bold mb-6 flex items-center gap-2 text-[#111111]">
                                <ShieldAlert className="w-5 h-5 text-green-600" />
                                안전장치 (Safety & Rollback)
                            </h2>
                            <div className="bg-white rounded-xl p-6 border border-green-100 mb-4 shadow-sm">
                                <div className="text-[13px] font-bold text-[#666666] mb-3">자동 롤백(ROLLBACK) 조건</div>
                                <div className="flex items-center flex-wrap gap-2 text-[14px] font-medium text-[#333333]">
                                    <span>새 버전의 성과가</span>
                                    <div className="relative">
                                        <select className="px-3 py-1.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-lg font-bold outline-none pr-8">
                                            <option>10%</option>
                                            <option>20%</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#888888] pointer-events-none" />
                                    </div>
                                    <span>이상 하락하면</span>
                                    <ArrowRightIcon />
                                    <div className="relative">
                                        <select className="px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg font-bold outline-none pr-8">
                                            <option>베스트 버전으로 자동 복구</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-blue-500 pointer-events-none" />
                                    </div>
                                    <span>합니다.</span>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[16px] font-bold flex items-center gap-2">
                                    <History className="w-5 h-5 text-[#888888]" />
                                    최적화 기록 (Log)
                                </h2>
                                <button className="text-[12px] font-bold text-[#888888] hover:text-[#111111]">전체 보기</button>
                            </div>
                            <div className="space-y-6 pl-2">
                                <LogItem date="1월 07일" version="v1.3 업데이트" status="success" desc="+15% CTR 개선됨" time="오전 03:00" />
                                <LogItem date="12월 31일" version="v1.2 업데이트" status="rollback" desc="낮은 시청 지속률 감지 (v1.1로 복구)" time="오전 03:00" />
                            </div>
                        </section>
                    </div>
                )}

                {/* Other Tabs */}
                {['production', 'analytics', 'general'].includes(activeTab) && (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-[#E5E5E5] border-dashed">
                        <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
                            <Settings className="w-8 h-8 text-[#CCCCCC]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mb-2">{tabsLabel[activeTab]} 준비 중</h3>
                        <p className="text-[#888888] text-sm">이 메뉴는 아직 준비 중입니다. 곧 업데이트될 예정입니다.</p>
                    </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-12 pt-6 border-t border-[#E5E5E5]">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#111111] hover:bg-[#333333] text-white rounded-lg text-[14px] font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]">
                        <Save className="w-4 h-4" />
                        설정 저장하기
                    </button>
                </div>
            </main>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-white text-[#111111] flex flex-col md:flex-row w-full animate-fadeIn">
            <Suspense fallback={
                <div className="flex w-full h-screen items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#888888] animate-spin" />
                </div>
            }>
                <SettingsContent />
            </Suspense>
        </div>
    );
}

// Helper Components
function SourceCheckbox({ title, desc, defaultChecked }: { title: string, desc: string, defaultChecked?: boolean }) {
    return (
        <label className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-[#E5E5E5] hover:bg-[#FAFAFA] transition-all cursor-pointer group">
            <div className={clsx(
                "w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors",
                defaultChecked ? "bg-blue-600 border-blue-600" : "bg-white border-[#DDDDDD]"
            )}>
                {defaultChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
            <div>
                <div className="text-[14px] font-bold text-[#111111] mb-1 group-hover:text-blue-600 transition-colors">{title}</div>
                <div className="text-[12px] text-[#666666]">{desc}</div>
            </div>
        </label>
    );
}

function ArrowRightIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33334 8H12.6667" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66666 4L12.6667 8L8.66666 12" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function LogItem({ date, version, status, desc, time }: any) {
    return (
        <div className="relative pl-8 border-l-2 border-[#F5F5F5] last:border-0 pb-1">
            <div className={clsx(
                "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white",
                status === 'success' ? "border-green-500" : "border-amber-500"
            )}>
                {status === 'success' ? (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                ) : (
                    <RotateCcw className="w-2 h-2 text-amber-500" />
                )}
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <div className="text-[14px] font-bold text-[#111111] mb-1 flex items-center gap-2">
                        {date} <span className="text-[#888888] font-normal">-</span> {version}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={clsx(
                            "text-[11px] font-bold px-1.5 py-0.5 rounded border",
                            status === 'success' ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                            {status === 'success' ? "성공" : "롤백됨 (v1.1로 복구)"}
                        </span>
                        <span className="text-[12px] text-[#555555]">{desc}</span>
                    </div>
                </div>
                <div className="text-[12px] text-[#AAAAAA] font-mono">{time}</div>
            </div>
        </div>
    );
}

function PasswordInput({ label, value, onChange, show, onToggle, icon }: any) {
    return (
        <div>
            <label className="block text-[12px] font-bold text-[#666666] mb-1.5">{label}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] outline-none focus:border-black transition-colors"
                />
                <button onClick={onToggle} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888888] hover:text-[#333333]">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}

function KeywordInput({ keywords, onAdd, onRemove, placeholder }: {
    keywords: string[],
    onAdd: (k: string) => void,
    onRemove: (k: string) => void,
    placeholder: string
}) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault(); // Prevent duplicated submit if inside form
            if (!keywords.includes(input.trim())) {
                onAdd(input.trim());
            }
            setInput("");
        }
    };

    return (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-3 flex flex-wrap gap-2 min-h-[100px] content-start focus-within:border-black transition-colors">
            {keywords.map(k => (
                <span key={k} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[12px] font-bold flex items-center gap-1">
                    {k}
                    <button onClick={() => onRemove(k)}><X className="w-3 h-3 hover:text-blue-900" /></button>
                </span>
            ))}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 min-w-[120px] text-[13px] outline-none placeholder-[#CCCCCC]"
            />
        </div>
    );
}
