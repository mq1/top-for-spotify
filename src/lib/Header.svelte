<script lang="ts">
	import TimeRangeSelector from '$lib/TimeRangeSelector.svelte';
	import UserImage from '$lib/UserImage.svelte';
	import LogoutButton from '$lib/LogoutButton.svelte';
	import ShareButton from '$lib/ShareButton.svelte';
	import IconShare from '~icons/feather/share';
	import IconLogOut from '~icons/feather/log-out';
	import { page } from '$app/stores';

	const isLoggedIn = $page.url.pathname === '/me';
</script>

<div
	class="flex flex-wrap justify-between items-center gap-4 p-4 fixed z-10 bg-white dark:bg-black w-full border-b-2 border-gray-200 dark:border-gray-700"
>
	<div>
		{#if isLoggedIn}
			<TimeRangeSelector />
		{/if}
	</div>

	<h1 class="text-3xl font-bold hidden sm:block">Top for Spotify</h1>

	<div class="flex gap-4">
		{#if isLoggedIn}
			<UserImage />
			<ShareButton>
				<IconShare class="h-6" />
			</ShareButton>
			<LogoutButton>
				<IconLogOut class="h-6" />
			</LogoutButton>
		{/if}
	</div>
</div>
