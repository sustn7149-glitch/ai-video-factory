"use client";

import { Plus } from "lucide-react";

const PERSONA_DATA = [
    { id: "p1", name: "한입썰", tone: "유머러스 & 비꼬는", target: "Z세대 남성", forbidden: "은어, 이모지" },
    { id: "p2", name: "AI 뉴스", tone: "전문적 & 건조한", target: "기술 전문가", forbidden: "전문 용어 남발" },
    { id: "p3", name: "데일리 브이로그", tone: "차분함 & 일상적", target: "2030 직장인", forbidden: "욕설, 정치적 발언" },
    { id: "p4", name: "쇼츠 드라마", tone: "격정적 & 반전있는", target: "10대 여학생", forbidden: "루즈한 전개" },
];

export default function PersonaTable() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[16px] font-bold text-[#111111]">변수 매핑 테이블</h3>
                    <p className="text-[13px] text-[#666666] mt-1">
                        각 채널별로 다르게 적용될 <span className="text-blue-600 font-mono text-xs bg-blue-50 px-1 rounded">{"{{변수}}"}</span> 값을 설정하세요.
                    </p>
                </div>
                <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[13px] font-medium transition-colors">
                    <Plus className="w-4 h-4 mr-1.5" />
                    새 페르소나 추가
                </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#E5E5E5]">
                <table className="min-w-full divide-y divide-[#E5E5E5]">
                    <thead className="bg-[#FAFAFA]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-[12px] font-semibold text-[#888888] uppercase tracking-wider">채널 이름</th>
                            <th scope="col" className="px-6 py-3 text-left text-[12px] font-semibold text-blue-600 uppercase tracking-wider font-mono bg-blue-50/50">{`{{톤}}`} 값</th>
                            <th scope="col" className="px-6 py-3 text-left text-[12px] font-semibold text-blue-600 uppercase tracking-wider font-mono bg-blue-50/50">{`{{타겟}}`} 값</th>
                            <th scope="col" className="px-6 py-3 text-left text-[12px] font-semibold text-blue-600 uppercase tracking-wider font-mono bg-blue-50/50">{`{{금지_단어}}`} 값</th>
                            <th scope="col" className="px-6 py-3 text-right text-[12px] font-semibold text-[#888888] uppercase tracking-wider">액션</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E5E5E5]">
                        {PERSONA_DATA.map((persona) => (
                            <tr key={persona.id} className="hover:bg-[#FAFAFA] transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs mr-3">
                                            {persona.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-medium text-[#111111]">{persona.name}</div>
                                            <div className="text-[11px] text-[#888888] font-mono">ID: ch_{persona.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 rounded bg-blue-50 text-blue-700 text-[12px] font-medium border border-blue-100">
                                        {persona.tone}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[13px] text-[#444444]">
                                    {persona.target}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[13px] text-[#444444]">
                                    {persona.forbidden}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-[12px] font-medium">
                                    <button className="text-[#888888] hover:text-[#111111]">수정</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex justify-between items-center text-[12px] text-[#666666]">
                    <span>총 4개의 페르소나가 등록되어 있습니다.</span>
                    <div className="flex space-x-2">
                        <button className="px-2 py-1 border border-[#E5E5E5] bg-white rounded hover:bg-[#F5F5F5] disabled:opacity-50">이전</button>
                        <button className="px-2 py-1 border border-[#E5E5E5] bg-white rounded hover:bg-[#F5F5F5]">다음</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
