import { setBaniColumnWidth, setLocalColumnWidth } from "../../libs/column-width.js";
import { increaseDecreaseBaniFontSize, setLocalFontSize } from "../../libs/font-size.js";
import { setLineHeightBani, setLocalLineHeight } from "../../libs/line-height.js";

export function addDials(dialContainer) {
  fetch("components/dial/dial.html")
    .then((data) => {
      data.text().then((t) => {
        dialContainer.innerHTML = t;
        setAllDials(dialContainer);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

export function dialPointerUp() {
  isDragging = false;
}

function setSize(dial, size) {
  dial.style.width = size + "px";
  dial.style.height = size + "px";
}

function setAllDials(dialContainer) {
  const baniElement = document.getElementById("bani");
  
  const dialConfigs = [
    { size: 400, name: 'Font size'},
    { size: 300, name: 'Line height'},
    { size: 200, name: 'Column width'}
  ];

  let i = 0;
  for (const dialConfig of dialConfigs) {
    initializeDial(dialConfig, dialContainer, i, baniElement);
    i++;
  }
}

function addRotationEvent(dialName, rotation, baniElement) {
  switch (dialName) {
    case "Font size":
      increaseDecreaseBaniFontSize(rotation*0.2, baniElement);
      break;

    case "Line height":
      setLineHeightBani(rotation, baniElement);
      break;

    case "Column width":
      setBaniColumnWidth(rotation*0.2+20, baniElement);
      break;
  
    default:
      break;
  }
}

function addRotationStopEvent(dialName, rotation) {
  switch (dialName) {
    case "Font size":
      setLocalFontSize(rotation*0.2);
      break;

    case "Line height":
      setLocalLineHeight(rotation);
      break;

    case "Column width":
      setLocalColumnWidth(rotation*0.2+20);
      break;
  
    default:
      break;
  }
}

const activeDials = [];

function initializeDial(dialConfig, dialContainer, i, baniElement) {
  const dial = document.getElementById("dial");

  const cloneDial = dial.cloneNode(true);

  dial.style.display = "none";
  cloneDial.style.display = "block";
  activeDials.push(cloneDial);

  cloneDial.setAttribute("id", "dial-" + i);

  dialContainer.appendChild(cloneDial);

  setSize(cloneDial, dialConfig.size);

  addDialTemplate(cloneDial, dialConfig.name);

  let isDragging = false;
  let startAngle = 0;
  let rotation = 0;

  function getAngle(x, y) {
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  function startDrag(e) {
    isDragging = true;
    const rect = cloneDial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    startAngle = getAngle(clientX - centerX, clientY - centerY) - rotation;
  }

  let currentAngle;

  function rotateDial(e) {
    if (!isDragging) return;

    const rect = cloneDial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    currentAngle = getAngle(clientX - centerX, clientY - centerY);

    rotation = currentAngle - startAngle;
    cloneDial.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    addRotationEvent(dialConfig.name, currentAngle, baniElement);
  }

  function endDrag() {
    isDragging = false;
    addRotationStopEvent(dialConfig.name, currentAngle);
  }

  // Mouse events
  cloneDial.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", rotateDial);
  document.addEventListener("mouseup", endDrag);

  // Touch events
  cloneDial.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", rotateDial);
  document.addEventListener("touchend", endDrag);
}

function addDialTemplate(dial, dialName) {
  fetch("components/dial/" + "dial-template" + ".html")
    .then((data) => {
      data.text().then((t) => {
        dial.innerHTML = t.replaceAll('dial-name-text', dialName);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
