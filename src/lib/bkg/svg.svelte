<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';

  export let animate = true;

  let svg: ComponentType;

  onMount(async () => {
    svg = (await import('./vvvortex.svelte')).default;
  });
</script>

<svelte:component this={svg} {animate} />

<style>
  * {
    position: absolute;
    width: 200%;
    height: 200%;
    left: 100%;
  }
</style>
