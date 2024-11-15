import { resetShabadsSize } from "./insert-bani.js";

export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(()=>{
      resetShabadsSize();
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen().then(()=>{
      resetShabadsSize();
    });
  }
}
