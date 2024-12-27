import { getLocalStorageItem, FONT_COLOR, setLocalStorageItem, removeLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function fontColorInitialize() {
  const fontColorbox = document.getElementById("font-color");
  
  setFontColorFromLocal(fontColorbox);

  fontColoredEventAdd(fontColorbox);

  resetFontColorListner(fontColorbox);
}

function fontColoredEventAdd(fontColorbox) {
  fontColorbox.addEventListener("change", (e)=>{
    changeFontColor(e.target.value);
    setLocalStorageItem(FONT_COLOR, e.target.value);
  });
}

function changeFontColor(fontColor) {
  document.documentElement.style.setProperty('--font-color', fontColor);
}

function setFontColorbox(fontColorbox, fontColor) {  
  fontColorbox.value = fontColor;
}

function setFontColorFromLocal(fontColorbox) {
  let fontColor = getLocalStorageItem(FONT_COLOR);

  if (!isStringNotBlank(fontColor)) {
    return;
  }

  setFontColorbox(fontColorbox, fontColor);
}

const WHITE = '#ffffff';
const BLACK = '#000000';

function resetFontColorListner(fontColorbox) {
  const fontResetIcon = document.getElementById("font-reset-icon");

  fontResetIcon.addEventListener("click", ()=>{
    document.documentElement.style.setProperty('--font-color', BLACK);
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
