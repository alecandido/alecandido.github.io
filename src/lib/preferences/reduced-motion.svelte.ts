import { browser } from '$app/env';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Reactive mirror of the user's reduced-motion preference. */
export const reducedMotion = $state({ current: false });

if (browser) {
  const list = window.matchMedia(QUERY);
  reducedMotion.current = list.matches;
  list.addEventListener('change', (event) => (reducedMotion.current = event.matches));
}
