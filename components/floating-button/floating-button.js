import { setLocalStorageItem, getLocalStorageItem } from "../../libs/local-storage-utils";
import { notNullUndefinedNaNAny } from "../../libs/type-utils";
import { toggleOpenCloseMenu, menuOpen } from "../menu/menu";
import { addMenu } from "../menu/menu";

export function addFloatingButton(floatingButtonContainer) {
  fetch("/components/floating-button/floating-button.html")
    .then((data) => {
      data.text().then((t) => {
        floatingButtonContainer.innerHTML = t;
        initiateFloatingButton();
        const menuContainer = document.getElementById("menu-container");
        if (menuContainer != null) addMenu(menuContainer);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

// Get viewport dimensions
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

function setPositionFromLocalStorageIfAvailable(floatingButton) {
  const posX = getLocalStorageItem("floatingButtonX");
  const posY = getLocalStorageItem("floatingButtonY");

  if (notNullUndefinedNaNAny(posX, posY)) {
    // Prevent the button from moving outside the left and right edges
    if (posX < 0) posX = 0;
    if (posX + floatingButton.buttonWidth > viewportWidth) posX = viewportWidth - floatingButton.buttonWidth;

    // Prevent the button from moving outside the top and bottom edges
    if (posY < 0) posY = 0;
    if (posY + floatingButton.buttonHeight > viewportHeight) posY = viewportHeight - floatingButton.buttonHeight;

    floatingButtonPositionLeft = posX;
    floatingButtonPositionTop = posY;
    floatingButton.style.left = `${posX}px`;
    floatingButton.style.top = `${posY}px`;
  }
}

let floatingButtonPositionLeft = 0;
let floatingButtonPositionTop = 0;

function savePositionToLocalStorage(x, y) {
  if (notNullUndefinedNaNAny(x, y)) {
    setLocalStorageItem("floatingButtonX", x);
    setLocalStorageItem("floatingButtonY", y);
  }
}

function initiateFloatingButton() {
  const floatingButton = document.getElementById("floating-button");

  setPositionFromLocalStorageIfAvailable(floatingButton);

  let isDragging = false;
  let isClicked = false;

  let isMenuClicked = false;
  let isLeftClicked = false;
  let isRightClicked = false;
  let isFullscreenClicked = false;

  let startX, startY, initialLeft, initialTop;

  // Function to check which icon was clicked and update corresponding flags
  function updateClickStatus(target, iconId) {
    const iconClicked = target.closest(`#${iconId}`);
    return iconClicked !== null;
  }

  // Add pointer events for drag functionality
  floatingButton.addEventListener("pointerdown", (e) => {
    // Update click statuses
    isLeftClicked = updateClickStatus(e.target, "left-icon");
    isRightClicked = updateClickStatus(e.target, "right-icon");
    isMenuClicked = updateClickStatus(e.target, "menu-icon");
    isFullscreenClicked = updateClickStatus(e.target, "fullscreen-icon");

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
    isFullscreenClicked = false;
    isClicked = false;
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

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
        // console.log("menu");
        toggleOpenCloseMenu();
      }
      if (isLeftClicked) {
        console.log("left");
      }
      if (isRightClicked) {
        console.log("right");
      }
      if (isFullscreenClicked) {
        console.log("fulls");
      }
    } else if (isDragging) {
      console.log("dragstop");
      savePositionToLocalStorage(floatingButtonPositionLeft, floatingButtonPositionTop);
    }
    isDragging = false;
    // console.log(menuOpen)
    if (!menuOpen) {
      floatingButton.classList.add("inactive"); // Lower opacity when inactive
    }
    floatingButton.releasePointerCapture(e.pointerId); // Release capture
  });
}
