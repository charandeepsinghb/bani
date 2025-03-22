import { alignButtonListners } from "../../libs/align.js";
import { backgroundColorInitialize } from "../../libs/background-color.js";
import { bookmarkInitialize } from "../../libs/bookmarks.js";
import { darkModeCheckInitialize } from "../../libs/dark-colors-mode.js";
import { englishCheckInitialize } from "../../libs/english.js";
import { fontColorInitialize } from "../../libs/font-color.js";
import { increaseDecreaseBaniFontSizeListners, setFontInputValue } from "../../libs/font-size.js";
import { initializeBaniShow, resetShabadsSize } from "../../libs/insert-bani.js";
import { increaseDecreaseBaniLineHeightListners, setlineHeightInputValue } from "../../libs/line-height.js";
import { cleanLocalStoreage } from "../../libs/local-storage-utils.js";
import { punjabiCheckInitialize } from "../../libs/punjabi.js";
import { increaseDecreaseBaniWordSpacingListners, setwordSpacingInputValue } from "../../libs/word-spacing.js";
// import { scrollCheckInitialize } from "../../libs/scroll.js";

export let menuOpen = false;

export function addMenu(menuContainer, baniElement) {
  fetch("components/menu/menu.html")
    .then((data) => {
      data.text().then((t) => {
        menuContainer.innerHTML = t;

        menuAddedCallback(baniElement);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

let menu;

function menuAddedCallback(baniElement) {
  if (!menu) {
    menu = document.getElementById("menu");
  }
  initializeMenuButtons(baniElement);
}

export function toggleOpenCloseMenu() {
  if (!menu) {
    menu = document.getElementById("menu");
  }
  if (menuOpen) {
    // menu.style.display = "none";
    menu.classList.add("menuClose");
  } else {
    menu.classList.remove("menuClose");
    // menu.style.display = "block";
  }

  menuOpen = !menuOpen;
}

function resetAllLocalButton() {
  const resetAllLocal = document.getElementById("reset-icon");

  resetAllLocal.addEventListener("click", () => {
    cleanLocalStoreage();
    location.reload();
  });
}

function restartButton() {
  const restartBani = document.getElementById("restart-icon");

  restartBani.addEventListener("click", () => {
    resetShabadsSize(1);
  });
}

function addButtonInputListners(baniElement) {
  increaseDecreaseBaniFontSizeListners();
  increaseDecreaseBaniLineHeightListners();
  increaseDecreaseBaniWordSpacingListners();

  alignButtonListners();

  // scrollCheckInitialize(baniElement);
  punjabiCheckInitialize(baniElement);
  englishCheckInitialize(baniElement);
  darkModeCheckInitialize();
  fontColorInitialize();
  backgroundColorInitialize();

  bookmarkInitialize(baniElement);
}

function setFieldValuesFromLocal(baniElement) {
  setFontInputValue();
  setlineHeightInputValue();
  setwordSpacingInputValue();

  initializeBaniShow(baniElement);
}

function initializeMenuButtons(baniElement) {
  resetAllLocalButton();
  restartButton();
  addButtonInputListners(baniElement);
  setFieldValuesFromLocal(baniElement);
}
