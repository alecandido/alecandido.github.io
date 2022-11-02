<script lang="ts">
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
  import Background from '$lib/position/background.svelte';
  import BkgProvider from '$lib/bkg/provider.svelte';
  import BkgDrawer from '$lib/bkg/drawer.svelte';
  import { Kind, SVG } from '$lib/bkg/variants';
</script>

<Background>
  <BkgProvider />
</Background>
<nav class="fixed flex m-4 z-20">
  <BkgDrawer icon="🌁" options={Object.keys(Kind)} />
  <BkgDrawer icon="🎴" options={Object.keys(SVG)} />
</nav>

<CenterMain>
  <PresentationCard />
</CenterMain>
