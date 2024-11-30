import { getLocalStorageItem, BACKGROUND_COLOR, setLocalStorageItem, removeLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

export function backgroundColorInitialize() {
  const backgroundColorbox = document.getElementById("background-color");
  
  setBackgroundColorFromLocal(backgroundColorbox);

  backgroundColoredEventAdd(backgroundColorbox);

  resetBackgroundColorListner(backgroundColorbox);
}

function backgroundColoredEventAdd(backgroundColorbox) {
  backgroundColorbox.addEventListener("change", (e)=>{
    changeBackgroundColor(e.target.value);
    setLocalStorageItem(BACKGROUND_COLOR, e.target.value);
  });
}

function changeBackgroundColor(backgroundColor) {
  document.documentElement.style.setProperty('--background-color', backgroundColor);
}

function setBackgroundColorbox(backgroundColorbox, backgroundColor) {  
  backgroundColorbox.value = backgroundColor;
}

function setBackgroundColorFromLocal(backgroundColorbox) {
  let backgroundColor = getLocalStorageItem(BACKGROUND_COLOR);

  if (!isStringNotBlank(backgroundColor)) {
    return;
  }
  
  setBackgroundColorbox(backgroundColorbox, backgroundColor);
}

const WHITE = '#ffffff';
const BLACK = '#000000';

function resetBackgroundColorListner(backgroundColorbox) {
  const backgroundResetIcon = document.getElementById("background-reset-icon");

  backgroundResetIcon.addEventListener("click", ()=>{
    document.documentElement.style.setProperty('--background-color', WHITE);
    removeLocalStorageItem(BACKGROUND_COLOR);
    setBackgroundColorbox(backgroundColorbox, WHITE);
  });
}

export function setBackgroundColorFromLocalGlobal() {
  let backgroundColor = getLocalStorageItem(BACKGROUND_COLOR);
  if (!isStringNotBlank(backgroundColor)) {
    return;
  }
  changeBackgroundColor(backgroundColor);
}