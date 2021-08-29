<script lang="ts">
import Word from "./word.svelte";


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
	<div class="header">
		<div><Word isActive={true}>Important</Word></div>
		<div class="inset"><Word isActive={true} variant={true}>Announcement</Word></div>
	</div>
	<textarea use:focus bind:value={input} on:input={update}
		placeholder={`An important announcement from you\nEach line is a new slide`}
		/>
	<button on:click={() => location.reload()}>Present Deck</button>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		height: 100vh;
	}
	.header {
		margin: 0.5rem 0;
	}
	.inset {
		margin-left: 2rem;
	}
	textarea {
		font-size: 2vw;
		width: 95vw;
		height: 50vh;
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
