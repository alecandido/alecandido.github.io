<script lang="ts">
  import { writable, derived } from 'svelte/store';
  import CenterMain from '$lib/position/center-main.svelte';
  import PresentationCard from './presentation-card.svelte';
  import Background from '$lib/position/background.svelte';
  import BkgProvider from '$lib/bkg/provider.svelte';
  import BkgDrawer from '$lib/bkg/drawer.svelte';
  import { Kind, kinds } from '$lib/bkg/variants';

  const bkgKind = writable('svg');
  const bkgVariant = writable('vvvortex');

  let variants = derived(bkgKind, ($bkgKind) => kinds[$bkgKind]);
</script>

<Background>
  <BkgProvider kind={$bkgKind} variant={$bkgVariant} />
</Background>
<nav class="fixed flex m-4 z-20">
  <BkgDrawer icon="🌁" options={Object.keys(Kind)} store={bkgKind} />
  {#if $variants.length > 0}
    <BkgDrawer icon="🎴" options={$variants} store={bkgVariant} />
  {/if}
</nav>

<CenterMain>
  <PresentationCard />
</CenterMain>
