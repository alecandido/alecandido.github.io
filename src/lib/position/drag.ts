// https://www.w3schools.com/howto/howto_js_draggable.asp
export default (element: HTMLElement) => {
  let shiftX = 0,
    shiftY = 0,
    startX = 0,
    startY = 0;

  element.ontouchstart = grab;
  element.onmousedown = grab;

  function grab(event: MouseEvent | TouchEvent) {
    event = event || window.event;

    // only act on the parent element, otherwise it will be impossible to
    // select text and interact with content in general
    if (event.target !== element) {
      return;
    }

    // TouchEvent has to be unwrapped
    let locatedEvent = unwrapTouch(event);
    if (locatedEvent === null) {
      return;
    }
    event.preventDefault();

    // get the mouse cursor position at startup:
    startX = locatedEvent.clientX;
    startY = locatedEvent.clientY;

    if ('type' in locatedEvent) {
      document.onmouseup = release;
      // call a function whenever the cursor moves:
      document.onmousemove = drag;
    } else {
      document.ontouchend = release;
      // call a function whenever touch drags
      document.ontouchmove = drag;
    }
  }

  function drag(event: MouseEvent | TouchEvent) {
    event = event || window.event;

    // TouchEvent has to be unwrapped
    let locatedEvent = unwrapTouch(event);
    if (locatedEvent === null) {
      return;
    }
    event.preventDefault();

    // calculate the new cursor position:
    shiftX = locatedEvent.clientX - startX;
    shiftY = locatedEvent.clientY - startY;
    startX = locatedEvent.clientX;
    startY = locatedEvent.clientY;
    // set the element's new position:
    let top = parseInt(element.style.top);
    top = Number.isNaN(top) ? 0 : top;
    let left = parseInt(element.style.left);
    left = Number.isNaN(left) ? 0 : left;
    element.style.top = top + shiftY + 'px';
    element.style.left = left + shiftX + 'px';
  }

  function release() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
};

function unwrapTouch(event: MouseEvent | TouchEvent): null | MouseEvent | Touch {
  if ('touches' in event) {
    if (event.touches.length > 1) {
      return null;
    }
    return event.touches[0];
  } else {
    return event;
  }
}
