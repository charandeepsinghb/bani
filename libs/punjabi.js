import { resetShabadsSize } from "./insert-bani.js";
import { getLocalStorageItem, PUNJABI, setLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function punjabiCheckInitialize(baniElement) {
  const punjabiCheckbox = document.getElementById("punjabi");

  setPunjabiCheckFromLocal(baniElement, punjabiCheckbox);

  punjabiCheckedEventAdd(baniElement, punjabiCheckbox);
}

function punjabiCheckedEventAdd(baniElement, punjabiCheckbox) {
  punjabiCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      changePunjabi(baniElement, "true");
      setLocalStorageItem(PUNJABI, "true");
    } else {
      changePunjabi(baniElement, "false");
      setLocalStorageItem(PUNJABI, "false");
    }
    resetShabadsSize();
  });
}

/**
 *
 * @param {HTMLElement} baniElement
 * @param {*} punjabiCheck
 */
function changePunjabi(baniElement, punjabiCheck) {
  if (punjabiCheck === "true") {
    baniElement.classList.remove("hide-shabad-pu");
  } else if (punjabiCheck === "false") {
    baniElement.classList.add("hide-shabad-pu");
  }
}

function setPunjabiCheckbox(punjabiCheckbox, punjabiCheck) {
  if (punjabiCheck === "true") {
    punjabiCheckbox.checked = true;
  } else if (punjabiCheck === "false") {
    punjabiCheckbox.checked = false;
  }
}

function setPunjabiCheckFromLocal(baniElement, punjabiCheckbox) {
  let punjabiCheck = getLocalStorageItem(PUNJABI);

  if (!isStringNotBlank(punjabiCheck)) {
    punjabiCheck = "false";
  }

  changePunjabi(baniElement, punjabiCheck);
  setPunjabiCheckbox(punjabiCheckbox, punjabiCheck);
}
