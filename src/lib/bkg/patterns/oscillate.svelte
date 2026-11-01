<script lang="ts">
  /* Stacked sine waves drifting sideways (after fffuel's oooscillate). */
  let { animate = true }: { animate?: boolean } = $props();

  const WAVELENGTH = 400;
  const WAVES = 22;
  // The canvas is 1600 units wide; each wave covers [-800, 2400], so that a
  // drift by one wavelength in either direction never shows an end.
  const X0 = -800;
  const PERIODS = 8;

  function wave(amplitude: number, phase: number) {
    const q = WAVELENGTH / 4;
    let d = `M ${X0 + phase} 0`;
    for (let i = 0; i < PERIODS; i++) {
      const x = X0 + phase + i * WAVELENGTH;
      d += ` C ${x + q} ${-amplitude} ${x + q} ${-amplitude} ${x + 2 * q} 0`;
      d += ` C ${x + 3 * q} ${amplitude} ${x + 3 * q} ${amplitude} ${x + 4 * q} 0`;
    }
    return d;
  }

  const lines = Array.from({ length: WAVES }, (_, i) => {
    const amplitude = 18 + i * 2.2;
    const width = 2 + (i % 4);
    // Each wave is a thin horizontal band, its own layer.
    const half = amplitude + width / 2 + 2;
    return {
      y: 60 + (i * 1000) / WAVES,
      half,
      d: wave(amplitude, (i * 37) % WAVELENGTH),
      width,
      duration: 18 + (i % 5) * 4,
      reverse: i % 3 === 0
    };
  });
  const SPAN = PERIODS * WAVELENGTH;
</script>

<div class="scene wide" class:animate>
  {#each lines as line, i (i)}
    <div
      class="layer"
      class:reverse={line.reverse}
      style:animation-duration="{line.duration}s"
      style:left="calc(50% + {X0 - 800} * var(--u))"
      style:top="calc(50% + {line.y - 500 - line.half} * var(--u))"
      style:width="calc({SPAN} * var(--u))"
      style:height="calc({2 * line.half} * var(--u))"
    >
      <svg viewBox="{X0} {-line.half} {SPAN} {2 * line.half}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="os-{i}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="var(--c-second)" />
            <stop offset="1" stop-color="var(--c-accent)" />
          </linearGradient>
        </defs>
        <path
          d={line.d}
          fill="none"
          stroke="url(#os-{i})"
          stroke-linecap="round"
          stroke-width={line.width}
          opacity="0.85"
        />
      </svg>
    </div>
  {/each}
</div>

<style>
  .animate .layer {
    animation: drift linear infinite;
  }
  .animate .layer.reverse {
    animation-direction: reverse;
  }
  @keyframes drift {
    to {
      transform: translateX(calc(400 * var(--u)));
    }
  }
</style>
