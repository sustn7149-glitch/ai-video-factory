import { query } from "./_generated/server";
// Force sync


export const getStats = query({
    args: {},
    handler: async (ctx) => {
        // Simple mock calculation logic for now, or just return static stats
        // In a real app, this would aggregate from the analytics table
        return [
            { label: "총 조회수", value: "1.2M", trend: 12 },
            { label: "평균 클릭률 (CTR)", value: "5.4%", trend: 0 },
            { label: "평균 시청지속률", value: "72%", trend: 0 },
            { label: "최고 효율 프롬프트", value: "v1.4 (News)", trend: 0 }
        ];
    },
});

export const getVideos = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("analytics").order("desc").collect();
    }
});
