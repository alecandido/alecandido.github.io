<script lang="ts">
  export let label = '';
  export let href = '-';
</script>

<article class="relative">
  {#if href !== '-'}
    <a {href}>
      <button class="inner btn anigrad">
        {label}
      </button>
    </a>
  {:else}
    <button class="inner btn anigrad">
      {label}
    </button>
  {/if}
  <span class="absolute top-4 block w-full h-full anigrad" />
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
