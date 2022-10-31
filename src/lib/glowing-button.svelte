<script>
  export let label = '';
</script>

<article class="relative">
  <button class="relative z-10 btn px-4 py-2 text-white rounded-full anigrad">
    {label}
  </button>
  <span class="absolute top-4 block w-full h-full anigrad" />
</article>

<style>
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
