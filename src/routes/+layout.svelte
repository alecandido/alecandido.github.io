<script>
  import { MetaTags } from 'svelte-meta-tags';

  import Preflights from '$lib/Preflights.svelte';
  import DarkModeToggle from '$lib/DarkModeToggle.svelte';
</script>

<MetaTags title="Alessandro Candido" description="Personal Home Page." />
<Preflights />
<DarkModeToggle />

<slot />

<style>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #363636;
  }

  body {
    color: #4a4a4a;
  }

  html,
  body {
    @apply h-full overflow-hidden;
  }
</style>
