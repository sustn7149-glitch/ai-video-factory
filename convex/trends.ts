import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {
        source: v.optional(v.string()),
        minAiScore: v.optional(v.number()),
        period: v.optional(v.string()),
        excludeDrafts: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let trends = await ctx.db.query("trends").order("desc").collect();

        if (args.source) {
            trends = trends.filter((t) => t.source === args.source);
        }
        if (args.minAiScore !== undefined) {
            const minScore = args.minAiScore;
            trends = trends.filter((t) => t.aiScore >= minScore);
        }
        if (args.excludeDrafts) {
            trends = trends.filter((t) => !t.isDraftCreated);
        }

        // Simple period filter (mock logic for now, can be sophisticated with creation time)
        // ...

        return trends;
    },
});

export const getTrend = query({
    args: { id: v.id("trends") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getSavedFilters = query({
    handler: async (ctx) => {
        return await ctx.db.query("saved_filters").collect();
    },
});

export const saveFilter = mutation({
    args: {
        name: v.string(),
        conditions: v.object({
            source: v.optional(v.string()),
            minAiScore: v.optional(v.number()),
            minViewCount: v.optional(v.number()),
            period: v.optional(v.string()),
            excludeDrafts: v.optional(v.boolean()),
        }),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("saved_filters", args);
    },
});

export const deleteFilter = mutation({
    args: { id: v.id("saved_filters") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const updateTrend = mutation({
    args: {
        id: v.id("trends"),
        draftScript: v.optional(v.string()),
        hasScript: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});
