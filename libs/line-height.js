import { getLocalStorageItem, LINE_HEIGHT, setLocalStorageItem } from "./local-storage-utils";
import { notNullUndefinedNaN } from "./type-utils";

export function setLineHeightBani(lineHeight, baniElement) {
  if (lineHeight > 100 || lineHeight < 10) {
    return;
  }
  baniElement.style.lineHeight = lineHeight + "px";
}

export function setFromLocalLineHeight(baniElement) {
  const lineHeight = getLocalStorageItem(LINE_HEIGHT);

  if (notNullUndefinedNaN(lineHeight)) {
    baniElement.style.lineHeight = lineHeight + "px";
    return;
  }

  return;
}

export function setLocalLineHeight(lineHeight) {
  if (notNullUndefinedNaN(lineHeight)) {
    setLocalStorageItem(LINE_HEIGHT, lineHeight);
    return;
  }
  return;
}
