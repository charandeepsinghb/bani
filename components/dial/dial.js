export function addDials(dialContainer) {
  fetch("/components/dial/dial.html")
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
  const dialConfigs = [
    { size: 400, name: 'Column width'},
    { size: 300, name: 'Line height'},
    { size: 200, name: 'Font size'}
  ];

  let i = 0;
  for (const dialConfig of dialConfigs) {
    initializeDial(dialConfig, dialContainer, i);
    i++;
  }
}

const activeDials = [];

function initializeDial(dialConfig, dialContainer, i) {
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

  function rotateDial(e) {
    if (!isDragging) return;

    const rect = cloneDial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const currentAngle = getAngle(clientX - centerX, clientY - centerY);

    rotation = currentAngle - startAngle;
    cloneDial.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  }

  function endDrag() {
    isDragging = false;
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
  fetch("/components/dial/" + "dial-template" + ".html")
    .then((data) => {
      data.text().then((t) => {
        dial.innerHTML = t.replaceAll('dial-name-text', dialName);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
