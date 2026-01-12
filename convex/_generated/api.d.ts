/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions from "../actions.js";
import type * as agents from "../agents.js";
import type * as analytics from "../analytics.js";
import type * as crons from "../crons.js";
import type * as debug_trends from "../debug_trends.js";
import type * as init from "../init.js";
import type * as projects from "../projects.js";
import type * as settings from "../settings.js";
import type * as trends from "../trends.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  agents: typeof agents;
  analytics: typeof analytics;
  crons: typeof crons;
  debug_trends: typeof debug_trends;
  init: typeof init;
  projects: typeof projects;
  settings: typeof settings;
  trends: typeof trends;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
