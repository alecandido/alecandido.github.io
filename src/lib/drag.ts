// https://www.w3schools.com/howto/howto_js_draggable.asp
export default (element: HTMLElement) => {
  let shiftX = 0,
    shiftY = 0,
    startX = 0,
    startY = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(event: MouseEvent) {
    event = event || window.event;

    // only act on the parent element, otherwise it will be impossible to
    // select text and interact with content in general
    if (event.target !== element) {
      return;
    }
    event.preventDefault();

    // get the mouse cursor position at startup:
    startX = event.clientX;
    startY = event.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(event: MouseEvent) {
    event = event || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    shiftX = event.clientX - startX;
    shiftY = event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    // set the element's new position:
    let top = parseInt(element.style.top);
    top = Number.isNaN(top) ? 0 : top;
    let left = parseInt(element.style.left);
    left = Number.isNaN(left) ? 0 : left;
    element.style.top = top + shiftY + 'px';
    element.style.left = left + shiftX + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};
