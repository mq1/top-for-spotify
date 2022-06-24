import { mapValues, mean } from 'lodash-es';
import { derived } from 'svelte/store';
import { headers } from '$lib/stores/spotifyToken';
import { timeRange } from './timeRange';
import type { RawTrack } from './tracks';

interface AudioFeatures {
	acousticness: number;
	danceability: number;
	energy: number;
	valence: number;
}

const parseTrackIDs = (tracks: RawTrack[]) => tracks.map((track) => track.id);

const parseAudioFeatures = (list: AudioFeatures[]) => {
	const features = {
		acousticness: list.map((track) => track.acousticness),
		danceability: list.map((track) => track.danceability),
		energy: list.map((track) => track.energy),
		valence: list.map((track) => track.valence)
	};

	const avg = mapValues(features, mean);
	const percent = mapValues(avg, (val) => val * 100);
	const rounded = mapValues(percent, (val) => Math.round(val));

	return rounded;
};

const fetchAvgFeatures = async (timeRange: string, headers: HeadersInit) => {
	const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
		headers
	});
	const data = await response.json();
	const trackIDs = parseTrackIDs(data.items);

	const response2 = await fetch(
		`https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`,
		{ headers }
	);
	const data2 = await response2.json();
	const avgFeatures = parseAudioFeatures(data2.audio_features);

	return avgFeatures;
};

export const avgFeatures = derived([timeRange, headers], ([$timeRange, $headers]) =>
	fetchAvgFeatures($timeRange, $headers)
);
