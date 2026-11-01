import { browser } from '$app/env';
import { DEFAULT_THEME, STORAGE_KEY, isThemeId, type ThemeId } from './themes.js';

function initial(): ThemeId {
  if (!browser) return DEFAULT_THEME;
  const attr = document.documentElement.dataset.theme;
  if (isThemeId(attr)) return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isThemeId(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_THEME;
}

/** Reactive current theme, shared by every component. */
export const theme = $state<{ current: ThemeId }>({ current: initial() });

export function setTheme(id: ThemeId) {
  theme.current = id;
  if (!browser) return;
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable */
  }
}
