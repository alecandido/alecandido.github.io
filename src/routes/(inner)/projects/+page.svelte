<script lang="ts">
  import { reposByGroup, github, totals, type Repo } from '#lib/data/index.js';

  const groups: { key: keyof typeof reposByGroup; title: string; blurb: string }[] = [
    {
      key: 'quantum',
      title: 'Quantum computing',
      blurb:
        'The Qibo ecosystem: a full-stack, open-source framework for quantum simulation and hardware control, developed by an international collaboration. I work mostly on the hardware side.'
    },
    {
      key: 'hep',
      title: 'High-energy physics',
      blurb:
        'The theory pipeline for PDF fitting, built during my PhD within the NNPDF collaboration: evolution, deep-inelastic scattering, interpolation grids, and the glue between them.'
    },
    {
      key: 'personal',
      title: 'Personal',
      blurb: 'Tools, experiments and things I keep for myself: slides, numerics, configurations.'
    }
  ];

  const byCommits = (a: Repo, b: Repo) => b.commits - a.commits;

  const blurbs: Record<string, string> = {
    qibo: 'The core: circuits, backends, simulation, and the language the rest speaks.',
    qibolab: 'Hardware abstraction and drivers: pulses, sequences, instruments, platforms.',
    qibocal: 'Calibration, characterization and validation of self-hosted quantum devices.',
    qibocamp:
      'Desktop application for Qibocal: notebooks, report servers, remote execution and agents.',
    qibosoq: 'Server for RFSoC boards running QICK, to drive qubits from Qibolab.',
    qibojit: 'Just-in-time compiled simulation backends, on CPU and GPU.',
    qibotn: 'Tensor-network simulation backends.',
    qiboml: 'Quantum machine learning on top of Qibo, orchestrated with classical frameworks.',
    eko: 'Evolution Kernel Operators: DGLAP evolution precomputed as reusable operators.',
    yadism: 'Yet Another DIS Module: deep-inelastic scattering predictions for many observables.',
    pineappl: 'Interpolation grids for fast predictions from Monte Carlo generators.',
    pineko: 'PineAPPL grids combined with EKO operators into fast theory predictions.',
    pinefarm: 'Generates PineAPPL grids from runcards, across generators.',
    runcards: 'Runcards for reproducible grid generation.',
    nnusf: 'Neural-network interpolation of neutrino structure functions from GeV to EeV.',
    banana: 'Benchmarking framework for pQCD codes: runs, databases, comparisons.',
    nnpdf: 'The NNPDF fitting code: proton structure from data with machine learning.'
  };

  const languageColor: Record<string, string> = {
    Python: '#3572A5',
    Rust: '#dea584',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Svelte: '#ff3e00',
    Vue: '#41b883',
    Nix: '#7e7eff',
    TeX: '#3D6117',
    'C++': '#f34b7d',
    C: '#555555',
    Lua: '#000080',
    HTML: '#e34c26'
  };
</script>

<svelte:head>
  <title>Projects · Alessandro Candido</title>
  <meta
    name="description"
    content="Open-source projects Alessandro Candido develops and contributes to."
  />
</svelte:head>

<h1 class="page-title m-0">Projects</h1>
<p class="text-muted mt-3 max-w-2xl">
  Everything I work on is open source. Numbers come from GitHub and are refreshed at each deploy.
</p>

<div class="mt-6 flex flex-wrap gap-2 text-sm">
  <span class="tag"
    >{totals.commits.toLocaleString('en')} commits across {reposByGroup.quantum.length +
      reposByGroup.hep.length +
      reposByGroup.personal.length} repositories</span
  >
  {#if github}
    {#each github.orgs as org (org.login)}
      <a href={org.url} class="tag no-underline hover:bg-accent hover:text-accent-fg"
        >@{org.login}</a
      >
    {/each}
  {/if}
</div>

{#each groups as group (group.key)}
  <section>
    <h2 class="section-title">{group.title}</h2>
    <p class="text-muted text-sm max-w-2xl -mt-2 mb-5">{group.blurb}</p>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each reposByGroup[group.key].slice().sort(byCommits) as repo (repo.full)}
        <article class="card p-5 flex flex-col gap-3">
          <header class="flex items-baseline justify-between gap-2">
            <h3 class="m-0 text-lg min-w-0 truncate">
              <a href={repo.url} class="no-underline hover:text-accent">{repo.name}</a>
            </h3>
            <span class="text-xs text-muted shrink-0 font-mono">{repo.owner}</span>
          </header>
          <p class="m-0 text-sm leading-relaxed flex-1">
            {blurbs[repo.name] ?? repo.description ?? ''}
          </p>
          <footer class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-mono">
            {#if repo.language}
              <span class="inline-flex items-center gap-1.5">
                <i
                  class="inline-block w-2.5 h-2.5 rounded-full"
                  style:background={languageColor[repo.language] ?? 'var(--c-faint)'}
                ></i>
                {repo.language}
              </span>
            {/if}
            <span title="my commits">{repo.commits.toLocaleString('en')} commits</span>
            {#if repo.stars > 0}<span title="stars">★ {repo.stars}</span>{/if}
            {#if repo.archived}<span class="tag">archived</span>{/if}
            {#if repo.homepage}
              <a href={repo.homepage} class="link ml-auto">docs</a>
            {/if}
          </footer>
        </article>
      {/each}
    </div>
  </section>
{/each}
