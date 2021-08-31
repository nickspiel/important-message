<script lang="ts">
	import Word from "./Word.svelte";
	import Button from "./Button.svelte";
	
	let input: string = '';

	const encodedContent = (content) => {
		const newLinesReplaced = input.replace(/\n/g, '|');

		return encodeURIComponent(window.btoa(newLinesReplaced));
	}

	const update = () => {
		if (history.pushState) {
			var newurl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				`?content=${encodedContent(input)}`;
			window.history.pushState({ path: newurl }, '', newurl);
		}
	};

	const focus = (element) => element.focus();
</script>

<div class="wrapper">
	<a href="https://github.com/nickspiel/important-announcement"><img class="github-logo" src="../../static/github.svg" alt="github" /></a>
	<div class="header">
		<div><Word isActive={true}>Important</Word></div>
		<div class="inset"><Word isActive={true} variant={true}>Announcement</Word></div>
	</div>
	<textarea use:focus bind:value={input} on:input={update}
		placeholder={`An important announcement from you\nEach line is a new slide`}
		/>
	<Button click={() => { location.reload() }} className="">Present Deck</Button>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		height: 100vh;
	}

	.github-logo {
		display: none;
		position: fixed;
		width: 3vw;
		height: 3vw;
		min-width: 1rem;
		min-height: 1rem;
		bottom: 1rem;
		left: 1rem;
		opacity: 0.2;
		transition: opacity 0.3s;

		@media (min-width: 600px) {
			display: block;
		}

		&:hover {
			opacity: 0.5;
		}
	}

	.header {
		margin: 0.5rem 0;
		font-size: 1.75rem;
	}

	.inset {
		margin-left: 2rem;
	}

	textarea {
		flex-grow: 1;
		font-size: 5vw;
		width: 95vw;
		text-transform: uppercase;
		white-space: break-spaces;
		border: none;
		box-sizing: border-box;
		padding: 1em;
		line-height: 1.5;

		@media (min-height: 600px) {
			height: 60vh;
		}

		@media (min-width: 600px) {
			font-size: 3vw;
		}

		@media (min-width: 800px) {
			font-size: 2vw;
		}
	}
</style>
