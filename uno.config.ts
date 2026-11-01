import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

/*
 * Atomic utilities resolve to the CSS custom properties set by the active
 * theme (see src/lib/theme/themes.css), so `bg-surface text-fg` restyles
 * itself when the theme switches.
 */
export default defineConfig({
  presets: [presetWind4({ preflights: { reset: true } })],
  extractors: [extractorSvelte()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      bg: 'var(--c-bg)',
      surface: 'var(--c-surface)',
      raised: 'var(--c-raised)',
      fg: 'var(--c-fg)',
      muted: 'var(--c-muted)',
      faint: 'var(--c-faint)',
      line: 'var(--c-line)',
      accent: 'var(--c-accent)',
      'accent-fg': 'var(--c-accent-fg)',
      'accent-soft': 'var(--c-accent-soft)',
      second: 'var(--c-second)',
      'second-fg': 'var(--c-second-fg)'
    },
    font: {
      body: 'var(--f-body)',
      display: 'var(--f-display)',
      mono: 'var(--f-mono)'
    },
    radius: {
      t: 'var(--r-base)',
      tl: 'var(--r-large)',
      ts: 'var(--r-small)'
    }
  },
  shortcuts: {
    card: 'relative bg-surface text-fg rounded-tl border border-line shadow-[var(--shadow)]',
    'btn-base':
      'inline-flex items-center gap-2 font-medium rounded-t px-4 py-2 transition-[background-color,color,box-shadow,transform] duration-200 no-underline cursor-pointer select-none',
    'btn-primary': 'btn-base bg-accent text-accent-fg hover:brightness-110 active:translate-y-px',
    'btn-ghost': 'btn-base bg-transparent text-fg border border-line hover:bg-accent-soft',
    tag: 'inline-block rounded-ts bg-accent-soft text-fg text-xs px-2 py-0.5 font-mono',
    link: 'text-accent underline-offset-4 hover:underline',
    'page-title': 'font-display text-4xl md:text-5xl font-semibold tracking-tight',
    'section-title': 'font-display text-2xl font-semibold mt-12 mb-4'
  }
});
