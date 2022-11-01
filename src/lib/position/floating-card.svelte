<svelte:options accessors={true} />

<script lang="ts">
  import drag from './drag';
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let ref = '';
  let card: HTMLElement;
  export let visible = true;

  onMount(() => {
    drag(card);
  });
</script>

<article {ref} on:click>
  {#if visible}
    <div
      bind:this={card}
      transition:scale={{ duration: 800, delay: 0, opacity: 0.3, start: 0, easing: cubicOut }}
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
