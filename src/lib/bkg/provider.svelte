<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  import reducedMotion from '$lib/preferences/reduced-motion';

  let animate = false;
  let content: ComponentType;
  export let kind: string;
  export let variant: string;

  async function pick(kind: string, variant: string) {
    if (kind === 'svg') {
      content = (await import(`./variants/svg.svelte`)).default;
    } else if (kind === 'video') {
      content = (await import(`./variants/video.svelte`)).default;
    }
  }

  // access reducedMotion only on client, requires window
  onMount(async () => {
    await pick(kind, variant);
    // reactive statements only works in top scope, so to be reactive I need to
    // subscribe
    reducedMotion.subscribe((value) => {
      animate = !value;
    });
  });

  $: pick(kind, variant);
</script>

<svelte:component this={content} {animate} {variant} />
