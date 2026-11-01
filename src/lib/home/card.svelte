<script lang="ts">
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { asset, resolve } from '$app/paths';
  import { drag } from './drag.js';
  import { profile } from '#lib/content/profile.js';
  import { reducedMotion } from '#lib/preferences/reduced-motion.svelte.ts';

  /** Five quick clicks on the card frame hide it, leaving the background alone. */
  let visible = $state(true);
  let clicks = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function count(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;
    clearTimeout(timer);
    clicks += 1;
    if (clicks >= 5) {
      clicks = 0;
      visible = false;
      return;
    }
    timer = setTimeout(() => (clicks = 0), 500);
  }
</script>

{#if visible}
  <!-- The click counter is an easter egg; every real action inside is a link. -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <article
    use:drag
    onclick={count}
    in:scale={{ duration: reducedMotion.current ? 0 : 600, start: 0.6, easing: cubicOut }}
    out:scale={{ duration: reducedMotion.current ? 0 : 400, start: 0.6, easing: cubicOut }}
    class="card frame relative m-6 p-7 sm:p-9 w-[min(40rem,calc(100vw-3rem))] cursor-grab"
    aria-label="Presentation card, draggable"
  >
    <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start pointer-events-none">
      <a
        href={profile.links.github}
        target="_blank"
        rel="noopener noreferrer"
        class="portrait shrink-0 pointer-events-auto"
        aria-label="GitHub profile"
      >
        <img src={asset('profile.jpg')} alt="Alessandro Candido" width="128" height="128" />
      </a>

      <div class="min-w-0 pointer-events-auto">
        <p class="eyebrow text-xs text-muted m-0 mb-2 font-mono">{profile.tagline}</p>
        <h1 class="text-3xl sm:text-4xl m-0">Hi, I'm Alessandro</h1>
        <p class="text-muted mt-3 mb-0 leading-relaxed">{profile.intro}</p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <a href={resolve('/(inner)/about')} class="btn-primary">
            Enter
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={profile.links.github}
            class="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </article>
{/if}

<style>
  .frame {
    will-change: transform;
    transition: box-shadow var(--dur) var(--ease);
  }
  .frame:global(.dragging) {
    cursor: grabbing;
    box-shadow: var(--shadow-lg);
  }
  .portrait img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--c-accent);
    transition: transform var(--dur) var(--ease);
  }
  .portrait:hover img {
    transform: scale(1.04);
  }
</style>
