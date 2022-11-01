import type { EmptyHandler, Timer } from './types';

export function createClickHandler(threshold: number, handler: EmptyHandler) {
  let count = 0;
  let timerID: Timer;

  return function countClicks(_event: Event) {
    clearTimeout(timerID);
    count++;
    console.log(count);

    if (count >= threshold) {
      handler();
      count = 0;
      return;
    }

    timerID = setTimeout(() => {
      count = 0;
    }, 500);
  };
}
