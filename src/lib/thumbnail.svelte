<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<figure>
  <img {src} {alt} />
</figure>

<style>
  figure {
    width: 128px;

    margin: 0 1rem 0 2rem;
  }

  figure > img {
    width: 100%;
    border-radius: 50%;
  }
</style>
