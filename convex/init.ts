import { mutation } from "./_generated/server";

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        // 0. Clear existing data
        const existingAgents = await ctx.db.query("agents").collect();
        for (const doc of existingAgents) await ctx.db.delete(doc._id);

        const existingTrends = await ctx.db.query("trends").collect();
        for (const doc of existingTrends) await ctx.db.delete(doc._id);

        const existingProjects = await ctx.db.query("projects").collect();
        for (const doc of existingProjects) await ctx.db.delete(doc._id);

        const existingAnalytics = await ctx.db.query("analytics").collect();
        for (const doc of existingAnalytics) await ctx.db.delete(doc._id);

        const existingSettings = await ctx.db.query("settings").collect();
        for (const doc of existingSettings) await ctx.db.delete(doc._id);

        // 1. Agents
        await ctx.db.insert("agents", {
            name: "스크립트 작가 봇",
            type: "코어 엔진",
            role: "Script Writer",
            version: "v1.3",
            status: "pending",
            prompt: "You are a professional YouTube script writer...",
            model: "GPT-4o",
            metrics: { label: "평균 완독률", value: "68%" },
            personas: [
                { id: "p1", name: "한입썰", mode: "유머러스", score: 92 },
                { id: "p2", name: "AI 뉴스", mode: "전문적", score: 88 },
            ]
        });

        await ctx.db.insert("agents", {
            name: "썸네일 봇",
            type: "코어 엔진",
            role: "Designer",
            version: "v2.0 (안정)",
            status: "active",
            prompt: "Create high CTR thumbnails...",
            model: "DALL-E 3",
            metrics: { label: "평균 CTR", value: "7.2%" },
            personas: [
                { id: "p3", name: "데일리 브이로그", mode: "미니멀리스트", score: 95 },
            ]
        });

        await ctx.db.insert("agents", {
            name: "트렌드 헌터 봇",
            type: "분석 엔진",
            role: "Researcher",
            version: "v1.0 (안정)",
            status: "active",
            prompt: "Analyze latest trends...",
            model: "Perplexity API",
            metrics: { label: "탐지 정확도", value: "91.5%" },
            personas: []
        });

        // 2. Trends
        await ctx.db.insert("trends", {
            title: "2025 AI Tech Trends",
            source: "TechCrunch",
            url: "https://techcrunch.com/...",
            aiScore: 95,
            isSaved: false,
        });
        await ctx.db.insert("trends", {
            title: "DeepSeek Updates",
            source: "Hacker News",
            url: "https://news.ycombinator.com/...",
            aiScore: 88,
            isSaved: false,
        });

        // 3. Projects
        // (Empty initially, created by user)

        // 4. Analytics
        await ctx.db.insert("analytics", {
            videoId: "v101",
            thumbnail: "bg-slate-700",
            title: "AI 뉴스 Ep.1 - 생성형 AI의 미래",
            channel: "한입썰",
            promptVersion: "Ver 1.4",
            promptSource: "News",
            views: 125000,
            ctr: 6.2,
            retention: "68%",
            retentionData: [100, 95, 80, 70, 60],
            insightType: "success",
            insightText: "썸네일 반응 좋음",
            date: "2026-01-05"
        });

        await ctx.db.insert("analytics", {
            videoId: "v102",
            thumbnail: "bg-amber-200",
            title: "지속 가능한 포장 아이디어 (쇼츠)",
            channel: "숏츠",
            promptVersion: "Ver 1.2",
            promptSource: "Blind",
            views: 84000,
            ctr: 4.8,
            retention: "45%",
            retentionData: [100, 50, 40, 30],
            insightType: "warning",
            insightText: "초반 5초 이탈률 높음",
            date: "2026-01-02"
        });

        // 5. Settings
        await ctx.db.insert("settings", {
            isAutoOptimizeOn: true,
            cycle: "weekly",
            safetyThreshold: 10,
        });
    },
});
