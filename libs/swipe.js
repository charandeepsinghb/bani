import { nextButtonClick, previousButtonClick } from "./nextprev";

function enableSwipeOnElement(element, callback) {
  let startX = 0;
  let startY = 0;
  let isTouching = false;
  const threshold = 50; // Minimum X movement in px
  const restraint = 100; // Maximum Y deviation allowed
  const allowedTime = 500; // Maximum time for swipe
  let startTime = 0;

  element.style.touchAction = "none"; // Prevents browser's default touch handling

  element.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      isTouching = true;
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
    }
  });

  element.addEventListener("pointerup", function (e) {
    if (!isTouching) return;
    isTouching = false;

    const distX = e.clientX - startX;
    const distY = e.clientY - startY;
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime <= allowedTime && Math.abs(distY) <= restraint) {
      if (Math.abs(distX) >= threshold) {
        if (distX < 0) {
          callback("left");
        } else {
          callback("right");
        }
      }
    }
  });

  // Optional: cancel tracking on lost pointer
  element.addEventListener("pointercancel", () => {
    isTouching = false;
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
