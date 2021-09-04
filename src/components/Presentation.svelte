<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Word from './Word.svelte';
	import Button from "./Button.svelte";

	export let content: string;

	let activeSlide: number = -1;
	let ready = false;
	let clean = true;
	let finished = false;
	let copied = false;
	const chime = new Audio('./an-important-announcement.mp3');
	const slides = window.atob(decodeURIComponent(content)).split('|');
	const previous = () => activeSlide--;
	const next = () => {
		clean = false;
		
		if (finished) return;
		
		activeSlide++;
		
		if (activeSlide === 0) chime.play();
		
		finished = activeSlide >= slides.length;
	};

	onMount(() => {
		ready = true;
		const actions = {
			ArrowLeft: previous,
			ArrowRight: next,
		}

		document.addEventListener('keydown', function (e) {
			const action = actions[e.code];
			
			if (action) action();
		});
	});

	const prepareSlides = (items = slides): string[][][] => {
		return items.map((sentence): string[][] => {
			const words: string[] = sentence.trim().split(' ');
			const numberOfWords: number = words.length;
			const midPoint: number = Math.ceil(numberOfWords / 2);
			const firstRow: string[] = words.slice(0, midPoint);
			const secondRow: string[] = words.slice(midPoint);

			return [firstRow, secondRow];
		});
	};
</script>

<div class="wrapper">
	{#if ready}
		<p class={`instructions ${clean ? 'show' : 'hide'}`}>Click, tap or ➡</p>
		{#each prepareSlides() as slide, slideNumber}
			<div class="slide">
				{#each slide as line, lineNumber}
					<div class="line">
						{#each line as word, wordNumber}
							<Word 
								position={wordNumber + lineNumber}
								isActive={activeSlide == slideNumber}
								seen={activeSlide > slideNumber}
								variant={lineNumber > 0}
							>
								{word}
							</Word>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	{/if}
</div>

{#if finished }
<div class="final">
	<p in:fade={{ delay: 1000 }} class="disclaimer"><b>Not</b> Authorised by the Victorian Government Melbourne</p>
	<div class="actions">
		<Button delay={2000} click={() => location.replace('/')}>Make your own</Button>
		<Button delay={2500} click={() => {
			if (!navigator.canShare) {
				navigator.clipboard.writeText(window.location.href);
				copied = true;
			} else {
				navigator.share({
				url: window.location.href,
				title: "An important message"
			});
			}
		}}>Share</Button>
	</div>
	<p class={`share ${copied && "copied"}`}>Share link has been copied to clipboard.</p>
</div>
{/if}
{#if !finished }
<button class="next-button" on:click={next}>Next</button>
{/if}

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Share+Tech&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Source+Sans+Pro:wght@600&display=swap');
	
	.wrapper {
		height: 100%;
		min-height: 100%;
		position: relative;
		text-align: center;
	}

	.instructions {
		text-transform: uppercase;
		color: #ddd;
		transition: opacity 0.3s;
	}
	.finished {
		position: relative;
		transition: opacity 2s 0.5s;
		text-transform: uppercase;
		color: #2b6ed2;
		opacity: 0;
		z-index: 1;
	}
	.disclaimer {
		font-size: 1rem;
	}
	.show {
		opacity: 1;
	}
	.hide {
		opacity: 0;
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
	.ready {
		transition: transform 1s ease-in-out;
	}
	.next-button {
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

	.button {
		animation: fadeIn 1s;
	}

	.final {
		display: block;
		width: 100%;
		text-align: center;
	}

	.share {
		font-size: 1rem;
		display: block;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.copied {
		opacity: 1;
	}
</style>
