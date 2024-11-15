import { resetShabadsSize } from "./insert-bani.js";
import { getLocalStorageItem, ENGLISH, setLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function englishCheckInitialize(baniElement) {
  const englishCheckbox = document.getElementById("english");
  
  setEnglishCheckFromLocal(baniElement, englishCheckbox);

  englishCheckedEventAdd(baniElement, englishCheckbox);
}

function englishCheckedEventAdd(baniElement, englishCheckbox) {
  englishCheckbox.addEventListener("change", (e)=>{
    if (e.target.checked) {
      changeEnglish(baniElement, "true");
      setLocalStorageItem(ENGLISH, "true");
    } else {
      changeEnglish(baniElement, "false");
      setLocalStorageItem(ENGLISH, "false");
    }
    resetShabadsSize();
  });
}

/**
 * 
 * @param {HTMLElement} baniElement 
 * @param {*} englishCheck 
 */
function changeEnglish(baniElement, englishCheck) {
  if (englishCheck === 'true') {
    baniElement.classList.remove("hide-shabad-en");
  } else if (englishCheck === 'false') {
    baniElement.classList.add("hide-shabad-en");
  }
}

function setEnglishCheckbox(englishCheckbox, englishCheck) {
  if (englishCheck === 'true') {
    englishCheckbox.checked = true;
  } else if (englishCheck === 'false') {
    englishCheckbox.checked = false;
  }
}

function setEnglishCheckFromLocal(baniElement, englishCheckbox) {
  let englishCheck = getLocalStorageItem(ENGLISH);

  if (!isStringNotBlank(englishCheck)) {
    englishCheck = "false";
  }

  changeEnglish(baniElement, englishCheck);
  setEnglishCheckbox(englishCheckbox, englishCheck);
}
