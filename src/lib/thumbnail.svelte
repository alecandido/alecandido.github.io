<script lang="ts">
  export let src: string;
  export let alt: string;
  export let href: string = '-';
  export let size = 128;
</script>

<figure style="--size: {size}px">
  {#if href !== '-'}
    <a {href} target="_blank" rel="noopener noreferrer">
      <img class="btn" {src} {alt} width={size} height={size} />
    </a>
  {:else}
    <img {src} {alt} />
  {/if}
</figure>

<style>
  figure {
    width: var(--size);
    margin: 0 1rem 0 2rem;
  }

  figure img {
    width: 100%;
    padding: 0;
    border-radius: 50%;
  }
</style>
