<script lang="ts">
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
  import Background from '$lib/position/background.svelte';
  import BkgProvider from '$lib/bkg/provider.svelte';
</script>

<Background>
  <BkgProvider />
</Background>

<CenterMain>
  <PresentationCard />
</CenterMain>
