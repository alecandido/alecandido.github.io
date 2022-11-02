<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { RadioGroup, RadioItem } from '@brainandbones/skeleton';
  import clickOutside from '$lib/events/click-out';

  export let icon: string;
  export let options: string[];

  const storeLayout: Writable<string> = writable(options[0]);
  const cols = Math.ceil(Math.sqrt(options.length));

  let visible = false;

  function toggle() {
    visible = !visible;
  }
  function hide() {
    visible = false;
  }
</script>

<div class="relative z-20">
  <button class="picker z-20 btn grow-0" on:click={toggle}>{icon}</button>
  {#if visible}
    <div use:clickOutside on:outclick={hide} class="relative">
      <div class="absolute">
        <RadioGroup
          selected={storeLayout}
          display="inline-grid grid-cols-{cols} gap-2"
          background="bg-gray-900 backdrop-opacity-40"
          class="w-max mt-2"
          accent="bg-gray-700"
        >
          {#each options as opt}
            <RadioItem value={opt}>
              <img src={`/bkg/${opt}.png`} alt={opt} class="w-16 h-16 rounded-md" />
            </RadioItem>
          {/each}
        </RadioGroup>
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
