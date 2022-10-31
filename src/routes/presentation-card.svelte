<script lang="ts">
  import FloatingCard from '$lib/position/floating-card.svelte';
  import Thumbnail from '$lib/thumbnail.svelte';
</script>

<FloatingCard ref="presentation">
  <Thumbnail src="/profile.jpg" alt="Profile" />

  <header id="titles">
    <h1 class="title">Hi, I'm Alessandro</h1>
    <h2 class="subtitle">Welcome to my personal page</h2>
  </header>
  <p>I'm Alessandro Candido, a PhD student in theoretical physics working in HEP.</p>
</FloatingCard>

<style>
  #titles {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1rem;
  }

  :global([ref='presentation'] .container) {
    padding: 1.5rem 3rem;
    margin: 1.5rem;

    background-color: white;
    border: black 2pt solid;
    border-radius: 1rem;
  }

  :global([ref='presentation']) :is(h1, h2, p) {
    margin: 0;
  }
</style>
