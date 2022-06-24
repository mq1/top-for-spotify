import { derived } from 'svelte/store';
import { headers } from '$lib/stores/spotifyToken';
import { timeRange } from './timeRange';

export interface RawArtist {
	name: string;
	genres: string[];
	images: { url: string }[];
}

const parseArtists = (artists: RawArtist[]) =>
	artists.map((artist) => ({
		name: artist.name,
		imageURL: artist.images[0].url
	}));

const fetchArtists = async (timeRange: string, headers: HeadersInit) => {
	const response = await fetch(
		`https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`,
		{ headers }
	);
	const data = await response.json();

	return parseArtists(data.items);
};

export const artists = derived([timeRange, headers], ([$timeRange, $headers]) =>
	fetchArtists($timeRange, $headers)
);
