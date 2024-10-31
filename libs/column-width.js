export function setBaniColumnWidth(columnWidth, baniElement) {
    if (columnWidth > 200 || columnWidth < 10) {
      return;
    }
    baniElement.style.columnWidth = columnWidth + "vw";
  }
  