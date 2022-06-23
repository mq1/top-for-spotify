import { writable } from "svelte/store";

type TimeRange = "short_term" | "long_term";

export const timeRange = writable<TimeRange>("long_term");
