/** Registry of the available themes; the CSS tokens live in themes.css. */
export const themes = [
  {
    id: 'qibocamp',
    name: 'Camp',
    description: 'Light, calm, a touch of purple',
    swatch: ['#f7f7f7', '#833dff', '#ebe0ff']
  },
  {
    id: 'institute',
    name: 'Institute',
    description: 'Dark, cinematic, teal and ember',
    swatch: ['#0f1821', '#7eddd3', '#ff4713']
  },
  {
    id: 'psycho',
    name: 'Psycho',
    description: 'Deep navy, magenta, mint. Loud',
    swatch: ['#0a0d24', '#d250ff', '#2dffd2']
  },
  {
    id: 'cyber',
    name: 'Cyber',
    description: 'Black, neon, HUD frames',
    swatch: ['#050607', '#f2ff00', '#00f0ff']
  }
] as const;

export type ThemeId = (typeof themes)[number]['id'];

export const DEFAULT_THEME: ThemeId = 'qibocamp';

export const STORAGE_KEY = 'theme';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}
