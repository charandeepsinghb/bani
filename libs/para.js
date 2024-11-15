export let isParaStyle;

export function isParaStyleEnabled(baniElement) {
  if (isParaStyle != undefined) {
    return;
  }

  isParaStyle = baniElement.classList.contains("enable-para");
  return isParaStyle;
}
