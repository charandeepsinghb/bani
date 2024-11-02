import { continuousEmitterStart, continuousEmitterStop } from "./emitters.js";

export function buttonHoldListner(element, startCallback, stopCallback, time) {
  element.addEventListener("pointerdown", (e) => {
    continuousEmitterStart(() => {
      startCallback();
    }, time);
  });
  element.addEventListener("pointerup", (e) => {
    continuousEmitterStop(() => {
      stopCallback();
    });
  });
  element.addEventListener("pointerleave", (e) => {
    continuousEmitterStop(() => {
      stopCallback();
    });
  });
}
