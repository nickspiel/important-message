<script lang="ts">
	let input: string = '';

	const update = () => {
		const newLinesReplaced = input.replace(/\n/g, '|');
		const encodedInput = encodeURIComponent(window.btoa(newLinesReplaced));

		if (history.pushState) {
			var newurl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				`?content=${encodedInput}`;
			window.history.pushState({ path: newurl }, '', newurl);
		}
	};

	const focus = (element) => element.focus();
</script>

<div class="wrapper">
	<textarea use:focus bind:value={input} on:input={update} />
	<button on:click={() => location.reload()}>Present Deck</button>
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
		width: 95vw;
		height: 95vh;
		text-transform: uppercase;
		white-space: break-spaces;
		border: none;
		box-sizing: border-box;
		padding: 3vw;
	}
	button {
		position: fixed;
		bottom: 1vw;
		right: 1vw;
		text-transform: uppercase;
		font-size: 0.5rem;
		background-color: red;
		color: white;
		border-radius: 0.05em;
		border: none;
		padding: 0.5em 0.75em;
		background-color: #2b6ed2;
		&:hover {
			background-color: #0bacff;
		}
	}
</style>
