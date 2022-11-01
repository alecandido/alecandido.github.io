// https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/
import { readable } from 'svelte/store';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

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
