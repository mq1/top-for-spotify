import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const headers = derived(page, ($page) => {
	const accessToken = $page.url.href.match(/#(?:access_token)=([\S\s]*?)&/)?.[1];

	return {
		Authorization: `Bearer ${accessToken}`
	};
});
