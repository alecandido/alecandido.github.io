<script lang="ts">
  import Background from '#lib/bkg/background.svelte';
  import Card from '#lib/home/card.svelte';
  import Switcher from '#lib/theme/switcher.svelte';
</script>

<svelte:head>
  <title>Alessandro Candido</title>
  <meta name="description" content="Alessandro Candido, physicist and quantum software engineer." />
</svelte:head>

<Background />

<nav class="fixed top-4 right-4 z-20">
  <Switcher />
</nav>

<main class="min-h-dvh w-full flex items-center justify-center overflow-hidden">
  <Card />
</main>
