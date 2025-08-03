import { adjustFloatingButtonPosition } from "../components/floating-button/floating-button.js";
import { resetShabadsSize } from "./insert-bani.js";

export function toggleFullScreen() {
  try {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        resetShabadsSize();
        adjustFloatingButtonPosition();
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        resetShabadsSize();
        adjustFloatingButtonPosition();
      });
    }
  } catch (e) {
    console.warn("Full screen not possible!");
  }
  androidFullScreenToggle();
}

function androidFullScreenToggle() {
  try {
    if (AndroidInterface) {
      AndroidInterface.toggleFullscreen();
    }
  } catch (e) {
    console.warn("AndroidInterface.toggleFullscreen Error!");
  }
}
