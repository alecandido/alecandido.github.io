<script lang="ts">
  import { profile, formatPeriod } from '#lib/content/profile.js';
</script>

<svelte:head>
  <title>Journey · Alessandro Candido</title>
  <meta
    name="description"
    content="Positions, education, theses, teaching and skills of Alessandro Candido."
  />
</svelte:head>

<h1 class="page-title m-0">Journey</h1>
<p class="text-muted mt-3 max-w-2xl">
  From Pisa to Milan, Geneva and Abu Dhabi: physics first, software all along.
</p>

<section>
  <h2 class="section-title">Positions</h2>
  <ol class="timeline">
    {#each profile.positions as p (p.start)}
      <li>
        <time class="when" datetime={p.start}>{formatPeriod(p, { month: true })}</time>
        <div class="card p-5">
          <h3 class="m-0 text-lg">{p.role}</h3>
          <p class="m-0 mt-1 text-sm">
            <a href={p.orgUrl} class="link">{p.org}</a>
            <span class="text-muted"> · {p.place}</span>
            {#if p.collaboration}
              <span class="text-muted">· with</span>
              <a href={p.collaboration.url} class="link">{p.collaboration.name}</a>
            {/if}
          </p>
          <p class="m-0 mt-3 text-sm text-muted leading-relaxed">{p.summary}</p>
        </div>
      </li>
    {/each}
  </ol>
</section>

<section>
  <h2 class="section-title">Education</h2>
  <ol class="timeline">
    {#each profile.education as e (e.degree + e.start)}
      <li>
        <time class="when" datetime={e.start}>{formatPeriod(e)}</time>
        <div class="card p-5">
          <h3 class="m-0 text-lg">{e.degree}, {e.area}</h3>
          <p class="m-0 mt-1 text-sm">
            <a href={e.orgUrl} class="link">{e.org}</a>
            <span class="text-muted"> · {e.place}</span>
            {#if e.grade}<span class="tag ml-2">{e.grade}</span>{/if}
          </p>
          {#if e.thesis}
            <p class="m-0 mt-3 text-sm">
              <span class="text-muted">Thesis:</span>
              <em>{e.thesis.title}</em>
              <span class="text-muted"> · advisor {e.thesis.advisor}</span>
            </p>
          {/if}
          {#if e.note}<p class="m-0 mt-2 text-sm text-muted">{e.note}</p>{/if}
        </div>
      </li>
    {/each}
  </ol>
</section>

<section>
  <h2 class="section-title">Theses</h2>
  <div class="grid gap-4 md:grid-cols-2">
    {#each profile.theses as t (t.title)}
      <article class="card p-5">
        <p class="eyebrow text-xs text-muted font-mono m-0 mb-2">{t.level}</p>
        <h3 class="m-0 text-lg">{t.title}</h3>
        <p class="m-0 mt-1 text-sm text-muted">advisor {t.advisor}</p>
        <p class="m-0 mt-3 text-sm leading-relaxed">{t.summary}</p>
      </article>
    {/each}
  </div>
</section>

<section>
  <h2 class="section-title">Teaching</h2>
  <ol class="timeline">
    {#each profile.teaching as t (t.start + t.course)}
      <li>
        <time class="when" datetime={t.start}>{formatPeriod(t, { month: true })}</time>
        <div class="card p-5">
          <h3 class="m-0 text-base">{t.course}</h3>
          <p class="m-0 mt-1 text-sm text-muted">{t.role} · {t.org}</p>
          <p class="m-0 mt-2 text-sm text-muted leading-relaxed">{t.summary}</p>
        </div>
      </li>
    {/each}
  </ol>
</section>

<section>
  <h2 class="section-title">Skills</h2>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each profile.skills as group (group.name)}
      <div class="card p-5">
        <h3 class="m-0 mb-3 text-base">{group.name}</h3>
        <div class="flex flex-wrap gap-1.5">
          {#each group.items as item (item)}<span class="tag">{item}</span>{/each}
        </div>
      </div>
    {/each}
    <div class="card p-5">
      <h3 class="m-0 mb-3 text-base">Languages</h3>
      <ul class="m-0 p-0 list-none text-sm space-y-1">
        {#each profile.languages as l (l.name)}
          <li>
            <span class="font-medium">{l.name}</span> <span class="text-muted">· {l.level}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1rem;
  }
  .timeline li {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem 1.5rem;
  }
  @media (min-width: 640px) {
    .timeline li {
      grid-template-columns: 9rem 1fr;
    }
  }
  .when {
    font-family: var(--f-mono);
    font-size: 0.8rem;
    color: var(--c-muted);
    padding-top: 1.35rem;
  }
</style>
