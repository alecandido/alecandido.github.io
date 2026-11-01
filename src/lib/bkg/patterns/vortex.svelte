<script lang="ts">
  /* Dashed concentric rings, spinning in alternate directions (after fffuel's vvvortex). */
  let { animate = true }: { animate?: boolean } = $props();

  const rings = Array.from({ length: 12 }, (_, i) => {
    const n = 12 - i;
    const r = 70 * n;
    const width = 10 + n * 1.2;
    // Each ring is its own layer, sized to the ring itself.
    const R = r + width / 2 + 2;
    return {
      r,
      R,
      width,
      dash: `${30 + Math.random() * 60} ${30 + Math.random() * 60}`,
      rotate: Math.random() * 360,
      opacity: 0.08 + (n / 12) * 0.92,
      duration: 40 + i * 6,
      cw: i % 2 === 0
    };
  });
</script>

<div class="scene square" class:animate>
  {#each rings as ring, i (i)}
    <div
      class="layer"
      class:cw={ring.cw}
      style:animation-duration="{ring.duration}s"
      style:left="calc(50% - {ring.R} * var(--u))"
      style:top="calc(50% - {ring.R} * var(--u))"
      style:width="calc({2 * ring.R} * var(--u))"
      style:height="calc({2 * ring.R} * var(--u))"
    >
      <svg
        viewBox="{-ring.R} {-ring.R} {2 * ring.R} {2 * ring.R}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vx-{i}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--c-accent)" />
            <stop offset="1" stop-color="var(--c-second)" />
          </linearGradient>
        </defs>
        <circle
          r={ring.r}
          fill="none"
          stroke="url(#vx-{i})"
          stroke-linecap="round"
          stroke-width={ring.width}
          stroke-dasharray={ring.dash}
          opacity={ring.opacity}
          transform="rotate({ring.rotate})"
        />
      </svg>
    </div>
  {/each}
</div>

<style>
  .animate .layer {
    animation: spin linear infinite reverse;
  }
  .animate .layer.cw {
    animation-direction: normal;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
