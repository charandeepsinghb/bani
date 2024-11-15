import { addFloatingButton } from "../components/floating-button/floating-button.js";
import { setFromLocalColumnWidth } from "../libs/column-width.js";
import { setFontSizeFromLocalStorage } from "../libs/font-size.js";
import { keyPressInitialize } from "../libs/keypress.js";
import { setLineHeightFromLocalStorage } from "../libs/line-height.js";

const baniElement = document.getElementById("bani");

const floatingButtonContainer = document.getElementById("floating-button-container");

if (floatingButtonContainer != null) addFloatingButton(floatingButtonContainer, baniElement);

function setPropertiesFromLocal() {
  setFontSizeFromLocalStorage(baniElement);
  setFromLocalColumnWidth(baniElement);
  setLineHeightFromLocalStorage(baniElement);
}

function setHeightWidthForFixed() {
  baniElement.style.height = (window.innerHeight) + "px";
}

// setHeightWidthForFixed();
setPropertiesFromLocal();

keyPressInitialize(baniElement);
