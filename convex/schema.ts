import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    agents: defineTable({
        name: v.string(),
        type: v.string(),
        role: v.string(),
        status: v.string(),
        version: v.string(),
        prompt: v.string(),
        model: v.string(),
        metrics: v.object({
            label: v.string(),
            value: v.string(),
        }),
        personas: v.array(
            v.object({
                id: v.string(),
                name: v.string(),
                mode: v.string(),
                score: v.number(),
            })
        ),
    }),
    trends: defineTable({
        title: v.string(),
        source: v.string(),
        url: v.string(),
        aiScore: v.number(),
        isSaved: v.boolean(),
        keyword: v.optional(v.string()), // Added for tracking search source
        aiSummary: v.optional(v.string()), // Added for AI scoring reasoning
        isDraftCreated: v.optional(v.boolean()), // Track if a draft has been created
        hasScript: v.optional(v.boolean()), // Track if a script has been written
        draftScript: v.optional(v.string()), // Temporary storage for script during planning
    }),
    projects: defineTable({
        title: v.string(),
        trendId: v.optional(v.id("trends")), // Link to source trend
        status: v.string(),
        progress: v.number(),
        thumbnailUrl: v.optional(v.string()),
        referenceUrl: v.optional(v.string()),
        referenceText: v.optional(v.string()),
        script: v.optional(v.string()), // Script content
    }),
    analytics: defineTable({
        videoId: v.optional(v.string()),
        thumbnail: v.optional(v.string()),
        title: v.optional(v.string()),
        channel: v.optional(v.string()),
        promptVersion: v.optional(v.string()),
        promptSource: v.optional(v.string()),
        views: v.optional(v.number()),
        ctr: v.optional(v.number()),
        retention: v.optional(v.string()),
        retentionData: v.optional(v.array(v.number())),
        insightType: v.optional(v.string()),
        insightText: v.optional(v.string()),
        date: v.optional(v.string()),
    }),
    settings: defineTable({
        isAutoOptimizeOn: v.optional(v.boolean()),
        cycle: v.optional(v.string()),
        safetyThreshold: v.optional(v.number()),
        // Data Sources
        newsApiKey: v.optional(v.string()),
        newsApiSecret: v.optional(v.string()),
        naverDisplay: v.optional(v.number()), // Naver fetch limit
        naverKeywords: v.optional(v.array(v.string())), // Naver specific keywords
        youtubeApiKey: v.optional(v.string()),
        youtubeKeywords: v.optional(v.array(v.string())), // YouTube specific keywords
        tavilyApiKey: v.optional(v.string()),
        keywords: v.optional(v.array(v.string())),
        crawlFrequency: v.optional(v.string()),
        targetCountry: v.optional(v.string()),
    }),
    saved_filters: defineTable({
        name: v.string(),
        conditions: v.object({
            source: v.optional(v.string()),
            minAiScore: v.optional(v.number()),
            minViewCount: v.optional(v.number()),
            period: v.optional(v.string()),
            excludeDrafts: v.optional(v.boolean()),
        }),
        userId: v.optional(v.string()),
    }),
});
