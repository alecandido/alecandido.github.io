<script lang="ts">
  import type { Video } from './catalog.js';

  let { video, animate = true }: { video: Video; animate?: boolean } = $props();

  let ready = $state(false);
  const base = $derived(`/bkg/${video.id}`);
</script>

<!--
  The poster (a ~30 KB WebP) paints immediately; the clip fades in over it
  once it can play. With reduced motion only the poster is shown.
-->
<div class="absolute inset-0 overflow-hidden bg-bg">
  <img src="{base}.webp" alt="" class="cover" decoding="async" fetchpriority="high" />
  {#if animate}
    <video
      class="cover transition-opacity duration-700"
      class:opacity-0={!ready}
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      preload="auto"
      poster="{base}.webp"
      oncanplay={() => (ready = true)}
    >
      <source src="{base}.webm" type="video/webm" />
      <source src="{base}.mp4" type="video/mp4" />
    </video>
  {/if}
</div>

<style>
  .cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
