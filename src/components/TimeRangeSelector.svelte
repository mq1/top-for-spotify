<script lang="ts">
	import { timeRange } from '../stores/timeRange';
</script>

<select bind:value={$timeRange} class="rounded-xl focus:border-green-500 focus:ring-green-500">
	<option value="short_term">Short Term</option>
	<option value="long_term">Long Term</option>
</select>
