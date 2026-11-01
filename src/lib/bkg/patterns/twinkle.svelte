<script lang="ts">
  /* Bursting line stars, pulsing out of phase (after fffuel's tttwinkle). */
  let { animate = true }: { animate?: boolean } = $props();

  const RAYS = 12;
  // Each burst is its own small layer.
  const bursts = Array.from({ length: 11 }, (_, i) => {
    const r = 60 + ((i * 97) % 110);
    return {
      x: 120 + ((i * 457) % 1400),
      y: 90 + ((i * 683) % 840),
      r,
      R: r + 4,
      duration: 5 + (i % 4) * 1.5,
      delay: -(i * 1.3),
      color: i % 2 ? 'var(--c-accent)' : 'var(--c-second)'
    };
  });
  const rays = Array.from({ length: RAYS }, (_, i) => (i * 360) / RAYS);
</script>

<div class="scene wide" class:animate>
  {#each bursts as b, i (i)}
    <div
      class="layer"
      style:animation-duration="{b.duration}s"
      style:animation-delay="{b.delay}s"
      style:left="calc(50% + {b.x - 800 - b.R} * var(--u))"
      style:top="calc(50% + {b.y - 500 - b.R} * var(--u))"
      style:width="calc({2 * b.R} * var(--u))"
      style:height="calc({2 * b.R} * var(--u))"
    >
      <svg
        viewBox="{-b.R} {-b.R} {2 * b.R} {2 * b.R}"
        stroke={b.color}
        stroke-width="4"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {#each rays as angle (angle)}
          <line x1="0" y1={-b.r * 0.35} x2="0" y2={-b.r} transform="rotate({angle})" />
        {/each}
      </svg>
    </div>
  {/each}
</div>

<style>
  .animate .layer {
    animation: twinkle ease-in-out infinite;
    will-change: transform, opacity;
  }
  @keyframes twinkle {
    0%,
    100% {
      transform: scale(0.6) rotate(0deg);
      opacity: 0.25;
    }
    50% {
      transform: scale(1.1) rotate(15deg);
      opacity: 1;
    }
  }
</style>
