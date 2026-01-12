import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").collect();
    },
});

export const getProject = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const createProject = mutation({
    args: {
        title: v.string(),
        trendId: v.optional(v.id("trends")),
        source: v.optional(v.string()),
        referenceUrl: v.optional(v.string()),
        referenceText: v.optional(v.string()),
        script: v.optional(v.string()), // Allow passing initial script
    },
    handler: async (ctx, args) => {
        const projectId = await ctx.db.insert("projects", {
            title: args.title,
            trendId: args.trendId,
            status: "scripting", // Default status for new drafts
            progress: 0,
            thumbnailUrl: "", // Empty initially
            referenceUrl: args.referenceUrl,
            referenceText: args.referenceText,
            script: args.script || "", // Use passed script or empty
        });

        // Mark trend as drafted
        if (args.trendId) {
            await ctx.db.patch(args.trendId, { isDraftCreated: true });
        } else if (args.referenceUrl) {
            // Fallback: find by URL if trendId not provided
            const trend = await ctx.db
                .query("trends")
                .filter((q) => q.eq(q.field("url"), args.referenceUrl))
                .first();

            if (trend) {
                await ctx.db.patch(trend._id, { isDraftCreated: true });
                // Also patch the project to link the trendId for future reference
                await ctx.db.patch(projectId, { trendId: trend._id });
            }
        }

        return projectId;
    },
});

export const updateProject = mutation({
    args: {
        id: v.id("projects"),
        script: v.optional(v.string()), // Updated script content
        title: v.optional(v.string()),
        // Add other fields as needed
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);

        // If script is being updated, check if we need to update the trend's hasScript status
        if (updates.script !== undefined) {
            const project = await ctx.db.get(id);
            if (project && project.trendId) {
                const hasScript = updates.script.length > 0;
                await ctx.db.patch(project.trendId, { hasScript });
            }
        }
    }
});

export const createAutoProject = internalMutation({
    args: {
        title: v.string(),
        trendId: v.id("trends"),
        source: v.string(),
    },
    handler: async (ctx, args) => {
        // 1. Create Project
        await ctx.db.insert("projects", {
            title: args.title,
            status: "scripting",
            progress: 0,
            thumbnailUrl: "",
        });

        // 2. Mark Trend as Saved
        await ctx.db.patch(args.trendId, { isSaved: true });
    },
});
