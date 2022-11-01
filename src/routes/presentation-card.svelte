<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte';
  import FloatingCard from '$lib/position/floating-card.svelte';
  import Thumbnail from '$lib/thumbnail.svelte';
  import GlowingButton from '$lib/glowing-button.svelte';
  import { createClickHandler } from '$lib/events/multi-click';
  import type { Handler } from '$lib/events/types';

  let card: SvelteComponent;
  let onclick: Handler;

  onMount(() => {
    onclick = createClickHandler(5, card.toggle);
  });
</script>

<FloatingCard bind:this={card} on:click={onclick} ref="presentation">
  <Thumbnail src="/profile.jpg" alt="Profile" />

  <header class="p-4 mb-4">
    <h1 class="text-3xl font-bold">Hi, I'm Alessandro</h1>
    <h2 class="text-base font-semibold">Welcome to my personal page</h2>
  </header>
  <p>I'm Alessandro Candido, a PhD student in theoretical physics working in HEP.</p>

  <div class="flex w-full justify-end m-4 md:absolute md:w-max-w md:top-16 md:right-8">
    <GlowingButton label="Enter &rarr;" />
  </div>
</FloatingCard>

<style>
  :global([ref='presentation']) {
    margin: 1.5rem;
  }

  :global([ref='presentation'] .container) {
    padding: 1.5rem 3rem;

    background-color: white;
    border: black 2pt solid;
    border-radius: 1rem;
  }

  :global([ref='presentation']) :is(h1, h2, p) {
    margin: 0;
  }
</style>
