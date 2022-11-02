<script lang="ts">
  import vvvortex from './vvvortex';

  const startHue = Math.random() * 180;
  export let animate = true;

  export let data = {
    bgColor: 'none',
    frequency: 12,
    fillType: 'gradient',
    fills: [`hsl(${startHue}, 100%, 67%)`, `hsl(${150 + startHue / 2}, 52%, 78%)`],
    fill: 'hsl(52, 100%, 51%)',
    modOpacity: 'fade',
    lineCap: 'round',
    scaleConstant: 150,
    baseStrokeWidth: 18,
    width: 1000,
    height: 1000
  };
  let stringy = JSON.stringify(data);
</script>

<div use:vvvortex data-vvvortex={stringy} class="w-full h-full" class:animate />

<style>
  div {
    background-color: #191a1c;
  }

  :global(#vvvortex) {
    width: 150%;
    height: 150%;
  }

  div.animate :global(#vvvortex-circles) {
    animation: spin 20s linear infinite;
    transform-origin: center;
  }

  @keyframes spin {
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
