// userInactivityListener.js

let inactivityTimer;
const INACTIVITY_LIMIT = 5 * 1000; // 5 seconds (change as needed)

function hideInactiveUI() {
  const section = document.querySelector(".hide-on-inactive");
  if (section) {
    section.classList.add("hidden");
  }
}

function showActiveUI() {
  const section = document.querySelector(".hide-on-inactive");
  if (section) {
    section.classList.remove("hidden");
  }
}

export function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  showActiveUI(); // show immediately when user interacts
  inactivityTimer = setTimeout(hideInactiveUI, INACTIVITY_LIMIT);
}

// Listen to user activity
["mousemove", "mousedown", "keypress", "keydown", "touchstart", "scroll"].forEach((event) => {
  window.addEventListener(event, resetInactivityTimer);
});
