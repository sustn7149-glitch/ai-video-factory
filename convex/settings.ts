import { mutation, query } from "./_generated/server";
// Force sync

import { v } from "convex/values";

export const getSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("settings").first();
        if (!settings) {
            return {
                isAutoOptimizeOn: true,
                cycle: "weekly",
                safetyThreshold: 10,
                newsApiKey: "",
                newsApiSecret: "",
                naverDisplay: 10,
                naverKeywords: [],
                youtubeApiKey: "",
                youtubeKeywords: [],
                tavilyApiKey: "",
                keywords: [],
                crawlFrequency: "6h",
                targetCountry: "KR"
            };
        }
        return settings;
    },
});

export const updateSettings = mutation({
    args: {
        id: v.optional(v.id("settings")), // Make optional in case we need to create
        isAutoOptimizeOn: v.boolean(),
        // Data Sources
        newsApiKey: v.optional(v.string()),
        newsApiSecret: v.optional(v.string()),
        naverDisplay: v.optional(v.number()),
        naverKeywords: v.optional(v.array(v.string())),
        youtubeApiKey: v.optional(v.string()),
        youtubeKeywords: v.optional(v.array(v.string())),
        tavilyApiKey: v.optional(v.string()),
        keywords: v.optional(v.array(v.string())),
        crawlFrequency: v.optional(v.string()),
        targetCountry: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (existing) {
            await ctx.db.patch(existing._id, {
                isAutoOptimizeOn: args.isAutoOptimizeOn,
                newsApiKey: args.newsApiKey,
                newsApiSecret: args.newsApiSecret,
                naverDisplay: args.naverDisplay,
                naverKeywords: args.naverKeywords,
                youtubeApiKey: args.youtubeApiKey,
                youtubeKeywords: args.youtubeKeywords,
                tavilyApiKey: args.tavilyApiKey,
                keywords: args.keywords,
                crawlFrequency: args.crawlFrequency,
                targetCountry: args.targetCountry,
            });
        } else {
            // Create if not exists
            await ctx.db.insert("settings", {
                isAutoOptimizeOn: args.isAutoOptimizeOn,
                cycle: "weekly",
                safetyThreshold: 10,
                newsApiKey: args.newsApiKey,
                newsApiSecret: args.newsApiSecret,
                naverDisplay: args.naverDisplay,
                naverKeywords: args.naverKeywords,
                youtubeApiKey: args.youtubeApiKey,
                youtubeKeywords: args.youtubeKeywords,
                tavilyApiKey: args.tavilyApiKey,
                keywords: args.keywords,
                crawlFrequency: args.crawlFrequency,
                targetCountry: args.targetCountry,
            });
        }
    }
});
