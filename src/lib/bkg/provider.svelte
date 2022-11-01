<script>
  import { onMount } from 'svelte';
  import Content from './svg.svelte';
  /* import Video from './video.svelte'; */
  import reducedMotion from '$lib/preferences/reduced-motion';

  let animate = false;

  // access reducedMotion only on client, requires window
  onMount(() => {
    // reactive statements only works in top scope, so to be reactive I need to
    // subscribe
    reducedMotion.subscribe((value) => {
      animate = !value;
    });
  });
</script>

<svelte:component this={Content} {animate} />
