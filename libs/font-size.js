import { continuousEmitterStart, continuousEmitterStop } from "./emitters.js";
import { FONT_SIZE, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { notNullUndefinedNaN } from "./type-utils.js";

export function setBaniFontSize(fontSize, baniElement) {
  if (fontSize > 100 || fontSize < 1) {
    return;
  }
  baniElement.style.fontSize = fontSize + "px";
}

export function increaseDecreaseBaniFontSize() {
  const fontIncreaseButton = document.getElementById("font-increase");
  const fontDecreaseButton = document.getElementById("font-decrease");

  fontIncreaseButton.addEventListener("pointerdown", (e)=>{
    continuousEmitterStart(increaesDecreaseFontSize, -0.2, 20);
  });
  fontIncreaseButton.addEventListener("pointerup", (e)=>{
    continuousEmitterStop(()=>{});
  });
  fontIncreaseButton.addEventListener("pointerleave", (e)=>{
    continuousEmitterStop(()=>{
      changeFontSize()
    });
  });
}


/*********************** Commons *************************/

const MIN_SIZE = 1;
const MAX_SIZE = 200;

function setInputValue(value, fieldId) {
  document.getElementById(fieldId).value = Number.parseFloat(value).toFixed(2);
}

function setCheckedAttribute(value, fieldId) {
  if (value === "true") {
    document.getElementById(fieldId).setAttribute("checked", true);
    return;
  }
  document.getElementById(fieldId).removeAttribute("checked");
}

function isBetween(first, second, num) {
  if (num >= first && num <= second) {
    return true;
  }
  return false;
}

function extractNumberFromProperty(property) {
  return Number.parseFloat(property.substring(0, property.length - 2));
}

/*********************** Fonts and text *************************/

const baniSection = document.getElementById("bani");

let currentFontSize;
let numberFontSize;

function increaesDecreaseFontSize(increaseDecreaseValue) {
  let newNumberFontSize = numberFontSize + increaseDecreaseValue;
  if (!isBetween(MIN_SIZE, MAX_SIZE, numberFontSize)) {
    return;
  }
  numberFontSize = newNumberFontSize;
  setInputValue(numberFontSize, 'currentFontSize');
  baniSection.style.fontSize = numberFontSize + "px";
}

function changeFontSize(size) {
  if (!isBetween(MIN_SIZE, MAX_SIZE, size)) {
    return;
  }
  numberFontSize = Number.parseFloat(size);
  baniSection.style.fontSize = size + 'px';
  localStorage.setItem('savedFontSize', size);
}

/*********************** Fonts and text *************************/


export function setFromLocalFontSize(baniElement) {
  const fontSize = getLocalStorageItem(FONT_SIZE);

  if (notNullUndefinedNaN(fontSize)) {
    
    // Get current font size of bani section
    currentFontSize = window.getComputedStyle(baniElement).getPropertyValue('font-size');

    // Number format font size
    numberFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));
    setInputValue(numberFontSize, 'currentFontSize');
    
    baniElement.style.fontSize = fontSize + "px";
    return;
  }

  return;
}

export function setLocalFontSize(fontSize) {
  if (notNullUndefinedNaN(fontSize)) {
    setLocalStorageItem(FONT_SIZE, fontSize);
    return;
  }
  return;
}
