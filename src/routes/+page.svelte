<script lang="ts">
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
  import Background from '$lib/position/background.svelte';
  import reducedMotion from '$lib/preferences/reduced-motion';
  /* import BkgContent from '$lib/bkg/svg.svelte'; */
  import BkgContent from '$lib/bkg/video.svelte';

  import { onMount } from 'svelte';
</script>

<Background>
  <BkgContent animate={!$reducedMotion} />
</Background>

<CenterMain>
  <PresentationCard />
</CenterMain>
