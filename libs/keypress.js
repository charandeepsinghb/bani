import { nextButtonClick, previousButtonClick } from "./nextprev.js";

export function keyPressInitialize(baniElement) {
  addLeftRightArrowEvents(baniElement);
}

function addLeftRightArrowEvents(baniElement) {
  document.addEventListener("keydown", (e) => {
    // Left navigation actions
    if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
      previousButtonClick(baniElement);
    }
    // Right navigation actions
    else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
      nextButtonClick(baniElement);
    }
  });
}
