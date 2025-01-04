import { ALIGN, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { isStringNotBlank } from "./type-utils.js";

const DEFAULT_VALUE = "start";

export function alignButtonListners() {
  const leftAlignRadioButton = document.getElementById("leftAlign");
  const middleAlignRadioButton = document.getElementById("middleAlign");
  const rightAlignRadioButton = document.getElementById("rightAlign");
  const justifyAlignRadioButton = document.getElementById("justifyAlign");

  const baniElement = document.getElementById("bani");

  setAlignFromLocalStorage(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, baniElement);

  addRadioListners(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, baniElement);
}

function addRadioListners(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, baniElement) {
  leftAlignRadioButton.addEventListener("change", (e) => {
    changedAlignment("start", e.target.checked, baniElement);
  });
  middleAlignRadioButton.addEventListener("change", (e) => {
    changedAlignment("center", e.target.checked, baniElement);
  });
  rightAlignRadioButton.addEventListener("change", (e) => {
    changedAlignment("end", e.target.checked, baniElement);
  });
  justifyAlignRadioButton.addEventListener("change", (e) => {
    changedAlignment("justify", e.target.checked, baniElement);
  });
}

function changedAlignment(value, isTrue, baniElement) {
  if (!isTrue && !isStringNotBlank(value)) {
    return;
  }

  baniElement.style.textAlign = value;
  saveAlignment(value);
}

function saveAlignment(value) {
  if (!isStringNotBlank(value)) {
    return;
  }

  setLocalStorageItem(ALIGN, value);
}

function setAlignMentByValue(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, value, baniElement) {
  switch (value) {
    case "start":
      baniElement.style.textAlign = value;
      leftAlignRadioButton.checked = true;

      break;

    case "end":
      baniElement.style.textAlign = value;
      rightAlignRadioButton.checked = true;

      break;

    case "center":
      baniElement.style.textAlign = value;
      middleAlignRadioButton.checked = true;

      break;

    case "justify":
      baniElement.style.textAlign = value;
      justifyAlignRadioButton.checked = true;

      break;

    default:
      break;
  }
}

function setAlignFromLocalStorage(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, baniElement) {
  const alignFromLocal = getLocalStorageItem(ALIGN);

  if (!isStringNotBlank(alignFromLocal)) {
    return;
  }

  setAlignMentByValue(leftAlignRadioButton, middleAlignRadioButton, rightAlignRadioButton, justifyAlignRadioButton, alignFromLocal, baniElement);
}
