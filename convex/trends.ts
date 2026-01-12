import { query, internalQuery } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("trends").collect();
    },
});

export const getHighScoringTrend = internalQuery({
    args: {},
    handler: async (ctx) => {
        // Find one trend with score >= 90 and not saved
        return await ctx.db
            .query("trends")
            .filter((q) =>
                q.and(
                    q.gte(q.field("aiScore"), 90),
                    q.eq(q.field("isSaved"), false)
                )
            )
            .first();
    },
});
