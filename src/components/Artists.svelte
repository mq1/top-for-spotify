<script lang="ts">
	import { artists } from '../stores/artists';
</script>

{#await $artists then artists}
    {#each artists as artist, i}
        <figure class="rounded-2xl shadow-lg bg-white flex items-center gap-x-2">
            <img
                class="object-cover h-8 w-8 rounded-full p-1"
                src={artist.imageURL}
                alt={artist.name}
            />
            <figcaption class="text-black font-medium">
                {i + 1}. {artist.name}
            </figcaption>
        </figure>
    {/each}
{/await}
