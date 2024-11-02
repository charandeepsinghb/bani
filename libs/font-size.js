import { updateNumberInputValue } from "./fields.js";
import { buttonHoldListner } from "./listners.js";
import { FONT_SIZE, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { isNumberBetween, notNullUndefinedNaN } from "./type-utils.js";

const MIN_SIZE = 1;
const MAX_SIZE = 200;

const BUTTON_HOLD_THRESH = 10;

const INCREASER_DECREASE_VAL = 0.2;

export function increaseDecreaseBaniFontSizeListners() {
  const fontInput = document.getElementById("font-input");
  const baniElement = document.getElementById("bani");

  increaseFontSizeListner(fontInput, baniElement);
  decreaseFontSizeListner(fontInput, baniElement);

  inputChangeListner(fontInput, baniElement);
}

function inputChangeListner(fontInput, baniElement) {
  fontInput.addEventListener("change", (e)=>{
    if (notNullUndefinedNaN(e.target.value) && isNumberBetween(MIN_SIZE, MAX_SIZE, e.target.value)) {
      // update
      baniElement.style.fontSize = e.target.value + "px";
      // save
      saveFontSizeToLocal(baniElement);
    }
  });
}

function increaseFontSizeListner(fontInput, baniElement) {
  const fontIncreaseButton = document.getElementById("font-increase");

  buttonHoldListner(
    fontIncreaseButton,
    () => {
      increaesDecreaseFontSize(INCREASER_DECREASE_VAL, baniElement, fontInput);
    },
    () => {
      saveFontSizeToLocal(baniElement);
    },
    BUTTON_HOLD_THRESH
  );
}

function decreaseFontSizeListner(fontInput, baniElement) {
  const fontDecreaseButton = document.getElementById("font-decrease");

  buttonHoldListner(
    fontDecreaseButton,
    () => {
      increaesDecreaseFontSize(-INCREASER_DECREASE_VAL, baniElement, fontInput);
    },
    () => {
      saveFontSizeToLocal(baniElement);
    },
    BUTTON_HOLD_THRESH
  );
}

export function setFontInputValue() {
  const baniElement = document.getElementById("bani");

  // Get current font size of bani section
  const currentFontSize = window.getComputedStyle(baniElement).getPropertyValue("font-size");

  // Number format font size
  const numberFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));

  const inputElement = document.getElementById("font-input");

  updateNumberInputValue(inputElement, numberFontSize);
}

function increaesDecreaseFontSize(increaseDecreaseValue, baniElement, fontInput) {
  const currentFontSize = window.getComputedStyle(baniElement).getPropertyValue("font-size");

  // Number format font size
  const numberCurrentFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));

  let newNumberFontSize = numberCurrentFontSize + increaseDecreaseValue;
  if (!isNumberBetween(MIN_SIZE, MAX_SIZE, newNumberFontSize)) {
    return;
  }

  updateNumberInputValue(fontInput, newNumberFontSize);

  baniElement.style.fontSize = newNumberFontSize + "px";
}

export function setFontSizeFromLocalStorage(baniElement) {
  const fontSize = getLocalStorageItem(FONT_SIZE);

  if (notNullUndefinedNaN(fontSize)) {
    baniElement.style.fontSize = fontSize + "px";
    return;
  }

  return;
}

function saveFontSizeToLocal(baniElement) {
  const currentFontSize = window.getComputedStyle(baniElement).getPropertyValue("font-size");

  // Number format font size
  const numberCurrentFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));

  if (notNullUndefinedNaN(numberCurrentFontSize)) {
    setLocalStorageItem(FONT_SIZE, numberCurrentFontSize);
    return;
  }
  return;
}
