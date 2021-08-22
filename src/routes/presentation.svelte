<script lang="ts">
	import { onMount } from 'svelte';
	let activeSlide: number = 0;
	export let content;

	const slides = decodeURI(content).split('|');

	const previous = () => activeSlide--;
	const next = () => activeSlide++;

	onMount(() => {
		document.addEventListener('keydown', function (e) {
			switch (e.keyCode) {
				case 37:
					previous();
					break;
				case 39:
					next();
					break;
			}
		});
	});

	const prepareSlides = (items = slides): string[][][] => {
		return items.map((sentence): string[][] => {
			const words: string[] = sentence.split(' ');
			const numberOfWords: number = words.length;
			const midPoint: number = Math.ceil(numberOfWords / 2);
			const firstRow: string[] = words.slice(0, midPoint);
			const secondRow: string[] = words.slice(midPoint);

			return [firstRow, secondRow];
		});
	};
</script>

<div class="wrapper">
	{#each prepareSlides() as slide, slideNumber}
		<div class="slide">
			{#each slide as line, lineNumber}
				<div class="line">
					{#each line as word, wordNumber}
						<div
							class={`
							word-${wordNumber + lineNumber}
							word 
							${activeSlide == slideNumber ? 'active' : ''} 
							${activeSlide > slideNumber ? 'done' : ''}
						`}
						>
							{word}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</div>

<button on:click={next}>Next</button>

<style lang="scss">
	@use "sass:math";
	@import url('https://fonts.googleapis.com/css2?family=Share+Tech&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Source+Sans+Pro:wght@600&display=swap');
	:global(html) {
		height: 100%;
		min-height: 100%;
		font-size: 3.5vw;
	}
	:global(body) {
		height: 100%;
		min-height: 100%;
		font-size: 5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Share Tech', sans-serif;
	}

	.wrapper {
		height: 100%;
		min-height: 100%;
		position: relative;
	}

	.slide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.line {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.word {
		flex-grow: 0;
		display: inline-flex;
		justify-content: center;
		padding: 0.175em 0.25em 0.15em;
		line-height: 1;
		color: white;
		text-transform: uppercase;
		margin: 0.1em;
		background-color: #2b6ed2;
		border-radius: 0.05em;
		animation: slide-in 1s;
		transition: transform 1s ease-in-out;
		transform: translateX(100vw);
	}

	.line:nth-child(1) .word {
		background-color: #0bacff;
	}

	@for $line from 0 through 1 {
		@for $word from 0 through 10 {
			.word-#{$line + $word} {
				transition-delay: 0.05s + math.div($word + $line, 20);
			}
		}
	}
	.active {
		transform: translateX(0);
	}

	.done {
		transform: translateX(-100vw);
	}

	button {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background: none;
		border: none;
		opacity: 0;
	}
</style>
