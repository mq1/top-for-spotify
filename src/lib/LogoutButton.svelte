<script lang="ts">
	const logOut = () => {
		location.href = '/';
	};
</script>

<button on:click={logOut}>
	<slot />
</button>
