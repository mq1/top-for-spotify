import { writable } from 'svelte/store';

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export const timeRange = writable<TimeRange>('short_term');
