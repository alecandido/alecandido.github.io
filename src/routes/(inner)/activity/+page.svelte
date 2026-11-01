<script lang="ts">
  import { publications, talks, totals, cleanTitle, type Publication } from '#lib/data/index.js';
  import { profile } from '#lib/content/profile.js';

  let filter: 'all' | 'quantum' | 'hep' = $state('all');

  const isQuantum = (p: Publication) => p.categories.includes('quant-ph');
  const shown = $derived(
    publications.filter((p) =>
      filter === 'all' ? true : filter === 'quantum' ? isQuantum(p) : !isQuantum(p)
    )
  );

  const byYear = $derived(
    shown.reduce<Map<number, Publication[]>>((acc, p) => {
      const y = p.year ?? 0;
      acc.set(y, [...(acc.get(y) ?? []), p]);
      return acc;
    }, new Map())
  );

  const typeLabel: Record<string, string> = {
    article: 'paper',
    'conference paper': 'proceedings',
    thesis: 'thesis'
  };

  const allTalks = [
    ...talks.map((t) => ({
      date: t.date,
      title: t.title,
      subtitle: t.subtitle,
      event: t.event,
      source: t.source
    })),
    ...profile.earlierTalks.map((t) => ({
      date: t.date,
      title: t.title,
      subtitle: t.place,
      event: t.event,
      source: null
    }))
  ]
    .map((t) => ({ ...t, meta: [t.subtitle, t.event].filter(Boolean).join(' · ') }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const month = (iso: string) =>
    new Date(iso.length === 7 ? `${iso}-01` : iso).toLocaleDateString('en', {
      month: 'short',
      year: 'numeric'
    });
</script>

<svelte:head>
  <title>Activity · Alessandro Candido</title>
  <meta name="description" content="Publications, talks and events of Alessandro Candido." />
</svelte:head>

<h1 class="page-title m-0">Activity</h1>
<p class="text-muted mt-3 max-w-2xl">
  {totals.papers} papers and {totals.citations.toLocaleString('en')} citations according to INSPIRE, plus
  talks and the events I took part in.
</p>

<section>
  <div class="flex flex-wrap items-center gap-3 mt-12 mb-4">
    <h2 class="section-title m-0">Publications</h2>
    <div class="ml-auto flex gap-1" role="group" aria-label="Filter publications">
      {#each [['all', 'All'], ['quantum', 'Quantum'], ['hep', 'HEP']] as [key, label] (key)}
        <button
          type="button"
          class="btn-ghost text-xs px-3 py-1"
          class:bg-accent-soft={filter === key}
          aria-pressed={filter === key}
          onclick={() => (filter = key as typeof filter)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>

  {#each [...byYear.entries()] as [year, list] (year)}
    <div class="grid sm:grid-cols-[5rem_1fr] gap-x-6 gap-y-2 mb-6">
      <div class="font-display text-2xl text-muted">{year || '—'}</div>
      <ol class="m-0 p-0 list-none grid gap-2">
        {#each list as p (p.id)}
          <li class="card p-4">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a href={p.url} class="font-medium no-underline hover:text-accent"
                >{cleanTitle(p.title)}</a
              >
              <span class="tag">{typeLabel[p.type] ?? p.type}</span>
              {#if p.collaboration}<span class="tag">{p.collaboration}</span>{/if}
            </div>
            <div class="mt-1.5 text-xs text-muted font-mono flex flex-wrap gap-x-4 gap-y-1">
              <span>
                {p.authors.slice(0, 3).join(', ')}{#if p.authorCount > 3}
                  &nbsp;+{p.authorCount - 3}{/if}
              </span>
              {#if p.journal}<span>{p.journal}</span>{/if}
              {#if p.arxiv}
                <a href="https://arxiv.org/abs/{p.arxiv}" class="link">arXiv:{p.arxiv}</a>
              {/if}
              {#if p.doi}<a href="https://doi.org/{p.doi}" class="link">doi</a>{/if}
              {#if p.citations}<span class="ml-auto">{p.citations} citations</span>{/if}
            </div>
          </li>
        {/each}
      </ol>
    </div>
  {/each}
  <p class="text-xs text-muted">
    Full list on <a href={profile.links.inspire} class="link">INSPIRE</a>,
    <a href={profile.links.orcid} class="link">ORCID</a> and
    <a href={profile.links.scholar} class="link">Google Scholar</a>.
  </p>
</section>

<section>
  <h2 class="section-title">Talks</h2>
  <ol class="m-0 p-0 list-none grid gap-2 sm:grid-cols-2">
    {#each allTalks as t (t.date + t.title)}
      <li class="card p-4">
        <time class="text-xs text-muted font-mono" datetime={t.date}>{month(t.date)}</time>
        <h3 class="m-0 mt-1 text-base">
          {#if t.source}
            <a href={t.source} class="no-underline hover:text-accent">{t.title}</a>
          {:else}
            {t.title}
          {/if}
        </h3>
        <p class="m-0 mt-1 text-sm text-muted">{t.meta}</p>
      </li>
    {/each}
  </ol>
  <p class="text-xs text-muted mt-3">
    Recent slides are kept in the
    <a href="https://github.com/alecandido/slides" class="link">slides repository</a>.
  </p>
</section>

<section>
  <h2 class="section-title">Events and schools</h2>
  <ol class="m-0 p-0 list-none grid gap-2">
    {#each profile.events as e (e.year + e.name)}
      <li class="card px-4 py-3 grid sm:grid-cols-[4rem_1fr] gap-x-4 items-baseline">
        <span class="font-mono text-xs text-muted">{e.year}</span>
        <span>
          {#if e.url}<a href={e.url} class="no-underline hover:text-accent">{e.name}</a
            >{:else}{e.name}{/if}
          <span class="text-muted text-sm">
            {#if e.org}· {e.org}{/if} · {e.place}
          </span>
        </span>
      </li>
    {/each}
  </ol>
</section>
