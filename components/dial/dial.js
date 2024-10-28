export function addDial(dialContainer) {
  fetch("/components/dial/dial.html")
    .then((data) => {
      data.text().then((t) => {
        dialContainer.innerHTML = t;
        initializeDial();
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

  // let isDragging = false;
  // let startAngle = 0;

  // function getAngle(x, y) {
  //   return Math.atan2(y, x) * (180 / Math.PI);
  // }

  // let rotation = 0;

  // let dial;

// export function dialPointerDown(e) {
//     if (!dial) {
//         dial = document.getElementById("dial");
//     }
//     isDragging = true;
//     const rect = dial.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     startAngle = getAngle(e.clientX - centerX, e.clientY - centerY) - rotation;
// }

// export function dialPointerMove(e) {
//     if (!dial) {
//         dial = document.getElementById("dial");
//     }
//     if (isDragging) {
//         console.log("rotating");
//         const rect = dial.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const currentAngle = getAngle(e.clientX - centerX, e.clientY - centerY);
//         rotation = currentAngle - startAngle;
//         dial.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
//       }
// }

export function dialPointerUp() {
    isDragging = false;
}

function initializeDial() {
  const dial = document.getElementById("dial");
let isDragging = false;
let startAngle = 0;
let rotation = 0;

function getAngle(x, y) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function startDrag(e) {
  isDragging = true;
  const rect = dial.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;
  startAngle = getAngle(clientX - centerX, clientY - centerY) - rotation;
}

function rotateDial(e) {
  if (!isDragging) return;

  const rect = dial.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;
  const currentAngle = getAngle(clientX - centerX, clientY - centerY);

  rotation = currentAngle - startAngle;
  dial.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

function endDrag() {
  isDragging = false;
}

// Mouse events
dial.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", rotateDial);
document.addEventListener("mouseup", endDrag);

// Touch events
dial.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", rotateDial);
document.addEventListener("touchend", endDrag);

}
