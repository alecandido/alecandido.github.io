<script lang="ts">
  import Background from '$lib/position/background.svelte';
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
  import BkgContent from '$lib/bkg/svg.svelte';
  /* import BkgContent from '$lib/bkg/video.svelte'; */
</script>

<Background>
  <BkgContent />
</Background>

<CenterMain>
  <PresentationCard />
</CenterMain>
