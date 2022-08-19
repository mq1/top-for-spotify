<script lang="ts">
	import { artists } from '../stores/artists';
</script>

{#await $artists then artists}
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
{/await}
