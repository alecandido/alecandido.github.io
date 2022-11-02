<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  import type { SVG } from '../variants';

  export let variant: SVG;
  export let animate = true;

  let svg: ComponentType;

  onMount(async () => {
    if (variant === 'vvvortex') {
      svg = (await import(`./svg/vvvortex.svelte`)).default;
    }
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
