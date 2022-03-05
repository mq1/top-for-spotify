import { atom } from "nanostores";
import type { TimeRange } from "../types";

export const timeRange = atom<TimeRange>("short_term");
