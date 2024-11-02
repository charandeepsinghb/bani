import { alignButtonListners } from "../../libs/align.js";
import { increaseDecreaseBaniFontSizeListners, setFontInputValue } from "../../libs/font-size.js";
import { increaseDecreaseBaniLineHeightListners, setlineHeightInputValue } from "../../libs/line-height.js";
import { cleanLocalStoreage } from "../../libs/local-storage-utils.js";

export let menuOpen = false;

export function addMenu(menuContainer) {
  fetch("components/menu/menu.html")
    .then((data) => {
      data.text().then((t) => {
        menuContainer.innerHTML = t;

        menuAddedCallback();
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

let menu;

function menuAddedCallback() {
  if (!menu) {
    menu = document.getElementById("menu");
  }
  initializeMenuButtons();
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

function addButtonInputListners() {
  increaseDecreaseBaniFontSizeListners();
  increaseDecreaseBaniLineHeightListners();

  alignButtonListners();
}

function setFieldValuesFromLocal() {
  setFontInputValue();
  setlineHeightInputValue();
}

function initializeMenuButtons() {
  resetAllLocalButton();
  addButtonInputListners();
  setFieldValuesFromLocal();

  // Align init
}
