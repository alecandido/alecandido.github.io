import type { Action } from 'svelte/action';

/**
 * Make an element draggable with mouse or touch. Only presses on the element
 * itself start a drag, so text and controls inside it stay usable. Position
 * is applied as a transform, which never triggers layout.
 */
export const drag: Action<HTMLElement> = (element) => {
  let x = 0;
  let y = 0;
  let lastX = 0;
  let lastY = 0;
  let pointer: number | null = null;

  function down(event: PointerEvent) {
    if (event.target !== element || event.button !== 0) return;
    event.preventDefault();
    pointer = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    element.setPointerCapture(pointer);
    element.classList.add('dragging');
  }

  function move(event: PointerEvent) {
    if (event.pointerId !== pointer) return;
    x += event.clientX - lastX;
    y += event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    element.style.transform = `translate(${x}px, ${y}px)`;
  }

  function up(event: PointerEvent) {
    if (event.pointerId !== pointer) return;
    element.releasePointerCapture(pointer);
    pointer = null;
    element.classList.remove('dragging');
  }

  element.style.touchAction = 'none';
  element.addEventListener('pointerdown', down);
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerup', up);
  element.addEventListener('pointercancel', up);

  return {
    destroy() {
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up);
    }
  };
};
