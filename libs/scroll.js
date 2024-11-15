import { getLocalStorageItem, SCROLL, setLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function scrollCheckInitialize(baniElement) {
  const scrollCheckbox = document.getElementById("scroll");
  
  setScrollCheckFromLocal(baniElement, scrollCheckbox);

  scrollCheckedEventAdd(baniElement, scrollCheckbox);
}

function scrollCheckedEventAdd(baniElement, scrollCheckbox) {
  scrollCheckbox.addEventListener("change", (e)=>{
    if (e.target.checked) {
      changeScroll(baniElement, "true");
      setLocalStorageItem(SCROLL, "true");
    } else {
      changeScroll(baniElement, "false");
      setLocalStorageItem(SCROLL, "false");
    }
  });
}

/**
 * 
 * @param {HTMLElement} baniElement 
 * @param {*} scrollCheck 
 */
function changeScroll(baniElement, scrollCheck) {
  // if (scrollCheck === 'true') {
  //   baniElement.classList.remove("hide-shabad");
  // } else if (scrollCheck === 'false') {
  //   baniElement.classList.add("hide-shabad");
  // }
}

function setScrollCheckbox(scrollCheckbox, scrollCheck) {
  if (scrollCheck === 'true') {
    scrollCheckbox.checked = true;
  } else if (scrollCheck === 'false') {
    scrollCheckbox.checked = false;
  }
}

function setScrollCheckFromLocal(baniElement, scrollCheckbox) {
  let scrollCheck = getLocalStorageItem(SCROLL);

  if (!isStringNotBlank(scrollCheck)) {
    scrollCheck = "false";
  }

  changeScroll(baniElement, scrollCheck);
  setScrollCheckbox(scrollCheckbox, scrollCheck);
}
