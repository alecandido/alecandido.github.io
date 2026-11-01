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
  const layers = Array.from({ length: 10 }, (_, i) => {
    const r = 120 + i * 95;
    const width = 3 + i;
    return {
      points: polygon(sides, r),
      R: r + width,
      width,
      duration: 30 + i * 9,
      reverse: i % 2 === 1,
      color: i % 2 ? 'var(--c-accent)' : 'var(--c-second)',
      opacity: 1 - i * 0.07
    };
  });
</script>

<div class="scene square" class:animate>
  {#each layers as layer, i (i)}
    <div
      class="layer"
      class:reverse={layer.reverse}
      style:animation-duration="{layer.duration}s"
      style:left="calc(50% - {layer.R} * var(--u))"
      style:top="calc(50% - {layer.R} * var(--u))"
      style:width="calc({2 * layer.R} * var(--u))"
      style:height="calc({2 * layer.R} * var(--u))"
    >
      <svg
        viewBox="{-layer.R} {-layer.R} {2 * layer.R} {2 * layer.R}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={layer.points}
          fill="none"
          stroke={layer.color}
          stroke-width={layer.width}
          stroke-linejoin="round"
          opacity={layer.opacity}
        />
      </svg>
    </div>
  {/each}
</div>

<style>
  .animate .layer {
    animation: spin linear infinite;
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
