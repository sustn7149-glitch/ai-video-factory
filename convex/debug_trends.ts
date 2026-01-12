
import { action } from "./_generated/server";
import { api } from "./_generated/api";


export const listTrends = action({
    args: {},
    handler: async (ctx) => {
        const trends = await ctx.runQuery(api.trends.get);
        const projects = await ctx.runQuery(api.projects.get);
        console.log("Trends:", JSON.stringify(trends, null, 2));
        console.log("Projects:", JSON.stringify(projects, null, 2));
    },
});
