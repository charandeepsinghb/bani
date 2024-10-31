export function setLineHeightBani(lineHeight, baniElement) {
    if (lineHeight > 100 || lineHeight < 10) {
      return;
    }
    baniElement.style.lineHeight = lineHeight + "px";
  }
  