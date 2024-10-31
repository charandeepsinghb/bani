export function increaseDecreaseBaniFontSize(fontSize, baniElement) {
  if (fontSize > 100 || fontSize < 1) {
    return;
  }
  baniElement.style.fontSize = fontSize + "px";
}
