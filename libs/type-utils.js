/* function notNullUndefinedNaN(value) {
  return value !== null && value !== undefined && value !== NaN;
} */

export function notNullUndefinedNaNAny(...values) {
  for (const v of values) {
    if (v === null || v === undefined || isNaN(v) || v === "undefined") {
      return false;
    }
  }
  return true;
}
