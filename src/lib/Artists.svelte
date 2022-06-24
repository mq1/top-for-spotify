<script lang="ts">
	import Box from '$lib/Box.svelte';
	import { artists } from '$lib/stores/artists';
</script>

{#await $artists then artists}
	<Box
		className="flex flex-col gap-y-16 bg-gradient-to-r from-yellow-400 to-pink-500 font-bold uppercase"
	>
		<h2 class="text-5xl sm:text-7xl text-white">Artists</h2>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
			{#each artists as artist, i}
				<figure class="rounded-2xl shadow-lg bg-white dark:bg-black">
					<img
						class="object-cover h-48 w-96 rounded-2xl p-1"
						src={artist.imageURL}
						alt={artist.name}
					/>
					<figcaption class="text-black dark:text-white mx-4 my-2">
						{i + 1}. {artist.name}
					</figcaption>
				</figure>
			{/each}
		</div>
	</Box>
{/await}
