<script lang="ts">
  /* Synthwave horizon: striped sun over a perspective grid (after fffuel's hhhorizon). */
  let { animate = true }: { animate?: boolean } = $props();

  const W = 1600;
  const H = 1000;
  const HORIZON = 560;
  const VANISH = { x: W / 2, y: HORIZON };

  // Floor lines: perspective spacing, denser near the horizon.
  const rows = Array.from({ length: 14 }, (_, i) => HORIZON + 440 * Math.pow((i + 1) / 14, 2.2));
  // Converging verticals.
  const columns = Array.from({ length: 21 }, (_, i) => -W + (i * 2 * W) / 20 + W / 2);
  // Stripes cutting the sun.
  const stripes = Array.from({ length: 9 }, (_, i) => ({ y: -40 + i * 42, h: 6 + i * 3.2 }));
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="0 0 {W} {H}"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="hz-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--c-bg)" />
      <stop offset="1" stop-color="var(--c-raised)" />
    </linearGradient>
    <linearGradient id="hz-sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--c-accent)" />
      <stop offset="1" stop-color="var(--c-second)" />
    </linearGradient>
    <clipPath id="hz-sun-clip">
      <circle cx={W / 2} cy={HORIZON - 60} r="260" />
    </clipPath>
    <clipPath id="hz-floor-clip">
      <rect x="0" y={HORIZON} width={W} height={H - HORIZON} />
    </clipPath>
  </defs>

  <rect width={W} height={H} fill="url(#hz-sky)" />

  <g clip-path="url(#hz-sun-clip)">
    <rect x={W / 2 - 260} y={HORIZON - 320} width="520" height="520" fill="url(#hz-sun)" />
    <g class="stripes" fill="var(--c-bg)">
      {#each stripes as s, i (i)}
        <rect x={W / 2 - 300} y={HORIZON - 60 + s.y} width="600" height={s.h} />
      {/each}
    </g>
  </g>

  <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill="var(--c-bg)" />
  <g clip-path="url(#hz-floor-clip)" stroke="var(--c-second)" stroke-width="2" opacity="0.6">
    {#each columns as x, i (i)}
      <line x1={VANISH.x} y1={VANISH.y} x2={x} y2={H + 200} />
    {/each}
    <g class="rows">
      {#each rows as y, i (i)}
        <line x1="0" y1={y} x2={W} y2={y} />
      {/each}
    </g>
  </g>
  <line
    class="glow"
    x1="0"
    y1={HORIZON}
    x2={W}
    y2={HORIZON}
    stroke="var(--c-accent)"
    stroke-width="3"
  />
</svg>

<style>
  .animate .stripes {
    animation: rise 6s linear infinite;
    will-change: transform;
  }
  .animate .glow {
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes rise {
    to {
      transform: translateY(-42px);
    }
  }
  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
</style>
