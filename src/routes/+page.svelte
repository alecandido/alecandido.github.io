<script lang="ts">
  import Background from '$lib/position/background.svelte';
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
</script>

<Background>
  <video autoplay muted loop class="max-w-none">
    <source src="/bkg/mountain-river.mp4" type="video/mp4" />
  </video>
</Background>

<CenterMain>
  <PresentationCard />
</CenterMain>
