import { FONT_SIZE, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { notNullUndefinedNaN } from "./type-utils.js";

export function increaseDecreaseBaniFontSize(fontSize, baniElement) {
  if (fontSize > 100 || fontSize < 1) {
    return;
  }
  baniElement.style.fontSize = fontSize + "px";
}

export function setFromLocalFontSize(baniElement) {
  const fontSize = getLocalStorageItem(FONT_SIZE);

  if (notNullUndefinedNaN(fontSize)) {
    baniElement.style.fontSize = fontSize + "px";
    return;
  }

  return;
}

export function setLocalFontSize(fontSize) {
  if (notNullUndefinedNaN(fontSize)) {
    setLocalStorageItem(FONT_SIZE, fontSize);
    return;
  }
  return;
}