<script lang="ts">
	import Box from '$lib/Box.svelte';
	import { tracks } from '$lib/stores/tracks';
</script>

{#await $tracks then tracks}
	<Box
		className="flex flex-col gap-y-16 bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 font-bold uppercase"
	>
		<h2 class="text-5xl sm:text-7xl text-white">Tracks</h2>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
			{#each tracks as track, i}
				<figure class="rounded-2xl shadow-lg bg-white dark:bg-black">
					<img
						class="object-cover h-48 w-96 rounded-2xl p-1"
						src={track.imageURL}
						alt={track.name}
					/>
					<figcaption class="text-black dark:text-white mx-4 my-2">
						{i + 1}. {track.name}
					</figcaption>
				</figure>
			{/each}
		</div>
	</Box>
{/await}
