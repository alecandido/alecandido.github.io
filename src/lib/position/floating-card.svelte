<script lang="ts">
  import drag from './drag';
  import { onMount } from 'svelte';

  export let ref = '';
  let card: HTMLElement;

  onMount(() => {
    drag(card);
  });
</script>

<article {ref}>
  <div bind:this={card} class="container">
    <slot />
  </div>
</article>

<style>
  article div {
    position: relative;
    top: 0;
    left: 0;

    max-width: max-content;
  }
</style>
