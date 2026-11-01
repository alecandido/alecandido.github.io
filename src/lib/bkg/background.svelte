<script module lang="ts">
  function choiceId(c: Choice) {
    return c.kind === 'video' ? `video:${c.video.id}` : `pattern:${c.pattern.id}`;
  }

  /** `?bkg=pattern:spiral` or `?bkg=video:lava` forces a background, for checking them. */
  function forced(): Choice | undefined {
    const id = new URLSearchParams(location.search).get('bkg');
    if (!id) return;
    const pattern = patterns.find((p) => `pattern:${p.id}` === id);
    if (pattern) return { kind: 'pattern', pattern };
    const video = videos.find((v) => `video:${v.id}` === id);
    if (video) return { kind: 'video', video };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';
  import { patterns, pick, videos, type Choice } from './catalog.js';
  import Video from './video.svelte';
  import { reducedMotion } from '#lib/preferences/reduced-motion.svelte.ts';
  import './patterns/scene.css';

  /** The background is chosen on the client, so every visit gets a new one. */
  let choice: Choice | undefined = $state();
  let Pattern: Component<{ animate: boolean }> | undefined = $state();

  const animate = $derived(!reducedMotion.current);

  onMount(async () => {
    const c = forced() ?? pick();
    choice = c;
    if (c.kind === 'pattern') Pattern = (await c.pattern.load()).default;
  });
</script>

<div
  class="fixed inset-0 -z-10"
  aria-hidden="true"
  data-background={choice ? choiceId(choice) : ''}
>
  {#if choice?.kind === 'video'}
    <Video video={choice.video} {animate} />
  {:else if Pattern}
    <Pattern {animate} />
  {/if}
</div>
