import { mean } from 'lodash-es';
import { derived } from 'svelte/store';
import { headers } from '$lib/stores/spotifyToken';
import { timeRange } from './timeRange';
import type { RawTrack } from './tracks';

const parseObscurityRating = (tracks: RawTrack[]) => {
	const obscurities = tracks.map((track) => 100 - track.popularity);
	const avg = mean(obscurities);
	const rounded = Math.round(avg);

	return rounded;
};

const fetchObscurity = async (timeRange: string, headers: HeadersInit) => {
	const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
		headers
	});
	const data = await response.json();
	const rating = parseObscurityRating(data.items);

	return rating;
};

export const obscurity = derived([timeRange, headers], ([$timeRange, $headers]) =>
	fetchObscurity($timeRange, $headers)
);
