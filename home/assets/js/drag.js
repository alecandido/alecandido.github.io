// https://www.w3schools.com/howto/howto_js_draggable.asp

function dragElement(elmnt) {
  let shiftX = 0,
    shiftY = 0,
    startX = 0,
    startY = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    startX = e.clientX;
    startY = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    shiftX = e.clientX - startX;
    shiftY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    // set the element's new position:
    let top = parseInt(elmnt.style.top);
    top = Number.isNaN(top) ? 0 : top;
    let left = parseInt(elmnt.style.left);
    left = Number.isNaN(left) ? 0 : left;
    elmnt.style.top = top + shiftY + "px";
    elmnt.style.left = left + shiftX + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
