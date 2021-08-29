<script lang="ts">
  export let position: number;
  export let isActive: boolean;
  export let seen: boolean;
  export let variant: boolean;
</script>

<div
  class={
    `word word-${position}
    ${isActive ? 'active' : ''} 
    ${seen ? 'done' : ''}
    ${variant ? 'alternate' : ''}
  `}>
  <slot></slot>
</div>

<style lang="scss">
  @use "sass:math";

  .word {
		flex-grow: 0;
		justify-content: center;
		padding: 0.175em 0.25em 0.15em;
		line-height: 1;
		color: white;
    display: inline-block;
		text-transform: uppercase;
		margin: 0.1em;
		background-color: #2b6ed2;
		border-radius: 0.02em;
		animation: slide-in 1s;
		transform: translateX(100vw);

    @for $line from 0 through 1 {
      @for $word from 0 through 10 {
        &-#{$line + $word} {
          transition: transform 1s ease-in-out;
          transition-delay: 0.05s + math.div($word + $line, 20);
        }
      }
    }
	}

  .alternate {
		background-color: #0bacff;
	}

  .active {
		transform: translateX(0);
	}

	.done {
		transition: transform 1s ease-in-out;
		transform: translateX(-100vw);
	}
</style>