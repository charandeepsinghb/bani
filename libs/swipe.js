import { nextButtonClick, previousButtonClick } from "./nextprev";

function enableSwipeOnElement(element, callback) {
  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  const threshold = 50;
  const restraint = 100;
  const allowedTime = 500;
  let startTime = 0;

  element.style.touchAction = "pan-y"; // Preserve vertical scrolling

  element.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    isSwiping = true;
  });

  element.addEventListener(
    "pointermove",
    function (e) {
      if (!isSwiping) return;

      const distX = e.clientX - startX;
      const distY = e.clientY - startY;

      if (Math.abs(distX) > Math.abs(distY)) {
        // If swiping horizontally, prevent default vertical scroll
        e.preventDefault();
      }
    },
    { passive: false }
  ); // passive: false is needed to call e.preventDefault()

  element.addEventListener("pointerup", function (e) {
    if (!isSwiping) return;
    isSwiping = false;

    const distX = e.clientX - startX;
    const distY = e.clientY - startY;
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime <= allowedTime && Math.abs(distY) <= restraint) {
      if (Math.abs(distX) >= threshold) {
        callback(distX > 0 ? "right" : "left");
      }
    }
  });

  element.addEventListener("pointercancel", () => {
    isSwiping = false;
  });
}

export const swipeState = {
  enabled: true
};

export function swipeInitialize(baniElement) {
  enableSwipeOnElement(baniElement, (direction) => {
    if (swipeState.enabled) {
      if (direction === "left") {
        nextButtonClick(baniElement);
      } else if (direction === "right") {
        previousButtonClick(baniElement);
      }
    }
  });
}
