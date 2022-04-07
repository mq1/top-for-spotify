import { atom } from "nanostores";

export const timeRanges = ["short_term", "long_term"] as const;
type TimeRange = typeof timeRanges[number];

export const timeRange = atom<TimeRange>("long_term");
