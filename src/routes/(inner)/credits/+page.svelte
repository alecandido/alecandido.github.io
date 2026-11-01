<script lang="ts">
  import { videos, patterns } from '#lib/bkg/catalog.js';

  const stock = videos.filter((v) => v.source !== null);
  const own = videos.filter((v) => v.source === null);
</script>

<svelte:head>
  <title>Credits · Alessandro Candido</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<h1 class="page-title m-0">Credits</h1>
<p class="text-muted mt-3 max-w-2xl">
  The home page shows one background at random, chosen among animated patterns and short video
  loops.
</p>

<section>
  <h2 class="section-title">Video loops</h2>
  <p class="text-sm text-muted -mt-2 mb-4">
    Stock footage from <a href="https://www.pexels.com/license/" class="link">Pexels</a>, trimmed
    and re-encoded. Thanks to the authors.
  </p>
  <ul class="grid gap-2 sm:grid-cols-2 list-none m-0 p-0">
    {#each stock as v (v.id)}
      <li class="card p-3 flex items-center gap-3">
        <img
          src="/bkg/{v.id}.webp"
          alt=""
          width="96"
          height="54"
          loading="lazy"
          class="w-24 h-[54px] object-cover rounded-ts shrink-0"
        />
        <span class="text-sm min-w-0">
          <a href={v.source?.page} class="font-medium no-underline hover:text-accent">{v.title}</a>
          <br />
          <span class="text-muted">by </span>
          <a href={v.source?.credit.url} class="link">{v.source?.credit.name}</a>
        </span>
      </li>
    {/each}
    {#each own as v (v.id)}
      <li class="card p-3 flex items-center gap-3">
        <img
          src="/bkg/{v.id}.webp"
          alt=""
          width="96"
          height="54"
          loading="lazy"
          class="w-24 h-[54px] object-cover rounded-ts shrink-0"
        />
        <span class="text-sm">
          <span class="font-medium">{v.title}</span><br />
          <span class="text-muted">own footage</span>
        </span>
      </li>
    {/each}
  </ul>
</section>

<section>
  <h2 class="section-title">Patterns</h2>
  <p class="text-sm text-muted -mt-2 mb-4">
    Animated SVG, generated in the browser and coloured by the active theme, inspired by the
    generators at <a href="https://www.fffuel.co/" class="link">fffuel</a>.
  </p>
  <div class="flex flex-wrap gap-2">
    {#each patterns as p (p.id)}<span class="tag">{p.title}</span>{/each}
  </div>
</section>

<section>
  <h2 class="section-title">Built with</h2>
  <p class="text-sm">
    <a href="https://svelte.dev/" class="link">Svelte</a> and
    <a href="https://svelte.dev/docs/kit" class="link">SvelteKit</a>,
    <a href="https://unocss.dev/" class="link">UnoCSS</a>, fonts via
    <a href="https://fontsource.org/" class="link">Fontsource</a>. Content refreshed from GitHub and
    <a href="https://inspirehep.net/" class="link">INSPIRE</a> at each deploy. Source on
    <a href="https://github.com/alecandido/alecandido.github.io" class="link">GitHub</a>.
  </p>
</section>
