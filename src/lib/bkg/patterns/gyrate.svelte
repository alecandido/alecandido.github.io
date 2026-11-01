<script lang="ts">
  /* Nested polygons spinning at different speeds (after fffuel's gggyrate). */
  let { animate = true }: { animate?: boolean } = $props();

  function polygon(sides: number, r: number) {
    return Array.from({ length: sides }, (_, i) => {
      const a = (i * 2 * Math.PI) / sides - Math.PI / 2;
      return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  }

  const sides = 3 + Math.floor(Math.random() * 4);
  const layers = Array.from({ length: 10 }, (_, i) => ({
    points: polygon(sides, 120 + i * 95),
    width: 3 + i,
    duration: 30 + i * 9,
    reverse: i % 2 === 1,
    color: i % 2 ? 'var(--c-accent)' : 'var(--c-second)',
    opacity: 1 - i * 0.07
  }));
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="-1000 -1000 2000 2000"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="-1000" y="-1000" width="2000" height="2000" fill="var(--c-bg)" />
  <g fill="none" stroke-linejoin="round">
    {#each layers as layer, i (i)}
      <g class="layer" class:reverse={layer.reverse} style:animation-duration="{layer.duration}s">
        <polygon
          points={layer.points}
          stroke={layer.color}
          stroke-width={layer.width}
          opacity={layer.opacity}
        />
      </g>
    {/each}
  </g>
</svg>

<style>
  .layer {
    transform-origin: 0 0;
    transform-box: view-box;
  }
  .animate .layer {
    animation: spin linear infinite;
    will-change: transform;
  }
  .animate .layer.reverse {
    animation-direction: reverse;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
