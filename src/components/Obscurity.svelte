<script lang="ts">
	import { obscurity } from '../stores/obscurity';
</script>

{#await $obscurity then obscurity}
	<div class="flex items-center gap-x-2 text-xl">
		<div>🌃</div>
		<div>{obscurity}%</div>
		<div>Obscurity</div>
	</div>
{/await}
