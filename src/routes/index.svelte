<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';

	const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const callback = encodeURIComponent(`${$page.url.href}me`);

	const loginURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${callback}&scope=user-top-read&show_dialog=true`;
</script>

<a href={loginURL}>
	<Button>Login</Button>
</a>
