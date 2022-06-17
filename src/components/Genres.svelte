<script lang="ts">
  import Box from "./Box.svelte";
  import { genres } from "../stores/genres";
</script>

<Box
  className="flex flex-col gap-y-16 bg-gradient-to-r from-green-400 to-blue-500 font-bold text-white uppercase"
>
  <h2 class="text-5xl sm:text-7xl">Genres</h2>
  <ol class="list-decimal text-left leading-loose text-2xl ml-8">
    {#each $genres as genre}
      <li>{genre}</li>
    {/each}
  </ol>
</Box>
