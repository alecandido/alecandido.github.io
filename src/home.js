/**
 *
 * @param {HTMLElement} el
 * @return {{top: number, left: number}}
 */
function getDocumentOffsetPosition(el) {
  var position = {
    top: el.offsetTop,
    left: el.offsetLeft,
  };
  if (el.offsetParent) {
    var parentPosition = getDocumentOffsetPosition(el.offsetParent);
    position.top += parentPosition.top;
    position.left += parentPosition.left;
  }
  return position;
}

// open/close launcher menu

var menuBtn = document.querySelector(".menu-toggle-btn");
var launcherCol = document.querySelector("#launcher-column");
var launchers = launcherCol.getElementsByClassName("launcher");
var presentationCol = document.querySelector("#presentation-column");

function swapCols() {
  let home = document.querySelector("#home");

  home.insertBefore(home.children[1], home.children[0]);
}

menuBtn.onclick = function () {
  menuBtn.classList.toggle("open");
  launcherCol.classList.toggle("close");
  Object.values(launchers).map((launcher) => {
    launcher.classList.toggle("close");
  });
  presentationCol.classList.toggle("static-pos");

  if (window.innerWidth < 768) {
    swapCols();
  }
};
