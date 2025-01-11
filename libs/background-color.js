import { getLocalStorageItem, BACKGROUND_COLOR, setLocalStorageItem, BACKGROUND_COLOR_SECOND } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function backgroundColorInitialize() {
  const backgroundColorbox = document.getElementById("background-color");
  const backgroundColorboxSecond = document.getElementById("background-color-picker-2");

  setBackgroundColorFromLocal(backgroundColorbox, BACKGROUND_COLOR);
  setBackgroundColorFromLocal(backgroundColorboxSecond, BACKGROUND_COLOR_SECOND);

  backgroundColoredEventAdd(backgroundColorbox, BACKGROUND_COLOR);
  backgroundColoredEventAdd(backgroundColorboxSecond, BACKGROUND_COLOR_SECOND);

  resetBackgroundColorListner(backgroundColorbox);

  clickPickerToChangeColorEvent(backgroundColorbox);
  clickPickerToChangeColorEvent(backgroundColorboxSecond);
}

function clickPickerToChangeColorEvent(backgroundColorbox) {
  backgroundColorbox.addEventListener("click", (e) => {
    changeBackgroundColor(e.target.value);
  });
}

function backgroundColoredEventAdd(backgroundColorbox, localItemName) {
  backgroundColorbox.addEventListener("change", (e) => {
    changeBackgroundColor(e.target.value);
    setLocalStorageItem(localItemName, e.target.value);
  });
}

function changeBackgroundColor(backgroundColor) {
  document.documentElement.style.setProperty("--background-color", backgroundColor);
}

function setBackgroundColorbox(backgroundColorbox, backgroundColor) {
  backgroundColorbox.value = backgroundColor;
}

function setBackgroundColorFromLocal(backgroundColorbox, localItemName) {
  let backgroundColor = getLocalStorageItem(localItemName);

  if (!isStringNotBlank(backgroundColor)) {
    return;
  }

  setBackgroundColorbox(backgroundColorbox, backgroundColor);
}

const WHITE = "#ffffff";
const BLACK = "#000000";

function resetBackgroundColorListner(backgroundColorbox) {
  const backgroundResetIcon = document.getElementById("background-reset-icon");

  backgroundResetIcon.addEventListener("click", () => {
    document.documentElement.style.setProperty("--background-color", WHITE);
    setBackgroundColorbox(backgroundColorbox, WHITE);
    setLocalStorageItem(BACKGROUND_COLOR, WHITE);
  });
}

export function setBackgroundColorFromLocalGlobal() {
  let backgroundColor = getLocalStorageItem(BACKGROUND_COLOR);
  if (!isStringNotBlank(backgroundColor)) {
    return;
  }
  changeBackgroundColor(backgroundColor);
}
