<script lang="ts">
	import { avgFeatures } from '../stores/audioFeatures';
</script>

{#await $avgFeatures then avgFeatures}
    <div class="flex items-center gap-x-4 sm:gap-x-8 text-2xl sm:text-4xl">
        <div>⚡</div>
        <div>{avgFeatures.energy}%</div>
        <div>Energy</div>
    </div>
{/await}
