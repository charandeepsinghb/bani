// Emit multiple events when called continuously
let emitterInterv;
export function continuousEmitterStart(func, params, time) {
  emitterInterv = setInterval(() => {
    func(params);
    console.log("emitting");
  }, time);
}

// Stops event emitting when called
export function continuousEmitterStop(callback) {
  clearInterval(emitterInterv);
  console.log("stopemitting");
  callback();
}
