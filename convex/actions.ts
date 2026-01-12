

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import OpenAI from "openai";

const openai = new OpenAI();

export const generateScript = action({
    args: {
        topic: v.string(),
        sourceText: v.string(),
    },
    handler: async (ctx, args) => {
        const prompt = `
You are a professional YouTube script writer. 
Write an engaging, high-retention script about '${args.topic}' based on the source text below.
The script should be in Korean, casual but professional (polite informal or formal depending on context, but aim for 'polite/wit').
Structure it with:
1. Opening (Hook)
2. Body (3 key points)
3. Conclusion (Call to action)

Source Text:
${args.sourceText}
    `;

        try {
            if (!process.env.OPENAI_API_KEY) {
                throw new Error("Missing OPENAI_API_KEY env variable");
            }

            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a creative YouTube script writer." },
                    { role: "user", content: prompt },
                ],
            });

            const content = completion.choices[0].message.content ?? "";
            return content;
        } catch (e: any) {
            console.error("OpenAI API Error:", e);
            throw new Error(`OpenAI Error: ${e.message}`);
        }
    },
});

export const analyzeVideoPerformance = action({
    args: {
        script: v.string(),
        retentionData: v.array(v.number()),
    },
    handler: async (ctx, args) => {
        try {
            if (!process.env.OPENAI_API_KEY) {
                throw new Error("Missing OPENAI_API_KEY env variable");
            }

            const prompt = `
You are a YouTube Data Analyst.
Analyze the retention data and the script. Identify why retention dropped (if low) or increased. Give specific advice on how to improve the script.

Retention Data (per segment): [${args.retentionData.join(", ")}]
Script:
${args.script}

Output specific advice in Korean (max 3 lines).
        `;

            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a professional YouTube Data Analyst." },
                    { role: "user", content: prompt },
                ],
            });

            return completion.choices[0].message.content ?? "분석을 완료할 수 없습니다.";

        } catch (e: any) {
            console.error("OpenAI Analysis Error:", e);
            throw new Error(`Analysis Error: ${e.message}`);
        }
    },
});

export const runAutoPlanning = action({
    args: {},
    handler: async (ctx) => {
        // 1. Check Settings
        const settings = await ctx.runQuery(api.settings.getSettings);
        if (!settings?.isAutoOptimizeOn) {
            console.log("Auto Optimization is OFF. Skipping.");
            return;
        }

        // 2. Find High Scoring Trend
        const trend = await ctx.runQuery(internal.trends.getHighScoringTrend);
        if (!trend) {
            console.log("No high-scoring trends found.");
            return;
        }

        // 3. Create Project & Update Trend
        await ctx.runMutation(internal.projects.createAutoProject, {
            title: trend.title,
            trendId: trend._id,
            source: trend.source
        });

        console.log(`[Auto Planning] Created project from trend: ${trend.title}`);
    },
});
