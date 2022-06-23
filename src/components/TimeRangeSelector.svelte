<script lang="ts">
  import { timeRange } from "../stores/timeRange";
</script>

<select
  bind:value={$timeRange}
  class="border-2 rounded-lg p-2 border-green-500 bg-white dark:bg-black sm:text-xl capitalize"
>
  <option value="short_term">Short Term</option>
  <option value="long_term">Long Term</option>
</select>
