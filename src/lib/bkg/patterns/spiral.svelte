<script lang="ts">
  /* Two interleaved Archimedean spirals, slowly turning (after fffuel's ssspiral). */
  let { animate = true }: { animate?: boolean } = $props();

  function spiral(turns: number, spacing: number, phase: number) {
    const points: string[] = [];
    const steps = turns * 48;
    for (let i = 0; i <= steps; i++) {
      const t = (i / 48) * 2 * Math.PI + phase;
      const r = spacing * (t - phase);
      points.push(`${(r * Math.cos(t)).toFixed(1)},${(r * Math.sin(t)).toFixed(1)}`);
    }
    return 'M ' + points.join(' L ');
  }

  const arms = [
    { d: spiral(8, 28, 0), color: 'var(--c-accent)', width: 14 },
    { d: spiral(8, 28, Math.PI), color: 'var(--c-second)', width: 14 }
  ];
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="-1000 -1000 2000 2000"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="-1000" y="-1000" width="2000" height="2000" fill="var(--c-bg)" />
  <g class="arms" fill="none" stroke-linecap="round" opacity="0.9">
    {#each arms as arm, i (i)}
      <path d={arm.d} stroke={arm.color} stroke-width={arm.width} />
    {/each}
  </g>
</svg>

<style>
  .arms {
    transform-origin: 0 0;
    transform-box: view-box;
  }
  .animate .arms {
    animation: turn 90s linear infinite;
    will-change: transform;
  }
  @keyframes turn {
    to {
      transform: rotate(-360deg);
    }
  }
</style>
