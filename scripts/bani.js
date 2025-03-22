import { addFloatingButton } from "../components/floating-button/floating-button.js";
import { setWordSpacingFromLocalStorage } from "../libs/word-spacing.js";
import { setFontSizeFromLocalStorage } from "../libs/font-size.js";
import { keyPressInitialize } from "../libs/keypresss.js";
import { setLineHeightFromLocalStorage } from "../libs/line-height.js";
import { setDarkModeCheckFromLocalGlobal } from "../libs/dark-colors-mode.js";
import { setFontColorFromLocalGlobal } from "../libs/font-color.js";
import { setBackgroundColorFromLocalGlobal } from "../libs/background-color.js";

function onDomReady(callback) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // If the DOM is already ready, execute the callback immediately
    callback();
  } else if (document.addEventListener) {
    // Modern browsers: Use DOMContentLoaded
    document.addEventListener("DOMContentLoaded", callback);
  } else if (document.attachEvent) {
    // Old IE (IE8 and below): Use onreadystatechange
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callback();
      }
    });
  }
}

function initializeBaniApp() {
  const baniElement = document.getElementById("bani");

  if (!baniElement) {
    return;
  }

  const floatingButtonContainer = document.getElementById("floating-button-container");

  if (floatingButtonContainer != null) addFloatingButton(floatingButtonContainer, baniElement);

  function setPropertiesFromLocal() {
    setFontSizeFromLocalStorage(baniElement);
    setLineHeightFromLocalStorage(baniElement);
    setWordSpacingFromLocalStorage(baniElement);
  }

  setPropertiesFromLocal();

  keyPressInitialize(baniElement);
}

// Start all
onDomReady(initializeBaniApp);

// Functions which load immediatly after js starts

setDarkModeCheckFromLocalGlobal();
setBackgroundColorFromLocalGlobal();
setFontColorFromLocalGlobal();
