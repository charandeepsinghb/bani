import { COLUMN_WIDTH, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils";
import { notNullUndefinedNaN } from "./type-utils";

export function setBaniColumnWidth(columnWidth, baniElement) {
    if (columnWidth > 200 || columnWidth < 10) {
      return;
    }
    baniElement.style.columnWidth = columnWidth + "vw";
  }
  



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