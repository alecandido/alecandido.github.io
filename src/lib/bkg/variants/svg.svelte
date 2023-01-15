<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  import type { SVG } from '../variants';
  import Vvvortex from './svg/vvvortex.svelte';

  export let variant: SVG;
  export let animate = true;

  let svg: ComponentType;

  onMount(async () => {
    if (variant === 'vvvortex') {
      svg = Vvvortex;
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
