<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { profile } from '#lib/content/profile.js';
  import { totals } from '#lib/data/index.js';

  const current = profile.positions[0];

  const contacts = [
    { label: 'GitHub', href: profile.links.github, text: '@alecandido' },
    { label: 'LinkedIn', href: profile.links.linkedin, text: 'alessandro-candido' },
    { label: 'Email', href: `mailto:${profile.links.email}`, text: profile.links.email },
    { label: 'ORCID', href: profile.links.orcid, text: '0000-0002-1405-3205' },
    { label: 'INSPIRE', href: profile.links.inspire, text: 'A.Candido.1' },
    { label: 'Scholar', href: profile.links.scholar, text: 'profile' },
    { label: 'Telegram', href: profile.links.telegram, text: '@candidoale' }
  ];

  const stats = [
    { value: totals.papers, label: 'papers' },
    { value: totals.citations, label: 'citations' },
    { value: totals.commits.toLocaleString('en'), label: 'commits' },
    { value: totals.stars, label: 'stars' }
  ];
</script>

<svelte:head>
  <title>About · Alessandro Candido</title>
  <meta name="description" content={profile.intro} />
</svelte:head>

<section class="grid gap-10 md:grid-cols-[auto_1fr] items-start">
  <img
    src={asset('profile.jpg')}
    alt="Alessandro Candido"
    width="192"
    height="192"
    class="portrait w-40 h-40 md:w-48 md:h-48 rounded-tl object-cover"
  />
  <div>
    <p class="eyebrow text-xs text-muted font-mono m-0 mb-3">{profile.tagline}</p>
    <h1 class="page-title m-0">{profile.name}</h1>
    <p class="text-lg text-muted mt-4 leading-relaxed max-w-2xl">{profile.intro}</p>
    <p class="mt-4 text-sm">
      <span class="text-muted">Now:</span>
      {current.role} at
      <a href={current.orgUrl} class="link">{current.org}</a>, {current.place}.
    </p>
    <div class="mt-6 flex flex-wrap gap-2">
      <a href={resolve('/(inner)/journey')} class="btn-primary">Journey</a>
      <a href={resolve('/(inner)/projects')} class="btn-ghost">Projects</a>
      <a href={resolve('/(inner)/activity')} class="btn-ghost">Activity</a>
    </div>
  </div>
</section>

<section class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
  {#each stats as s (s.label)}
    <div class="card p-4">
      <div class="font-display text-3xl font-semibold">{s.value}</div>
      <div class="text-xs text-muted uppercase tracking-wider mt-1">{s.label}</div>
    </div>
  {/each}
</section>

<section class="mt-12 max-w-3xl">
  <h2 class="section-title mt-0">Who</h2>
  {#each profile.about as paragraph, i (i)}
    <p class="leading-relaxed text-[1.05rem] mb-4">{paragraph}</p>
  {/each}
</section>

<section class="mt-12">
  <h2 class="section-title mt-0">Interests</h2>
  <div class="grid gap-4 sm:grid-cols-3">
    {#each profile.interests as group (group.area)}
      <div class="card p-5">
        <h3 class="text-base m-0 mb-3">{group.area}</h3>
        <ul class="m-0 pl-4 text-sm text-muted space-y-1">
          {#each group.items as item (item)}<li>{item}</li>{/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<section class="mt-12">
  <h2 class="section-title mt-0">Reach me</h2>
  <ul class="grid gap-2 sm:grid-cols-2 list-none m-0 p-0">
    {#each contacts as c (c.label)}
      <li class="card px-4 py-3 flex items-baseline gap-3 text-sm">
        <span class="text-muted w-20 shrink-0">{c.label}</span>
        <a href={c.href} class="link truncate" target="_blank" rel="noopener noreferrer">{c.text}</a
        >
      </li>
    {/each}
  </ul>
</section>

<style>
  .portrait {
    border: 3px solid var(--c-accent);
    box-shadow: var(--shadow);
  }
</style>
