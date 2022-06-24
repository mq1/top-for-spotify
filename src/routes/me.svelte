<script lang="ts">
	import Obscurity from '$lib/Obscurity.svelte';
	import Mood from '$lib/Mood.svelte';
	import Genres from '$lib/Genres.svelte';
	import Artists from '$lib/Artists.svelte';
	import Tracks from '$lib/Tracks.svelte';
</script>

<main class="max-w-5xl flex flex-col gap-y-8 px-8 mt-32">
	<Obscurity />
	<Mood />
	<Genres />
	<Artists />
	<Tracks />
</main>
