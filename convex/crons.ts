
import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
    "auto-planning-cron",
    { minutes: 1 }, // Run every 1 minute
    api.actions.runAutoPlanning,
);

export default crons;
