// Emit multiple events when called continuously
let emitterInterv;
export function continuousEmitterStart(func, time) {
  emitterInterv = setInterval(() => {
    func();
  }, time);
}

// Stops event emitting when called
export function continuousEmitterStop(callback) {
  clearInterval(emitterInterv);
  callback();
}
