<script lang="ts">
	import IconLogOut from '~icons/feather/log-out';

	const logOut = () => {
		location.href = '/';
	};
</script>

<button on:click={logOut} class="btn btn-ghost btn-circle">
	<IconLogOut />
</button>
