<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  import clickOutside from '$lib/events/click-out';

  export let icon: string;
  export let options: string[];
  export let store: Writable<string>;
  export let duration = 600;

  let cols = 1;
  $: cols = Math.ceil(Math.sqrt(options.length));

  let visible = false;

  function toggle() {
    visible = !visible;
  }
  function hide() {
    visible = false;
  }
  store.subscribe(() => {
    hide();
  });
</script>

<div class="relative z-20">
  <button class="picker z-20 btn grow-0" on:click={toggle} in:fly={{ x: 50, duration }}
    >{icon}</button
  >
  {#if visible}
    <div use:clickOutside on:outclick={hide} class="relative">
      <div class="absolute">
        <!-- <RadioGroup -->
        <!-- selected={store} -->
        <!-- display="inline-grid grid-cols-{cols} gap-2" -->
        <!-- background="bg-gray-900 backdrop-opacity-40" -->
        <!-- class="w-max mt-2" -->
        <!-- accent="bg-gray-700" -->
        <!-- > -->
        <!-- {#each options as opt} -->
        <!-- <RadioItem value={opt}> -->
        <!-- <img src={`/bkg/${opt}.webp`} alt={opt} class="w-16 h-16 rounded-md" /> -->
        <!-- </RadioItem> -->
        <!-- {/each} -->
        <!-- </RadioGroup> -->
      </div>
    </div>
  {/if}
</div>

<style>
  .picker {
    font-size: 2rem;
    padding: 0.25rem;
  }
</style>
