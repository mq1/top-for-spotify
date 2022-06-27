<script lang="ts">
	import { page } from '$app/stores';

	const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const callback = encodeURIComponent(`${$page.url.href}me`);

	const loginURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${callback}&scope=user-top-read&show_dialog=true`;
</script>

<div class="flex flex-col items-center gap-8">
	<h1 class="text-5xl font-bold">Top for Spotify</h1>

	<a href={loginURL}>
		<button class="btn btn-primary btn-lg rounded-full">Login</button>
	</a>
</div>
