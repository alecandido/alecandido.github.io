<script lang="ts">
  /*
   * Easter egg. When the card is dismissed over the horizon, a small wanderer
   * is left standing on the floor grid: arrows (or WASD) walk it around the
   * plane, space makes it hop. The floor is the one drawn by the horizon
   * pattern, so the figure shrinks and slows down as it walks away; at the
   * edges of the view it is the floor that scrolls under its feet instead.
   */
  import { SvelteSet } from 'svelte/reactivity';
  import { fade } from 'svelte/transition';
  import {
    DEPTH,
    FLOOR,
    FOOT_DEPTH,
    H,
    HORIZON,
    rowPace,
    scroll,
    unit
  } from '#lib/bkg/patterns/horizon.svelte.ts';
  import { reducedMotion } from '#lib/preferences/reduced-motion.svelte.ts';

  const SIZE = { w: 80, h: 140 }; // sprite box at depth 1, in scene units
  const SPEED = 340; // lateral, scene units per second at depth 1
  const CLIMB = 1.1; // depth, in log(z) per second
  const FARTHEST = 5; // depth where the floor starts scrolling instead
  const EDGE = 0.85; // fraction of the half width where it does the same sideways
  const PUSH = 0.6; // share of the wanderer's pace the floor takes up
  const HOP = 520;
  const GRAVITY = 1600;
  /** Pace after holding one direction for `seconds`: a slow start, then a run. */
  const pace = (seconds: number) => Math.min(2.4, 0.6 + seconds);

  const controls: Record<string, 'left' | 'right' | 'away' | 'closer' | 'hop'> = {
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right',
    ArrowUp: 'away',
    KeyW: 'away',
    ArrowDown: 'closer',
    KeyS: 'closer',
    Space: 'hop'
  };
  const pressed = new SvelteSet<string>();
  const held = (action: string) => [...pressed].some((code) => controls[code] === action);

  // World state: lateral position, depth, height above the floor, and for how
  // long each axis has been pushed the same way.
  let x = 0;
  let z = 2.2;
  let h = 0;
  let vh = 0;
  const run = { side: 0, fore: 0, seconds: { side: 0, fore: 0 } };

  let walking = $state(false);
  let hinted = $state(false);
  let body = $state('');
  let shadow = $state('');

  const wrap = (value: number, period: number) => value - Math.floor(value / period) * period;

  function push(axis: 'side' | 'fore', direction: number, dt: number) {
    run.seconds[axis] = direction && direction === run[axis] ? run.seconds[axis] + dt : 0;
    run[axis] = direction;
    return direction * pace(run.seconds[axis]) * dt;
  }

  function step(dt: number) {
    const u = unit(innerWidth, innerHeight);
    const halfW = innerWidth / (2 * u);
    const bottom = H / 2 + innerHeight / (2 * u);
    const nearest = DEPTH / (bottom - HORIZON - 12);

    const side = Number(held('right')) - Number(held('left'));
    const fore = Number(held('away')) - Number(held('closer'));
    walking = side !== 0 || fore !== 0;
    x += SPEED * Math.sqrt(z) * push('side', side, dt);
    z *= Math.exp(CLIMB * push('fore', fore, dt));

    // Past the edges, the wanderer stays and the floor moves: the column feet
    // shift sideways, the rows slide at the pace they would pass the wanderer.
    const edge = EDGE * halfW * z;
    if (Math.abs(x) > edge) {
      const over = x - Math.sign(x) * edge;
      x -= over;
      scroll.shift = wrap(scroll.shift - (PUSH * over) / FOOT_DEPTH, FLOOR.gap) - FLOOR.gap;
    }
    const bound = Math.min(FARTHEST, Math.max(nearest, z));
    if (z !== bound) {
      scroll.phase = wrap(scroll.phase + PUSH * (z - bound) * rowPace(bound), 1 / FLOOR.rows);
      z = bound;
    }

    if (held('hop') && h === 0) vh = HOP;
    if (h > 0 || vh > 0) {
      vh -= GRAVITY * dt;
      h = Math.max(0, h + vh * dt);
      if (h === 0) vh = 0;
    }

    // Project the feet onto the screen, then lift the body by the hop.
    const s = u / z;
    const px = innerWidth / 2 + (x / z) * u;
    const py = innerHeight / 2 + (HORIZON + DEPTH / z - H / 2) * u;
    body = `translate(${px}px, ${py - h * s}px) scale(${s})`;
    shadow = `translate(${px}px, ${py}px) scale(${s * (1 - Math.min(h, 300) / 600)})`;
  }

  /** Attachment: runs the simulation while the element is on the page. */
  function loop() {
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      step(Math.min((now - last) / 1000, 0.05));
      last = now;
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }

  function down(event: KeyboardEvent) {
    if (!(event.code in controls) || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    pressed.add(event.code);
    hinted = true;
  }
  function up(event: KeyboardEvent) {
    pressed.delete(event.code);
  }
</script>

<svelte:window onkeydown={down} onkeyup={up} onblur={() => pressed.clear()} />

<div class="fixed inset-0 z-10 pointer-events-none" aria-hidden="true" {@attach loop}>
  <div class="shadow" style:transform={shadow}></div>
  <div
    class="wanderer"
    class:walking
    class:still={reducedMotion.current}
    style:transform={body}
    in:fade={{ duration: reducedMotion.current ? 0 : 600 }}
  >
    <svg
      viewBox="-40 -140 80 140"
      width={SIZE.w}
      height={SIZE.h}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--c-accent)" />
          <stop offset="1" stop-color="var(--c-second)" />
        </linearGradient>
      </defs>
      <!-- A kite standing on its tip. -->
      <path d="M0,-134 L34,-52 L0,-2 L-34,-52 Z" fill="url(#wd-body)" />
      <path
        d="M0,-134 L34,-52 L0,-2"
        fill="none"
        stroke="var(--c-bg)"
        stroke-opacity="0.35"
        stroke-width="3"
      />
    </svg>
  </div>

  {#if !hinted}
    <p
      class="hint fixed bottom-6 inset-x-0 text-center font-mono text-xs text-muted m-0"
      out:fade={{ duration: 400 }}
    >
      ← ↑ ↓ → to wander · space to hop
    </p>
  {/if}
</div>

<style>
  .wanderer,
  .shadow {
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
  }
  .wanderer {
    width: 80px;
    height: 140px;
    margin: -140px 0 0 -40px;
    transform-origin: 50% 100%;
    filter: drop-shadow(0 0 10px var(--c-accent-soft));
  }
  .wanderer svg {
    display: block;
    transform-origin: 50% 100%;
  }
  .walking:not(.still) svg {
    animation: bob 0.32s ease-in-out infinite alternate;
  }
  .shadow {
    width: 80px;
    height: 22px;
    margin: -11px 0 0 -40px;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      color-mix(in srgb, var(--c-fg) 30%, transparent),
      transparent 70%
    );
  }
  @keyframes bob {
    from {
      translate: 0 0;
      rotate: -5deg;
    }
    to {
      translate: 0 -10px;
      rotate: 5deg;
    }
  }
</style>
