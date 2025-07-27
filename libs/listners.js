import { continuousEmitterStart, continuousEmitterStop } from "./emitters.js";

export function buttonHoldListner(element, startCallback, stopCallback, time) {
  element.addEventListener("pointerdown", (e) => {
    continuousEmitterStart(() => {
      startCallback();
    }, time);
  });

  const stopFn = () => {
    continuousEmitterStop(stopCallback);
  };

  element.addEventListener("pointerup", stopFn);
  element.addEventListener("pointerleave", stopFn);
  element.addEventListener("pointercancel", stopFn);
}
