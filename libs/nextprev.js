import { showNext, showPrev } from "./insert-bani.js";

export function previousButtonClick(baniElement) {
  // let computed = window.getComputedStyle(baniElement);

  // const width = Number.parseFloat(computed.width.substring(0, computed.width.length - 2));

  // baniElement.scrollBy(-width, 0);
  showPrev(baniElement);
}

export function nextButtonClick(baniElement) {
  // let computed = window.getComputedStyle(baniElement);

  // const width = Number.parseFloat(computed.width.substring(0, computed.width.length - 2));

  // baniElement.scrollBy(+width, 0);
  showNext(baniElement);
}
