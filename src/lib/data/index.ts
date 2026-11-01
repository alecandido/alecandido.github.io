/*
 * Typed access to the content snapshot refreshed by scripts/fetch-data.mjs.
 * Everything here is resolved at build time: the pages are prerendered with
 * the snapshot inlined, no API is called from the browser.
 */
import snapshot from './snapshot.json' with { type: 'json' };

export type Repo = {
  group: 'quantum' | 'hep' | 'personal';
  name: string;
  full: string;
  owner: string;
  url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  archived: boolean;
  topics: string[];
  pushed: string;
  created: string;
  commits: number;
};

export type Publication = {
  id: number;
  title: string;
  date: string | null;
  year: number | null;
  arxiv: string | null;
  categories: string[];
  doi: string | null;
  journal: string | null;
  type: string;
  collaboration: string | null;
  citations: number;
  authorCount: number;
  authors: string[];
  abstract: string | null;
  url: string;
};

export type Talk = {
  slug: string;
  title: string;
  subtitle: string | null;
  event: string | null;
  date: string;
  source: string;
};

export type GithubProfile = {
  login: string;
  name: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  email: string | null;
  avatar: string;
  url: string;
  publicRepos: number;
  followers: number;
  since: string;
};

type Snapshot = {
  generated: string;
  github: {
    profile: GithubProfile;
    orgs: { login: string; url: string; avatar: string }[];
    repos: Repo[];
  } | null;
  publications: Publication[] | null;
  talks: Talk[] | null;
};

const data = snapshot as unknown as Snapshot;

export const generated = new Date(data.generated);
export const github = data.github;
export const repos: Repo[] = data.github?.repos ?? [];
export const publications: Publication[] = (data.publications ?? [])
  .slice()
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
export const talks: Talk[] = data.talks ?? [];

export const reposByGroup = {
  quantum: repos.filter((r) => r.group === 'quantum'),
  hep: repos.filter((r) => r.group === 'hep'),
  personal: repos.filter((r) => r.group === 'personal')
};

export const totals = {
  commits: repos.reduce((n, r) => n + r.commits, 0),
  stars: repos.reduce((n, r) => n + r.stars, 0),
  citations: publications.reduce((n, p) => n + p.citations, 0),
  papers: publications.filter((p) => p.type === 'article').length
};

/** Tidy a few LaTeX-isms that INSPIRE keeps in titles. */
export function cleanTitle(title: string) {
  return title
    .replace(/\$\\hbox\s*\{([^}]*)\}\$/g, '$1')
    .replace(/\\hbox\s*\{([^}]*)\}/g, '$1')
    .replace(/\\overline\{\\textrm\{MS\}\}|\\overline\{\\mathrm\{MS\}\}|\\overline\{MS\}/g, 'MSbar')
    .replace(/\^\{?(\d)\}?/g, (_, d: string) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)])
    .replace(/\\textrm\{([^}]*)\}/g, '$1')
    .replace(/\$/g, '')
    .replace(/\\/g, '')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
