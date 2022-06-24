<script lang="ts">
	export let className: string;
</script>

<div class={`rounded-xl shadow-md sm:shadow-lg p-6 sm:p-16 ${className}`}>
	<slot />
</div>
