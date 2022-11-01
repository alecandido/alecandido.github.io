// https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/
import { readable } from 'svelte/store';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

// XXX: access only on client (i.e. inside `onMount`), requires window
export default readable(false, (set) => {
  set(window.matchMedia(reducedMotionQuery).matches);

  const updateMotionPreference = (event: MediaQueryListEvent) => {
    set(event.matches);
  };

  const mediaQueryList = window.matchMedia(reducedMotionQuery);
  mediaQueryList.addEventListener('change', updateMotionPreference);

  return () => {
    mediaQueryList.removeEventListener('change', updateMotionPreference);
  };
});
