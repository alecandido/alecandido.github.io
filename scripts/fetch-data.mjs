#!/usr/bin/env node
/*
 * Refresh the content snapshot used by the inner site.
 *
 * Sources: GitHub (profile, repositories, contributions), INSPIRE-HEP
 * (publications) and the `alecandido/slides` repository (talks metadata).
 *
 * The result is written to src/lib/data/snapshot.json, which is committed, so
 * the site always builds even when a source is unreachable: every section
 * that cannot be refreshed keeps its previous value.
 *
 * Set GITHUB_TOKEN to raise the GitHub API rate limit (done automatically in
 * GitHub Actions). Locally: GITHUB_TOKEN=$(gh auth token) pnpm data
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, '../src/lib/data/snapshot.json');

const USER = 'alecandido';
const INSPIRE_BAI = 'A.Candido.1';

/** Repositories the projects page is built from, by group. */
const CURATED = {
  quantum: [
    'qiboteam/qibo',
    'qiboteam/qibolab',
    'qiboteam/qibocal',
    'qiboteam/qibocamp',
    'qiboteam/qibosoq',
    'qiboteam/qibojit',
    'qiboteam/qibotn',
    'qiboteam/qiboml'
  ],
  hep: [
    'NNPDF/eko',
    'NNPDF/yadism',
    'NNPDF/pineappl',
    'NNPDF/pineko',
    'NNPDF/pinefarm',
    'NNPDF/runcards',
    'NNPDF/nnusf',
    'NNPDF/banana',
    'NNPDF/nnpdf'
  ],
  personal: [
    'alecandido/show',
    'alecandido/slipy',
    'alecandido/partons',
    'alecandido/quad',
    'alecandido/ndinterp',
    'alecandido/CDT_2D',
    'alecandido/sphluid',
    'alecandido/packutil',
    'alecandido/pydf',
    'alecandido/cv',
    'alecandido/slides',
    'alecandido/nix-config',
    'alecandido/alecandido.github.io'
  ]
};

const ghHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'annibale.dev-build'
};
if (process.env.GITHUB_TOKEN) ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function gh(path, init = {}) {
  const res = await fetch(`https://api.github.com${path}`, { ...init, headers: ghHeaders });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status} ${res.statusText}`);
  return res;
}

/** Number of commits authored by USER, read from the pagination Link header. */
async function commitCount(repo) {
  const res = await gh(`/repos/${repo}/commits?author=${USER}&per_page=1`);
  const link = res.headers.get('link') ?? '';
  const last = /page=(\d+)>; rel="last"/.exec(link);
  if (last) return Number(last[1]);
  const body = await res.json();
  return Array.isArray(body) ? body.length : 0;
}

async function fetchGithub() {
  const profile = await (await gh(`/users/${USER}`)).json();
  const orgs = await (await gh(`/users/${USER}/orgs`)).json();

  const repos = [];
  for (const [group, names] of Object.entries(CURATED)) {
    for (const full of names) {
      const r = await (await gh(`/repos/${full}`)).json();
      const commits = await commitCount(full);
      repos.push({
        group,
        name: r.name,
        full: r.full_name,
        owner: r.owner.login,
        url: r.html_url,
        homepage: r.homepage || null,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        archived: r.archived,
        topics: r.topics ?? [],
        pushed: r.pushed_at,
        created: r.created_at,
        commits
      });
    }
  }

  return {
    profile: {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      company: profile.company,
      location: profile.location,
      blog: profile.blog,
      email: profile.email,
      avatar: profile.avatar_url,
      url: profile.html_url,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      since: profile.created_at
    },
    orgs: orgs.map((o) => ({
      login: o.login,
      url: `https://github.com/${o.login}`,
      avatar: o.avatar_url
    })),
    repos
  };
}

async function fetchPublications() {
  const fields = [
    'control_number',
    'titles.title',
    'arxiv_eprints.value',
    'arxiv_eprints.categories',
    'earliest_date',
    'citation_count',
    'authors.full_name',
    'publication_info.journal_title',
    'publication_info.year',
    'publication_info.journal_volume',
    'dois.value',
    'document_type',
    'collaborations.value',
    'abstracts.value'
  ].join(',');
  const url = `https://inspirehep.net/api/literature?q=a%20${INSPIRE_BAI}&size=200&sort=mostrecent&fields=${fields}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`INSPIRE: ${res.status}`);
  const { hits } = await res.json();
  return hits.hits.map(({ metadata: m }) => {
    const authors = (m.authors ?? []).map((a) => a.full_name);
    const pub = m.publication_info?.[0] ?? {};
    return {
      id: m.control_number,
      title: m.titles?.[0]?.title ?? '',
      date: m.earliest_date ?? null,
      year: Number((m.earliest_date ?? '').slice(0, 4)) || pub.year || null,
      arxiv: m.arxiv_eprints?.[0]?.value ?? null,
      categories: m.arxiv_eprints?.[0]?.categories ?? [],
      doi: m.dois?.[0]?.value ?? null,
      journal: pub.journal_title ?? null,
      type: m.document_type?.[0] ?? 'article',
      collaboration: m.collaborations?.[0]?.value ?? null,
      citations: m.citation_count ?? 0,
      authorCount: authors.length,
      authors: authors.slice(0, 4),
      abstract: m.abstracts?.[0]?.value ?? null,
      url: `https://inspirehep.net/literature/${m.control_number}`
    };
  });
}

async function fetchTalks() {
  const tree = await (await gh(`/repos/${USER}/slides/git/trees/HEAD?recursive=1`)).json();
  const metas = tree.tree.filter((e) => /^slidev\/[^/]+\/meta\.ya?ml$/.test(e.path));
  const talks = [];
  for (const entry of metas) {
    const res = await fetch(`https://raw.githubusercontent.com/${USER}/slides/HEAD/${entry.path}`);
    if (!res.ok) continue;
    const meta = parseYaml(await res.text());
    if (meta.skip || !meta.date) continue;
    const title = Array.isArray(meta.title) ? meta.title : [meta.title];
    talks.push({
      slug: entry.path.split('/')[1],
      title: title[0],
      subtitle: title.slice(1).join(' · ') || null,
      event: meta.descriptions?.short ?? null,
      date: String(meta.date),
      source: `https://github.com/${USER}/slides/tree/main/${dirname(entry.path)}`
    });
  }
  return talks.sort((a, b) => b.date.localeCompare(a.date));
}

async function main() {
  let previous = {};
  try {
    previous = JSON.parse(await readFile(target, 'utf8'));
  } catch {
    /* first run */
  }

  const next = { ...previous, generated: new Date().toISOString() };
  const sections = { github: fetchGithub, publications: fetchPublications, talks: fetchTalks };
  let failures = 0;
  for (const [key, fn] of Object.entries(sections)) {
    try {
      next[key] = await fn();
      console.log(`✔ ${key}`);
    } catch (err) {
      failures += 1;
      console.warn(`✘ ${key}: ${err.message} (keeping previous snapshot)`);
      if (!(key in next)) next[key] = null;
    }
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(next, null, 2) + '\n');
  console.log(`snapshot written to ${target}${failures ? ` (${failures} section(s) stale)` : ''}`);
}

main();
