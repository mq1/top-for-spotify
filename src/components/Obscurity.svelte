<script lang="ts">
	import { obscurity } from '../stores/obscurity';
</script>

{#await $obscurity then obscurity}
	<div class="text-7xl sm:text-9xl font-bold">{obscurity} %</div>
{/await}
