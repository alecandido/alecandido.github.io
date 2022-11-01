<script lang="ts">
  export let src: string;
  export let alt: string;
  export let href: string = '-';
</script>

<figure>
  {#if href !== '-'}
    <a {href} target="_blank" rel="noopener noreferrer">
      <img class="btn" {src} {alt} />
    </a>
  {:else}
    <img {src} {alt} />
  {/if}
</figure>

<style>
  figure {
    width: 128px;

    margin: 0 1rem 0 2rem;
  }

  figure img {
    width: 100%;
    padding: 0;
    border-radius: 50%;
  }
</style>
