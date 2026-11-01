# annibale.dev

Personal website of Alessandro Candido, built with [SvelteKit](https://svelte.dev/docs/kit)
and [UnoCSS](https://unocss.dev/), deployed to GitHub Pages by the `Publish` workflow.

## Layout

- `/` — the landing card over a random background (an animated SVG pattern or a short
  video loop), see `src/lib/bkg/`.
- `/about`, `/journey`, `/projects`, `/activity`, `/credits` — the inner site, under
  `src/routes/(inner)/`.

## Content

- Hand-written content (bio, positions, education, teaching, events) lives in
  `src/lib/content/profile.ts`.
- Live content (repositories and contributions from GitHub, publications from INSPIRE,
  talks from the `slides` repository) is captured in `src/lib/data/snapshot.json` by

  ```sh
  GITHUB_TOKEN=$(gh auth token) pnpm data
  ```

  The workflow runs it before every build, and on a schedule, so the snapshot in the
  repository is only a fallback: a source that cannot be reached keeps its previous
  value.

## Themes

Themes are sets of CSS custom properties on `<html data-theme="…">`, defined in
`src/lib/theme/themes.css` and registered in `src/lib/theme/themes.ts`. The UnoCSS
colour and font aliases (`bg-surface`, `text-accent`, `font-display`, …) resolve to those
properties, so a new theme only needs a new block of tokens, plus optional decorations.
The choice is stored in `localStorage`.

## Backgrounds

Video loops are encoded with `scripts/encode-video.sh` (VP9 + H.264 + poster, 1080p,
24 fps, about 10 s, bitrate-capped) and listed with their credits in
`src/lib/bkg/catalog.ts`. Patterns are Svelte components under `src/lib/bkg/patterns/`:
static SVG markup animated by CSS transforms only, and coloured by the active theme.

## Development

```sh
pnpm install
pnpm dev        # local server
pnpm check      # svelte-check
pnpm lint       # prettier + eslint
pnpm build      # static output in build/
```
