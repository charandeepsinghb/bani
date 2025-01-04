import { adjustFloatingButtonPosition } from "../components/floating-button/floating-button.js";

export function addResizeListner() {
  window.addEventListener("resize", () => {
    adjustFloatingButtonPosition();
  });
}
