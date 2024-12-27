import { getLocalStorageItem, DARK_MODE, setLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function darkModeCheckInitialize() {
  const darkModeCheckbox = document.getElementById("dark-mode");
  
  setDarkModeCheckFromLocal(darkModeCheckbox);

  darkModeCheckedEventAdd(darkModeCheckbox);
}

function darkModeCheckedEventAdd(darkModeCheckbox) {
  darkModeCheckbox.addEventListener("change", (e)=>{
    if (e.target.checked) {
      changeDarkMode("true");
      setLocalStorageItem(DARK_MODE, "true");
    } else {
      changeDarkMode("false");
      setLocalStorageItem(DARK_MODE, "false");
    }
  });
}

/**
 * 
 * @param {*} darkModeCheck 
 */
function changeDarkMode(darkModeCheck) {
  if (darkModeCheck === 'true') {
    toggleDarkMode(true);
  } else if (darkModeCheck === 'false') {
    toggleDarkMode(false);
  }
}

function setDarkModeCheckbox(darkModeCheckbox, darkModeCheck) {
  if (darkModeCheck === 'true') {
    darkModeCheckbox.checked = true;
  } else if (darkModeCheck === 'false') {
    darkModeCheckbox.checked = false;
  }
}

function setDarkModeCheckFromLocal(darkModeCheckbox) {
  let darkModeCheck = getLocalStorageItem(DARK_MODE);

  if (!isStringNotBlank(darkModeCheck)) {
    darkModeCheck = "false";
  }

  setDarkModeCheckbox(darkModeCheckbox, darkModeCheck);
}

export function setDarkModeCheckFromLocalGlobal() {
  let darkModeCheck = getLocalStorageItem(DARK_MODE);
  if (!isStringNotBlank(darkModeCheck)) {
    darkModeCheck = "false";
  }
  changeDarkMode(darkModeCheck);
}

/*********************** Color themes *************************/

const DARK_BACKGROUND_COLOR = '#121212';
const DARK_TEXT_COLOR = '#E0E0E0';

const WHITE = '#ffffff';
const BLACK = '#000000';

function toggleDarkMode(isOn) {
  if (isOn) {
    // document.documentElement.style.setProperty('--font-color', DARK_TEXT_COLOR);
    // document.documentElement.style.setProperty('--background-color', DARK_BACKGROUND_COLOR);
    document.body.classList.add("dark-mode");
    return;
  }

  // document.documentElement.style.setProperty('--font-color', BLACK);
  // document.documentElement.style.setProperty('--background-color', WHITE);
  document.body.classList.remove("dark-mode");
}

/*********************** Theme *************************/

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

// Theme change event listener
darkThemeMq.addEventListener("change", e => {
  const darkModeCheckbox = document.getElementById("dark-mode");
  if (e.matches) {
    toggleDarkMode(true);
    setDarkModeCheckbox(darkModeCheckbox, 'true');
  } else {
    toggleDarkMode(false);
    setDarkModeCheckbox(darkModeCheckbox, 'false');
  }
});

