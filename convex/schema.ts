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
    }),
    projects: defineTable({
        title: v.string(),
        status: v.string(),
        progress: v.number(),
        thumbnailUrl: v.optional(v.string()),
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
    }),
});
