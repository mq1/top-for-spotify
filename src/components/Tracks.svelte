<script lang="ts">
	import { tracks } from '../stores/tracks';
</script>

{#await $tracks then tracks}
    {#each tracks as track, i}
        <figure class="rounded-2xl shadow-lg bg-white flex items-center gap-x-2">
            <img
                class="object-cover h-8 w-8 rounded-full p-1"
                src={track.imageURL}
                alt={track.name}
            />
            <figcaption class="text-black font-medium">
                {i + 1}. {track.name}
            </figcaption>
        </figure>
    {/each}
{/await}
