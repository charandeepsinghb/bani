import { getLocalStorageItem, FONT_COLOR, setLocalStorageItem, removeLocalStorageItem, FONT_COLOR_SECOND } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function fontColorInitialize() {
  const fontColorbox = document.getElementById("font-color");
  const fontColorboxSecond = document.getElementById("font-color-picker-2");

  setFontColorFromLocal(fontColorbox, FONT_COLOR);
  setFontColorFromLocal(fontColorboxSecond, FONT_COLOR_SECOND);

  fontColoredEventAdd(fontColorbox, FONT_COLOR);
  fontColoredEventAdd(fontColorboxSecond, FONT_COLOR_SECOND);

  resetFontColorListner(fontColorbox);

  clickPickerToChangeColorEvent(fontColorbox);
  clickPickerToChangeColorEvent(fontColorboxSecond);
}

function clickPickerToChangeColorEvent(fontColorbox) {
  fontColorbox.addEventListener("click", (e) => {
    changeFontColor(e.target.value);
  });
}

function fontColoredEventAdd(fontColorbox, localItemName) {
  fontColorbox.addEventListener("change", (e) => {
    changeFontColor(e.target.value);
    setLocalStorageItem(localItemName, e.target.value);
  });
}

function changeFontColor(fontColor) {
  document.documentElement.style.setProperty("--font-color", fontColor);
}

function setFontColorbox(fontColorbox, fontColor) {
  fontColorbox.value = fontColor;
}

function setFontColorFromLocal(fontColorbox, localItemName) {
  let fontColor = getLocalStorageItem(localItemName);

  if (!isStringNotBlank(fontColor)) {
    return;
  }

  setFontColorbox(fontColorbox, fontColor);
}

const WHITE = "#ffffff";
const BLACK = "#000000";

function resetFontColorListner(fontColorbox) {
  const fontResetIcon = document.getElementById("font-reset-icon");

  fontResetIcon.addEventListener("click", () => {
    document.documentElement.style.setProperty("--font-color", BLACK);
    setFontColorbox(fontColorbox, BLACK);
    setLocalStorageItem(FONT_COLOR, BLACK);
  });
}

export function setFontColorFromLocalGlobal() {
  let fontColor = getLocalStorageItem(FONT_COLOR);
  if (!isStringNotBlank(fontColor)) {
    return;
  }
  changeFontColor(fontColor);
}
