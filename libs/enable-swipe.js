import { getLocalStorageItem, ENABLE_SWIPE, setLocalStorageItem } from "./local-storage-utils.js";
import { swipeState } from "./swipe.js";
import { isStringNotBlank } from "./type-utils.js";

export function enableSwipeCheckInitialize() {
  const enableSwipeCheckbox = document.getElementById("enableSwipe");

  setEnableSwipeCheckFromLocal(enableSwipeCheckbox);

  enableSwipeCheckedEventAdd(enableSwipeCheckbox);
}

function enableSwipeCheckedEventAdd(enableSwipeCheckbox) {
  enableSwipeCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      changeEnableSwipe("true");
      setLocalStorageItem(ENABLE_SWIPE, "true");
    } else {
      changeEnableSwipe("false");
      setLocalStorageItem(ENABLE_SWIPE, "false");
    }
  });
}

function changeEnableSwipe(enableSwipeCheck) {
  if (enableSwipeCheck === "true") {
    swipeState.enabled = true;
  } else if (enableSwipeCheck === "false") {
    swipeState.enabled = false;
  }
}

function setEnableSwipeCheckbox(enableSwipeCheckbox, enableSwipeCheck) {
  if (enableSwipeCheck === "true") {
    enableSwipeCheckbox.checked = true;
  } else if (enableSwipeCheck === "false") {
    enableSwipeCheckbox.checked = false;
  }
}

function setEnableSwipeCheckFromLocal(enableSwipeCheckbox) {
  let enableSwipeCheck = getLocalStorageItem(ENABLE_SWIPE);

  if (!isStringNotBlank(enableSwipeCheck)) {
    enableSwipeCheck = "true";
  }

  changeEnableSwipe(enableSwipeCheck);
  setEnableSwipeCheckbox(enableSwipeCheckbox, enableSwipeCheck);
}
