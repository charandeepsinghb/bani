import { getLocalStorageItem, LINE_HEIGHT, removeLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { updateNumberInputValue } from "./fields.js";
import { buttonHoldListner } from "./listners.js";
import { isNumberBetween, notNullUndefinedNaN } from "./type-utils.js";

const MIN_SIZE = 1;
const MAX_SIZE = 10;

const BUTTON_HOLD_THRESH = 10;

const INCREASER_DECREASE_VAL = 0.01;

let baniLineHeight = null;

export function increaseDecreaseBaniLineHeightListners() {
  const lineHeightInput = document.getElementById("line-height-input");
  const baniElement = document.getElementById("bani");

  increaseLineHeightListner(lineHeightInput, baniElement);
  decreaseLineHeightListner(lineHeightInput, baniElement);

  inputChangeListner(lineHeightInput, baniElement);
}

function inputChangeListner(lineHeightInput, baniElement) {
  lineHeightInput.addEventListener("change", (e) => {
    const newLineHeight = e.target.value;
    if (notNullUndefinedNaN(newLineHeight) 
        && isNumberBetween(MIN_SIZE, MAX_SIZE, newLineHeight)) {
      baniElement.style.lineHeight = newLineHeight;
      baniLineHeight = Number.parseFloat(newLineHeight);
      saveLineHeightToLocal(baniLineHeight);
    } else {
      baniLineHeight = null;
      baniElement.style.lineHeight = 'normal';
      removeLocalStorageItem(LINE_HEIGHT);
    }
  });
}

function increaseLineHeightListner(lineHeightInput, baniElement) {
  const lineHeightIncreaseButton = document.getElementById("line-height-increase");

  buttonHoldListner(
    lineHeightIncreaseButton,
    () => {
      increaesDecreaseLineHeight(INCREASER_DECREASE_VAL, baniElement, lineHeightInput);
    },
    () => {
      saveLineHeightToLocal(baniLineHeight);
    },
    BUTTON_HOLD_THRESH
  );
}

function decreaseLineHeightListner(lineHeightInput, baniElement) {
  const lineHeightDecreaseButton = document.getElementById("line-height-decrease");

  buttonHoldListner(
    lineHeightDecreaseButton,
    () => {
      increaesDecreaseLineHeight(-INCREASER_DECREASE_VAL, baniElement, lineHeightInput);
    },
    () => {
      saveLineHeightToLocal(baniLineHeight);
    },
    BUTTON_HOLD_THRESH
  );
}

function increaesDecreaseLineHeight(increaseDecreaseValue, baniElement, lineHeightInput) {
  
  let newLineHeight;
  if (baniLineHeight) {
    newLineHeight = baniLineHeight + increaseDecreaseValue;
  } else {
    newLineHeight = MIN_SIZE + increaseDecreaseValue;
  }
  if (!isNumberBetween(MIN_SIZE, MAX_SIZE, newLineHeight)) {
    return;
  }
  baniLineHeight = newLineHeight;

  updateNumberInputValue(lineHeightInput, baniLineHeight);

  baniElement.style.lineHeight = baniLineHeight;
}

export function setlineHeightInputValue() {
  const lineHeight = getLocalStorageItem(LINE_HEIGHT);

  if (!notNullUndefinedNaN(lineHeight)) {
    baniLineHeight = null;
    return;
  }

  const inputElement = document.getElementById("line-height-input");
  baniLineHeight = Number.parseFloat(lineHeight);

  updateNumberInputValue(inputElement, lineHeight);
}

export function setLineHeightFromLocalStorage(baniElement) {
  const lineHeight = getLocalStorageItem(LINE_HEIGHT);

  if (notNullUndefinedNaN(lineHeight)) {
    baniLineHeight = Number.parseFloat(lineHeight);
    baniElement.style.lineHeight = baniLineHeight;
    return;
  }
  baniLineHeight = null;

  return;
}

function saveLineHeightToLocal(lineHeight) {
  if (notNullUndefinedNaN(lineHeight)) {
    setLocalStorageItem(LINE_HEIGHT, lineHeight);
    return;
  }
  return;
}
