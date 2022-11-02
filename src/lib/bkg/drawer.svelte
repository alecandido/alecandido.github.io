<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { RadioGroup, RadioItem } from '@brainandbones/skeleton';
  import { backIn } from 'svelte/easing';

  export let icon: string;
  export let options: string[];

  const storeLayout: Writable<string> = writable(options[0]);

  let hidden = true;

  function hide() {
    hidden = !hidden;
  }
</script>

<div class="relative z-20">
  <button class="picker z-20 btn grow-0" on:click={hide}>{icon}</button>
  <div class:hidden class="relative">
    <div class="absolute">
      <RadioGroup
        selected={storeLayout}
        display="inline-grid grid-cols-2 gap-2 w-max-w"
        background="bg-none border-0"
      >
        {#each options as opt}
          <RadioItem value={opt}>
            <img src={`/bkg/${opt}.png`} alt={opt} class="w-16 h-16 rounded-md" />
          </RadioItem>
        {/each}
      </RadioGroup>
    </div>
  </div>
</div>

<style>
  .picker {
    font-size: 2rem;
    padding: 0.25rem;
  }

  .hidden {
    visibility: hidden;
  }
</style>
