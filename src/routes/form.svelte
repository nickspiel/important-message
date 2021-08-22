<script lang="ts">
	export const ssr = false;
	let input: string = '';
	const update = () => {
		if (history.pushState) {
			var newurl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				`?content=${input.replace(/\n/g, encodeURIComponent('|'))}`;
			window.history.pushState({ path: newurl }, '', newurl);
		}
	};
</script>

<div class="wrapper">
	<textarea bind:value={input} on:input={update} />
	<button>Donezo</button>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}
	textarea {
		font-size: 2vw;
		width: 50vw;
		height: 50vh;
		text-transform: uppercase;
		position: relative;
		z-index: 1;
		white-space: break-spaces;
	}
	button {
		font-size: 0.75rem;
		background-color: red;
		color: white;
		border-radius: 0.3em;
		border: none;
		padding: 0.5em 0.75em;
	}
</style>
