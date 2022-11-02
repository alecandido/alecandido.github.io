<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  import reducedMotion from '$lib/preferences/reduced-motion';

  let animate = false;
  let content: ComponentType;
  let kind = 'svg';
  let variant = 'vvvortex';

  // access reducedMotion only on client, requires window
  onMount(async () => {
    if (kind === 'svg') {
      content = (await import(`./variants/svg.svelte`)).default;
    } else if (kind === 'video') {
      content = (await import(`./variants/video.svelte`)).default;
    }
    // reactive statements only works in top scope, so to be reactive I need to
    // subscribe
    reducedMotion.subscribe((value) => {
      animate = !value;
    });
  });
</script>

<svelte:component this={content} {animate} {variant} />
