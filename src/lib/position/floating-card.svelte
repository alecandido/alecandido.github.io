<svelte:options accessors={true} />

<script lang="ts">
  import drag from './drag';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let ref = '';
  export let visible = true;
  export let duration = 1000;
</script>

<article {ref} on:click>
  {#if visible}
    <div
      use:drag
      transition:scale={{ duration, delay: 0, opacity: 0.3, start: 0, easing: cubicOut }}
      class="container max-w-max"
    >
      <slot />
    </div>
  {/if}
</article>

<style>
  article div {
    position: relative;
    top: 0;
    left: 0;
  }
</style>
