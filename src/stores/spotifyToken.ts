import { readable } from 'svelte/store';

export const headers = readable({}, set =>{
	const accessToken = window.location.href.match(/#(?:access_token)=([\S\s]*?)&/)?.[1];

	const h = {
		Authorization: `Bearer ${accessToken}`
	};

    set(h);
});
