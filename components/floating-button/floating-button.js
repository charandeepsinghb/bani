import { setLocalStorageItem, getLocalStorageItem } from "../../libs/local-storage-utils";
import { notNullUndefinedNaNAny } from "../../libs/type-utils";

export function addFloatingButton(floatingButtonContainer) {
  fetch("/components/floating-button/floating-button.html")
    .then((data) => {
      data.text().then((t) => {
        floatingButtonContainer.innerHTML = t;
        update();
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function setPositionFromLocalStorageIfAvailable(floatingButton) {
  const posX = getLocalStorageItem("floatingButtonX");
  const posY = getLocalStorageItem("floatingButtonY");

  if (notNullUndefinedNaNAny(posX, posY)) {
    floatingButton.style.left = `${posX}px`;
    floatingButton.style.top = `${posY}px`;
  }
}

let floatingButtonPositionLeft;
let floatingButtonPositionTop;

function savePositionToLocalStorage(x, y) {
  if (notNullUndefinedNaNAny(x, y)) {
    setLocalStorageItem("floatingButtonX", x);
    setLocalStorageItem("floatingButtonY", y);
  }
}

function update() {
  const floatingButton = document.getElementById("floatingButton");

  setPositionFromLocalStorageIfAvailable(floatingButton);

  let isDragging = false;
  let isClicked = false;

  let isMenuClicked = false;
  let isLeftClicked = false;
  let isRightClicked = false;

  let startX, startY, initialLeft, initialTop;

  // Add pointer events for drag functionality
  floatingButton.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#leftIcon")) {
      isLeftClicked = true;
    } else {
      isLeftClicked = false;
    }
    if (e.target.closest("#rightIcon")) {
      isRightClicked = true;
    } else {
      isRightClicked = false;
    }
    if (e.target.closest("#menuIcon")) {
      isMenuClicked = true;
    } else {
      isMenuClicked = false;
    }
    isClicked = true;
    isDragging = true;
    floatingButton.classList.remove("inactive"); // Remove opacity on active
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = floatingButton.offsetLeft;
    initialTop = floatingButton.offsetTop;
    floatingButton.setPointerCapture(e.pointerId); // Captures events even if pointer leaves the element
  });

  floatingButton.addEventListener("pointermove", (e) => {
    isMenuClicked = false;
    isLeftClicked = false;
    isRightClicked = false;
    isClicked = false;
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get button dimensions
      const buttonWidth = floatingButton.offsetWidth;
      const buttonHeight = floatingButton.offsetHeight;

      // Calculate the new position, ensuring it stays within the viewport
      floatingButtonPositionLeft = initialLeft + deltaX;
      floatingButtonPositionTop = initialTop + deltaY;

      // Prevent the button from moving outside the left and right edges
      if (floatingButtonPositionLeft < 0) floatingButtonPositionLeft = 0;
      if (floatingButtonPositionLeft + buttonWidth > viewportWidth) floatingButtonPositionLeft = viewportWidth - buttonWidth;

      // Prevent the button from moving outside the top and bottom edges
      if (floatingButtonPositionTop < 0) floatingButtonPositionTop = 0;
      if (floatingButtonPositionTop + buttonHeight > viewportHeight) floatingButtonPositionTop = viewportHeight - buttonHeight;

      // Update button position
      floatingButton.style.left = `${floatingButtonPositionLeft}px`;
      floatingButton.style.top = `${floatingButtonPositionTop}px`;
      floatingButton.style.bottom = "auto"; // To avoid overriding bottom CSS
      floatingButton.style.right = "auto"; // To avoid overriding right CSS
    }
  });

  floatingButton.addEventListener("pointerup", (e) => {
    if (isClicked) {
      if (isMenuClicked) {
        console.log("menu");
      }
      if (isLeftClicked) {
        console.log("left");
      }
      if (isRightClicked) {
        console.log("right");
      }
    } else if (isDragging) {
      console.log("dragstop");
      savePositionToLocalStorage(floatingButtonPositionLeft, floatingButtonPositionTop);
    }
    isDragging = false;
    floatingButton.classList.add("inactive"); // Lower opacity when inactive
    floatingButton.releasePointerCapture(e.pointerId); // Release capture
  });
}
