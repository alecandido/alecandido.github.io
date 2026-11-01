<script lang="ts">
  import Background from '#lib/bkg/background.svelte';
  import type { Choice } from '#lib/bkg/catalog.js';
  import Card from '#lib/home/card.svelte';
  import Wanderer from '#lib/home/wanderer.svelte';
  import Switcher from '#lib/theme/switcher.svelte';

  let background: Choice | undefined = $state();
  let dismissed = $state(false);

  /** Dismissing the card over the horizon leaves someone behind. */
  const wander = $derived(
    dismissed && background?.kind === 'pattern' && background.pattern.id === 'horizon'
  );
</script>

<svelte:head>
  <title>Alessandro Candido</title>
  <meta name="description" content="Alessandro Candido, physicist and quantum software engineer." />
</svelte:head>

<Background onchoice={(choice) => (background = choice)} />

<nav class="fixed top-4 right-4 z-20">
  <Switcher />
</nav>

<main class="min-h-dvh w-full flex items-center justify-center overflow-hidden">
  <Card onhide={() => (dismissed = true)} />
</main>

{#if wander}
  <Wanderer />
{/if}
