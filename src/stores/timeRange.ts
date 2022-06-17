import { writable } from "svelte/store";

export const timeRanges = ["short_term", "long_term"] as const;
type TimeRange = typeof timeRanges[number];

export const timeRange = writable<TimeRange>("long_term");
