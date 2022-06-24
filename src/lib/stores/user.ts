import { headers } from '$lib/stores/spotifyToken';
import { derived } from 'svelte/store';

interface User {
	display_name: string;
	images: { url: string }[];
}

const fetchUser = async (headers: HeadersInit) => {
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers
	});
	const data = await response.json();

	return data as User;
};

export const user = derived(headers, ($headers) => fetchUser($headers));
