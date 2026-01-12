import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").collect();
    },
});

export const createProject = mutation({
    args: {
        title: v.string(),
        source: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const projectId = await ctx.db.insert("projects", {
            title: args.title,
            status: "scripting", // Default status for new drafts
            progress: 0,
            thumbnailUrl: "", // Empty initially
        });
        return projectId;
    },
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
