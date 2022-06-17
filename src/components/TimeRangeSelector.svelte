<script lang="ts">
  import { timeRange, timeRanges } from "../stores/timeRange";
</script>

<select
  bind:value={$timeRange}
  class="border-2 rounded-lg p-2 border-green-500 bg-white dark:bg-black sm:text-xl capitalize"
>
  {#each timeRanges as tr}
    <option value={tr}>
      {tr.replace("_", " ")}
    </option>
  {/each}
</select>
