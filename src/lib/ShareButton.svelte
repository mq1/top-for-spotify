<script lang="ts">
	import { user } from '$lib/stores/user';
	import IconShare from '~icons/feather/share';

	const shareURL = async () => {
		const u = await $user;

		if (navigator.share) {
			navigator.share({
				title: 'top-for-spotify',
				text: `${u.display_name}'s Spotify stats`,
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			window.alert('URL copied to clipboard');
		}
	};
</script>

<button on:click={shareURL} class="btn btn-ghost btn-circle">
	<IconShare />
</button>
