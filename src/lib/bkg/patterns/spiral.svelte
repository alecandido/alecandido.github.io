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

  // One square layer, large enough to keep covering the corners while it turns
  // (sqrt(2) of the longest viewport side).
  const R = 1420;
</script>

<div class="scene square" class:animate>
  <div
    class="layer"
    style:left="calc(50% - {R} * var(--u))"
    style:top="calc(50% - {R} * var(--u))"
    style:width="calc({2 * R} * var(--u))"
    style:height="calc({2 * R} * var(--u))"
  >
    <svg viewBox="{-R} {-R} {2 * R} {2 * R}" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-linecap="round" opacity="0.9">
        {#each arms as arm, i (i)}
          <path d={arm.d} stroke={arm.color} stroke-width={arm.width} />
        {/each}
      </g>
    </svg>
  </div>
</div>

<style>
  .animate .layer {
    animation: turn 90s linear infinite;
  }
  @keyframes turn {
    to {
      transform: rotate(-360deg);
    }
  }
</style>
