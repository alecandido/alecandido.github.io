<article>
  <slot />
</article>

<style>
  article {
    position: fixed;
    z-index: -100;

    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }
</style>
