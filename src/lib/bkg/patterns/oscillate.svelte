<script lang="ts">
  /* Stacked sine waves drifting sideways (after fffuel's oooscillate). */
  let { animate = true }: { animate?: boolean } = $props();

  const WAVELENGTH = 400;
  const WAVES = 22;
  // Two wavelengths plus one extra, so a translate by one wavelength is seamless.
  const PERIODS = 7;

  function wave(amplitude: number, phase: number) {
    const q = WAVELENGTH / 4;
    let d = `M ${-WAVELENGTH + phase} 0`;
    for (let i = 0; i < PERIODS; i++) {
      const x = -WAVELENGTH + phase + i * WAVELENGTH;
      d += ` C ${x + q} ${-amplitude} ${x + q} ${-amplitude} ${x + 2 * q} 0`;
      d += ` C ${x + 3 * q} ${amplitude} ${x + 3 * q} ${amplitude} ${x + 4 * q} 0`;
    }
    return d;
  }

  const lines = Array.from({ length: WAVES }, (_, i) => ({
    y: 60 + (i * 1000) / WAVES,
    d: wave(18 + i * 2.2, (i * 37) % WAVELENGTH),
    width: 2 + (i % 4),
    duration: 18 + (i % 5) * 4,
    reverse: i % 3 === 0
  }));
</script>

<svg
  class="w-full h-full"
  class:animate
  viewBox="0 0 1600 1000"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="os-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--c-second)" />
      <stop offset="1" stop-color="var(--c-accent)" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="var(--c-bg)" />
  <g fill="none" stroke="url(#os-grad)" stroke-linecap="round">
    {#each lines as line, i (i)}
      <g class="wave" class:reverse={line.reverse} style:animation-duration="{line.duration}s">
        <path
          d={line.d}
          transform="translate(0 {line.y})"
          stroke-width={line.width}
          opacity="0.85"
        />
      </g>
    {/each}
  </g>
</svg>

<style>
  .animate .wave {
    animation: drift linear infinite;
    will-change: transform;
  }
  .animate .wave.reverse {
    animation-direction: reverse;
  }
  @keyframes drift {
    to {
      transform: translateX(400px);
    }
  }
</style>
