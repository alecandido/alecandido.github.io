<script>
  import SvgBackground from './vvvortex.svelte';

  export let animate = true;
</script>

<svelte:component this={SvgBackground} {animate} />

<style>
  * {
    position: absolute;
    width: 200%;
    height: 200%;
    left: 100%;
  }
</style>
