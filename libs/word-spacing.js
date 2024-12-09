import { getLocalStorageItem, WORD_SPACING, removeLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { updateNumberInputValue } from "./fields.js";
import { buttonHoldListner } from "./listners.js";
import { isNumberBetween, notNullUndefinedNaN } from "./type-utils.js";

const MIN_SIZE = 1;
const MAX_SIZE = 20;

const BUTTON_HOLD_THRESH = 10;

const INCREASER_DECREASE_VAL = 0.01;

let baniWordSpacing = null;

export function increaseDecreaseBaniWordSpacingListners() {
  const wordSpacingInput = document.getElementById("word-spacing-input");
  const baniElement = document.getElementById("bani");

  increaseWordSpacingListner(wordSpacingInput, baniElement);
  decreaseWordSpacingListner(wordSpacingInput, baniElement);

  inputChangeListner(wordSpacingInput, baniElement);
}

function inputChangeListner(wordSpacingInput, baniElement) {
  wordSpacingInput.addEventListener("change", (e) => {
    let newWordSpacing = e.target.value;
    if (newWordSpacing) {
      newWordSpacing = Number.parseFloat(newWordSpacing);
    }
    if (notNullUndefinedNaN(newWordSpacing) 
        && isNumberBetween(MIN_SIZE, MAX_SIZE, newWordSpacing)) {
      baniElement.style.wordSpacing = newWordSpacing + "px";
      baniWordSpacing = Number.parseFloat(newWordSpacing);
      saveWordSpacingToLocal(baniWordSpacing);
    } else {
      baniWordSpacing = null;
      baniElement.style.wordSpacing = 'normal';
      removeLocalStorageItem(WORD_SPACING);
    }
  });
}

function increaseWordSpacingListner(wordSpacingInput, baniElement) {
  const wordSpacingIncreaseButton = document.getElementById("word-spacing-increase");

  buttonHoldListner(
    wordSpacingIncreaseButton,
    () => {
      increaesDecreaseWordSpacing(INCREASER_DECREASE_VAL, baniElement, wordSpacingInput);
    },
    () => {
      saveWordSpacingToLocal(baniWordSpacing);
    },
    BUTTON_HOLD_THRESH
  );
}

function decreaseWordSpacingListner(wordSpacingInput, baniElement) {
  const wordSpacingDecreaseButton = document.getElementById("word-spacing-decrease");

  buttonHoldListner(
    wordSpacingDecreaseButton,
    () => {
      increaesDecreaseWordSpacing(-INCREASER_DECREASE_VAL, baniElement, wordSpacingInput);
    },
    () => {
      saveWordSpacingToLocal(baniWordSpacing);
    },
    BUTTON_HOLD_THRESH
  );
}

function increaesDecreaseWordSpacing(increaseDecreaseValue, baniElement, wordSpacingInput) {
  
  let newWordSpacing;
  if (baniWordSpacing) {
    newWordSpacing = baniWordSpacing + increaseDecreaseValue;
  } else {
    newWordSpacing = MIN_SIZE + increaseDecreaseValue;
  }
  if (!isNumberBetween(MIN_SIZE, MAX_SIZE, newWordSpacing)) {
    return;
  }
  baniWordSpacing = newWordSpacing;

  updateNumberInputValue(wordSpacingInput, baniWordSpacing);

  baniElement.style.wordSpacing = baniWordSpacing + "px";
}

export function setwordSpacingInputValue() {
  const wordSpacing = getLocalStorageItem(WORD_SPACING);

  if (!notNullUndefinedNaN(wordSpacing)) {
    baniWordSpacing = null;
    return;
  }

  const inputElement = document.getElementById("word-spacing-input");
  baniWordSpacing = Number.parseFloat(wordSpacing);

  updateNumberInputValue(inputElement, wordSpacing);
}

export function setWordSpacingFromLocalStorage(baniElement) {
  const wordSpacing = getLocalStorageItem(WORD_SPACING);

  if (notNullUndefinedNaN(wordSpacing)) {
    baniWordSpacing = Number.parseFloat(wordSpacing);
    baniElement.style.wordSpacing = baniWordSpacing + "px";
    return;
  }
  baniWordSpacing = null;

  return;
}

function saveWordSpacingToLocal(wordSpacing) {
  if (notNullUndefinedNaN(wordSpacing)) {
    setLocalStorageItem(WORD_SPACING, wordSpacing);
    return;
  }
  return;
}
