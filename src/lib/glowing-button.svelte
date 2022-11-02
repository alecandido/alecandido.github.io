<script lang="ts">
  import { onMount } from 'svelte';
  import reducedMotion from '$lib/preferences/reduced-motion';

  export let label = '';
  export let href = '-';

  let animate = true;

  // access reducedMotion only on client, requires window
  onMount(async () => {
    // reactive statements only works in top scope, so to be reactive I need to
    // subscribe
    reducedMotion.subscribe((value) => {
      animate = !value;
    });
  });
</script>

<article class="relative">
  {#if href !== '-'}
    <a {href}>
      <button class="inner btn anigrad" class:animate>
        {label}
      </button>
    </a>
  {:else}
    <button class="inner btn anigrad" class:animate>
      {label}
    </button>
  {/if}
  <span class="absolute top-4 block w-full h-full anigrad" class:animate />
</article>

<style>
  .inner {
    position: relative;
    z-index: 10;

    padding: 0.5rem 1rem;
    border-radius: 9999px;

    color: white;
  }

  .anigrad {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
  }

  .anigrad.animate {
    animation: gradient 10s ease infinite;
  }

  span {
    filter: blur(1rem);
    opacity: 0.8;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 100%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 100%;
    }
  }
</style>
