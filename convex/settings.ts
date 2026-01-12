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
            };
        }
        return settings;
    },
});

export const updateSettings = mutation({
    args: {
        id: v.optional(v.id("settings")), // Make optional in case we need to create
        isAutoOptimizeOn: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (existing) {
            await ctx.db.patch(existing._id, { isAutoOptimizeOn: args.isAutoOptimizeOn });
        } else {
            // Create if not exists
            await ctx.db.insert("settings", {
                isAutoOptimizeOn: args.isAutoOptimizeOn,
                cycle: "weekly",
                safetyThreshold: 10
            });
        }
    }
});
