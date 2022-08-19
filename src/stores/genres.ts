import { countBy, toPairs, sortBy } from 'lodash-es';
import { headers } from './spotifyToken';
import { derived } from 'svelte/store';
import { timeRange } from './timeRange';
import type { RawArtist } from './artists';

const parseGenres = (artists: RawArtist[]) => {
	const raw = artists.map((artist) => artist.genres);
	const flattened = raw.flat();
	const scores = countBy(flattened);
	const genres = toPairs(scores);
	const sorted = sortBy(genres, (genre) => genre[1]);
	const first10 = sorted.slice(0, 10);
	const list = first10.map((genre) => genre[0]);

	return list;
};

const fetchGenres = async (timeRange: string, headers: HeadersInit) => {
	const response = await fetch(
		`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
		{ headers }
	);
	const data = await response.json();

	return parseGenres(data.items);
};

export const genres = derived([timeRange, headers], ([$timeRange, $headers]) =>
	fetchGenres($timeRange, $headers)
);
