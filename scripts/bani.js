import { addFloatingButton } from "../components/floating-button/floating-button.js";
import { setFromLocalColumnWidth } from "../libs/column-width.js";
import { setFontSizeFromLocalStorage } from "../libs/font-size.js";
import { setLineHeightFromLocalStorage } from "../libs/line-height.js";

const floatingButtonContainer = document.getElementById("floating-button-container");

if (floatingButtonContainer != null) addFloatingButton(floatingButtonContainer);

const baniElement = document.getElementById("bani");

function setPropertiesFromLocal() {
  setFontSizeFromLocalStorage(baniElement);
  setFromLocalColumnWidth(baniElement);
  setLineHeightFromLocalStorage(baniElement);
}

function setHeightWidthForFixed() {
  baniElement.style.height = (window.innerHeight) + "px";
}

setHeightWidthForFixed();
setPropertiesFromLocal();
