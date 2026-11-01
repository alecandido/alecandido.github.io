<script lang="ts">
  /* Synthwave horizon: striped sun over a perspective grid (after fffuel's hhhorizon). */
  import { DEPTH, H, HORIZON, SUN, W } from './horizon.js';

  let { animate = true }: { animate?: boolean } = $props();

  const VANISH = { x: W / 2, y: HORIZON };

  // Floor lines: perspective spacing, denser near the horizon.
  const rows = Array.from({ length: 14 }, (_, i) => HORIZON + DEPTH * Math.pow((i + 1) / 14, 2.2));
  // Converging verticals.
  const columns = Array.from({ length: 21 }, (_, i) => -W + (i * 2 * W) / 20 + W / 2);
  // Stripes cutting the sun, relative to its centre; one more than fits, so
  // that rising by one spacing is seamless.
  const STEP = 42;
  const stripes = Array.from({ length: 10 }, (_, i) => ({ y: -40 + i * STEP, h: 6 + i * 3.2 }));
</script>

<div class="scene wide" class:animate>
  <!-- Static part: sky, sun, floor and grid. -->
  <svg
    class="base"
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
      <clipPath id="hz-floor-clip">
        <rect x="0" y={HORIZON} width={W} height={H - HORIZON} />
      </clipPath>
    </defs>

    <rect width={W} height={H} fill="url(#hz-sky)" />
    <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill="url(#hz-sun)" />
    <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill="var(--c-bg)" />
    <g clip-path="url(#hz-floor-clip)" stroke="var(--c-second)" stroke-width="2" opacity="0.6">
      {#each columns as x, i (i)}
        <line x1={VANISH.x} y1={VANISH.y} x2={x} y2={H + 200} />
      {/each}
      {#each rows as y, i (i)}
        <line x1="0" y1={y} x2={W} y2={y} />
      {/each}
    </g>
  </svg>

  <!-- Stripes: a layer clipped to the sun, sliding upwards. -->
  <div
    class="sun"
    style:left="calc(50% + {SUN.x - 800 - SUN.r} * var(--u))"
    style:top="calc(50% + {SUN.y - 500 - SUN.r} * var(--u))"
    style:width="calc({2 * SUN.r} * var(--u))"
    style:height="calc({2 * SUN.r} * var(--u))"
  >
    <div class="layer stripes">
      <svg viewBox="{-SUN.r} {-SUN.r} {2 * SUN.r} {2 * SUN.r}" xmlns="http://www.w3.org/2000/svg">
        <g fill="var(--c-bg)">
          {#each stripes as s, i (i)}
            <rect x={-SUN.r - 40} y={s.y} width={2 * SUN.r + 80} height={s.h} />
          {/each}
        </g>
      </svg>
    </div>
  </div>

  <!-- Horizon line, pulsing. -->
  <div
    class="layer glow"
    style:left="0"
    style:top="calc(50% + {HORIZON - 500 - 3} * var(--u))"
    style:width="100%"
    style:height="calc(6 * var(--u))"
  ></div>
</div>

<style>
  .sun {
    position: absolute;
    clip-path: circle(50%);
  }
  .stripes {
    inset: 0;
  }
  .glow {
    background: var(--c-accent);
  }
  .animate .stripes {
    animation: rise 6s linear infinite;
  }
  .animate .glow {
    animation: pulse 3s ease-in-out infinite;
    will-change: opacity;
  }
  @keyframes rise {
    to {
      transform: translateY(calc(-42 * var(--u)));
    }
  }
  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
</style>
