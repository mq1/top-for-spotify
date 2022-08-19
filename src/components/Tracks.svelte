<script lang="ts">
	import { tracks } from '../stores/tracks';
</script>

{#await $tracks then tracks}
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
{/await}
