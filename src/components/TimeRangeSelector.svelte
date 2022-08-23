<script lang="ts">
	import { timeRange } from '../stores/timeRange';
</script>

<select bind:value={$timeRange} class="rounded-xl focus:border-green-500 focus:ring-green-500 dark:bg-black">
	<option value="short_term">Last Month</option>
	<option value="medium_term">Last 6 Months</option>
	<option value="long_term">All Time</option>
</select>
