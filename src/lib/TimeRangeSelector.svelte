<script lang="ts">
	import { timeRange } from '$lib/stores/timeRange';
</script>

<select
	bind:value={$timeRange}
	class="select select-primary"
>
	<option value="short_term">Short Term</option>
	<option value="long_term">Long Term</option>
</select>
