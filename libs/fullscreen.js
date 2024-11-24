import { adjustFloatingButtonPosition } from "../components/floating-button/floating-button.js";
import { resetShabadsSize } from "./insert-bani.js";

export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(()=>{
      resetShabadsSize();
      adjustFloatingButtonPosition();
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen().then(()=>{
      resetShabadsSize();
      adjustFloatingButtonPosition();
    });
  }
}
