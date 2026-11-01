<script lang="ts">
  /* Soft drifting colour fields, gradients only, no filters (after fffuel's ffflux). */
  let { animate = true }: { animate?: boolean } = $props();

  // Each blob is its own layer, sized to the gradient's reach.
  const blobs = [
    { cx: 300, cy: 300, r: 520, color: 'var(--c-accent)', duration: 26, delay: 0 },
    { cx: 1300, cy: 250, r: 460, color: 'var(--c-second)', duration: 31, delay: -9 },
    { cx: 900, cy: 800, r: 560, color: 'var(--c-accent)', duration: 37, delay: -17 },
    { cx: 200, cy: 900, r: 420, color: 'var(--c-second)', duration: 29, delay: -4 },
    { cx: 1450, cy: 850, r: 480, color: 'var(--c-raised)', duration: 41, delay: -22 }
  ];
</script>

<div class="scene wide" class:animate>
  {#each blobs as b, i (i)}
    <div
      class="layer"
      style:animation-duration="{b.duration}s"
      style:animation-delay="{b.delay}s"
      style:left="calc(50% + {b.cx - 800 - b.r} * var(--u))"
      style:top="calc(50% + {b.cy - 500 - b.r} * var(--u))"
      style:width="calc({2 * b.r} * var(--u))"
      style:height="calc({2 * b.r} * var(--u))"
    >
      <svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fx-{i}">
            <stop offset="0" stop-color={b.color} stop-opacity="0.9" />
            <stop offset="0.55" stop-color={b.color} stop-opacity="0.35" />
            <stop offset="1" stop-color={b.color} stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle r="1" fill="url(#fx-{i})" />
      </svg>
    </div>
  {/each}
</div>

<style>
  .animate .layer {
    animation: wander ease-in-out infinite alternate;
  }
  @keyframes wander {
    0% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(calc(160 * var(--u)), calc(-90 * var(--u))) scale(1.15);
    }
    66% {
      transform: translate(calc(-120 * var(--u)), calc(140 * var(--u))) scale(0.9);
    }
    100% {
      transform: translate(calc(90 * var(--u)), calc(60 * var(--u))) scale(1.08);
    }
  }
</style>
