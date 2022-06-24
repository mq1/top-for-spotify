<script lang="ts">
	import TimeRangeSelector from '$lib/TimeRangeSelector.svelte';
	import UserImage from '$lib/UserImage.svelte';
	import LogoutButton from '$lib/LogoutButton.svelte';
	import ShareButton from '$lib/ShareButton.svelte';
	import { page } from '$app/stores';

	const isLoggedIn = $page.url.pathname === '/me';
</script>

<div
	class="navbar bg-base-100 fixed z-10"
>
	<div class="navbar-start">
		{#if isLoggedIn}
			<TimeRangeSelector />
		{/if}
	</div>

	<div class="navbar-center">
		<h1 class="text-3xl font-bold hidden sm:block">Top for Spotify</h1>
	</div>

	<div class="navbar-end">
		{#if isLoggedIn}
			<UserImage />
			<ShareButton />
			<LogoutButton />
		{/if}
	</div>
</div>
