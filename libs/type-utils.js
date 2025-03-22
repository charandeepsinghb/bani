export function notNullUndefinedNaN(value) {
  return value !== null && value !== undefined && !isNaN(value) && value !== "undefined" && value !== "";
}

export function notNullUndefinedNaNAny(...values) {
  for (const v of values) {
    if (v === null || v === undefined || isNaN(v) || v === "undefined") {
      return false;
    }
  }
  return true;
}

export function isNumberBetween(first, second, num) {
  if (num >= first && num <= second) {
    return true;
  }
  return false;
}

export function isStringNotBlank(value) {
  return value && typeof value === "string" && value.length > 0;
}

export function isArrayEmpty(array) {
  return !array || array.length == 0;
}
