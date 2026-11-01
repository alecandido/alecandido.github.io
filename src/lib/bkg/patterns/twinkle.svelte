<script lang="ts">
  /* Bursting line stars, pulsing out of phase (after fffuel's tttwinkle). */
  let { animate = true }: { animate?: boolean } = $props();

  const RAYS = 12;
  const bursts = Array.from({ length: 11 }, (_, i) => ({
    x: 120 + ((i * 457) % 1400),
    y: 90 + ((i * 683) % 840),
    r: 60 + ((i * 97) % 110),
    duration: 5 + (i % 4) * 1.5,
    delay: -(i * 1.3),
    color: i % 2 ? 'var(--c-accent)' : 'var(--c-second)'
  }));
  const rays = Array.from({ length: RAYS }, (_, i) => (i * 360) / RAYS);
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="0 0 1600 1000"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="1600" height="1000" fill="var(--c-bg)" />
  {#each bursts as b, i (i)}
    <g
      class="burst"
      style:animation-duration="{b.duration}s"
      style:animation-delay="{b.delay}s"
      style:transform-origin="{b.x}px {b.y}px"
      stroke={b.color}
      stroke-width="4"
      stroke-linecap="round"
    >
      {#each rays as angle (angle)}
        <line
          x1={b.x}
          y1={b.y - b.r * 0.35}
          x2={b.x}
          y2={b.y - b.r}
          transform="rotate({angle} {b.x} {b.y})"
        />
      {/each}
    </g>
  {/each}
</svg>

<style>
  .burst {
    transform-box: view-box;
  }
  .animate .burst {
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
