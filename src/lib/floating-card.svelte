<script lang="ts">
  import drag from '$lib/drag';
  import { onMount } from 'svelte';

  let card: HTMLElement;

  onMount(() => {
    drag(card);
  });
</script>

<article>
  <div bind:this={card}>
    <slot />
  </div>
</article>

<style>
  article div {
    position: relative;
    top: 0;
    left: 0;

    max-width: max-content;
    padding: 1.5rem 3rem;
    margin: 1.5rem;

    background-color: white;

    border: black 2pt solid;
    border-radius: 1rem;
  }

  article div :global(:is(h1, h2, p)) {
    margin: 0;
  }
</style>
