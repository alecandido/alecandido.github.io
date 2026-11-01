import { browser } from '$app/env';
import {
  DEFAULT_DARK_THEME,
  DEFAULT_THEME,
  STORAGE_KEY,
  isThemeId,
  type ThemeId
} from './themes.js';

const DARK = '(prefers-color-scheme: dark)';

function stored(): ThemeId | undefined {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (isThemeId(value)) return value;
  } catch {
    /* storage unavailable */
  }
}

function fallback(): ThemeId {
  return browser && matchMedia(DARK).matches ? DEFAULT_DARK_THEME : DEFAULT_THEME;
}

function initial(): ThemeId {
  if (!browser) return DEFAULT_THEME;
  const attr = document.documentElement.dataset.theme;
  if (isThemeId(attr)) return attr;
  return stored() ?? fallback();
}

/** Reactive current theme, shared by every component. */
export const theme = $state<{ current: ThemeId }>({ current: initial() });

function apply(id: ThemeId) {
  theme.current = id;
  if (browser) document.documentElement.dataset.theme = id;
}

export function setTheme(id: ThemeId) {
  apply(id);
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable */
  }
}

// Until a theme is chosen explicitly, follow the system colour scheme.
if (browser) {
  matchMedia(DARK).addEventListener('change', () => {
    if (!stored()) apply(fallback());
  });
}
