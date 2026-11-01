<script lang="ts">
  /* Dashed concentric rings, spinning in alternate directions (after fffuel's vvvortex). */
  let { animate = true }: { animate?: boolean } = $props();

  const rings = Array.from({ length: 12 }, (_, i) => {
    const n = 12 - i;
    return {
      r: 70 * n,
      width: 10 + n * 1.2,
      dash: `${30 + Math.random() * 60} ${30 + Math.random() * 60}`,
      rotate: Math.random() * 360,
      opacity: 0.08 + (n / 12) * 0.92
    };
  });
  const hue = Math.round(Math.random() * 360);
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="-1000 -1000 2000 2000"
  preserveAspectRatio="xMidYMid slice"
  style:--hue={hue}
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="vx-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--c-accent)" />
      <stop offset="1" stop-color="var(--c-second)" />
    </linearGradient>
  </defs>
  <rect x="-1000" y="-1000" width="2000" height="2000" fill="var(--c-bg)" />
  <g fill="none" stroke="url(#vx-grad)" stroke-linecap="round">
    {#each rings as ring, i (i)}
      <g class="ring" class:cw={i % 2 === 0} style:animation-duration="{40 + i * 6}s">
        <circle
          r={ring.r}
          stroke-width={ring.width}
          stroke-dasharray={ring.dash}
          opacity={ring.opacity}
          transform="rotate({ring.rotate})"
        />
      </g>
    {/each}
  </g>
</svg>

<style>
  .ring {
    transform-origin: 0 0;
    transform-box: view-box;
  }
  .animate .ring {
    animation: spin linear infinite reverse;
    will-change: transform;
  }
  .animate .ring.cw {
    animation-direction: normal;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
