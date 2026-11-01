<script lang="ts">
  /* Soft drifting colour fields, gradients only, no filters (after fffuel's ffflux). */
  let { animate = true }: { animate?: boolean } = $props();

  const blobs = [
    { cx: 300, cy: 300, r: 520, color: 'var(--c-accent)', duration: 26, delay: 0 },
    { cx: 1300, cy: 250, r: 460, color: 'var(--c-second)', duration: 31, delay: -9 },
    { cx: 900, cy: 800, r: 560, color: 'var(--c-accent)', duration: 37, delay: -17 },
    { cx: 200, cy: 900, r: 420, color: 'var(--c-second)', duration: 29, delay: -4 },
    { cx: 1450, cy: 850, r: 480, color: 'var(--c-raised)', duration: 41, delay: -22 }
  ];
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="0 0 1600 1000"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    {#each blobs as b, i (i)}
      <radialGradient id="fx-{i}">
        <stop offset="0" stop-color={b.color} stop-opacity="0.9" />
        <stop offset="0.55" stop-color={b.color} stop-opacity="0.35" />
        <stop offset="1" stop-color={b.color} stop-opacity="0" />
      </radialGradient>
    {/each}
  </defs>
  <rect width="1600" height="1000" fill="var(--c-bg)" />
  {#each blobs as b, i (i)}
    <g
      class="blob"
      style:animation-duration="{b.duration}s"
      style:animation-delay="{b.delay}s"
      style:transform-origin="{b.cx}px {b.cy}px"
    >
      <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#fx-{i})" />
    </g>
  {/each}
</svg>

<style>
  .blob {
    transform-box: view-box;
  }
  .animate .blob {
    animation: wander ease-in-out infinite alternate;
    will-change: transform;
  }
  @keyframes wander {
    0% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(160px, -90px) scale(1.15);
    }
    66% {
      transform: translate(-120px, 140px) scale(0.9);
    }
    100% {
      transform: translate(90px, 60px) scale(1.08);
    }
  }
</style>
