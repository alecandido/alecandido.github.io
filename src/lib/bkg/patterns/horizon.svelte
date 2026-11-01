<script lang="ts">
  /* Synthwave horizon: striped sun over a perspective grid (after fffuel's hhhorizon). */
  import { columnFeet, FLOOR, H, HORIZON, rowHeights, scroll, SUN, W } from './horizon.svelte.ts';

  let { animate = true }: { animate?: boolean } = $props();

  // The grid follows the scroll set by whoever walks on it (see home/wanderer).
  const rows = $derived(rowHeights(scroll.phase));
  const feet = $derived(columnFeet(scroll.shift));

  // Stripes cutting the sun, relative to its centre; one more than fits, so
  // that rising by one spacing is seamless.
  const STEP = 42;
  const stripes = Array.from({ length: 10 }, (_, i) => ({ y: -40 + i * STEP, h: 6 + i * 3.2 }));
</script>

<div class="scene wide" class:animate>
  <!-- Static part: sky, sun and floor. -->
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
    </defs>

    <rect width={W} height={H} fill="url(#hz-sky)" />
    <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill="url(#hz-sun)" />
    <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill="var(--c-bg)" />
  </svg>

  <!-- Floor grid: every line is its own thin layer, hanging from the horizon,
       so that the floor can scroll without redrawing anything. -->
  <div class="grid" style:--horizon="calc(50% + {HORIZON - H / 2} * var(--u))">
    {#each feet as foot, i (i)}
      <div
        class="layer column"
        style:transform="rotate({Math.atan2(foot, FLOOR.foot - HORIZON)}rad)"
      ></div>
    {/each}
    {#each rows as y, i (i)}
      <div class="layer row" style:transform="translateY(calc({y - HORIZON} * var(--u)))"></div>
    {/each}
  </div>

  <!-- Stripes: a layer clipped to the sun, sliding upwards. -->
  <div
    class="sun"
    style:left="calc(50% + {SUN.x - W / 2 - SUN.r} * var(--u))"
    style:top="calc(50% + {SUN.y - H / 2 - SUN.r} * var(--u))"
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
    style:top="calc(50% + {HORIZON - H / 2 - 3} * var(--u))"
    style:width="100%"
    style:height="calc(6 * var(--u))"
  ></div>
</div>

<style>
  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.6;
  }
  .grid .layer {
    top: var(--horizon);
    background: var(--c-second);
    will-change: transform;
  }
  .row {
    left: 0;
    width: 100%;
    height: calc(2 * var(--u));
  }
  .column {
    left: calc(50% - 1 * var(--u));
    width: calc(2 * var(--u));
    height: calc(1800 * var(--u));
    transform-origin: 50% 0;
  }
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
