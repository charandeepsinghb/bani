import { COLUMN_WIDTH, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { notNullUndefinedNaN } from "./type-utils.js";

export function setFromLocalColumnWidth(baniElement) {
  const columnWidth = getLocalStorageItem(COLUMN_WIDTH);

  if (notNullUndefinedNaN(columnWidth)) {
    baniElement.style.columnWidth = columnWidth + "vw";
    return;
  }

  return;
}

export function setLocalColumnWidth(columnWidth) {
  if (notNullUndefinedNaN(columnWidth)) {
    setLocalStorageItem(COLUMN_WIDTH, columnWidth);
    return;
  }
  return;
}
