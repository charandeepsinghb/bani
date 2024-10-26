import { setLocalStorageItem, getLocalStorageItem, FLOATING_BUTTON_X, FLOATING_BUTTON_Y } from "../../libs/local-storage-utils";
import { notNullUndefinedNaNAny } from "../../libs/type-utils";
import { toggleOpenCloseMenu, menuOpen } from "../menu/menu";
import { addMenu } from "../menu/menu";

// Get viewport dimensions
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Main function to add the floating button to the container
export function addFloatingButton(floatingButtonContainer) {
  fetch("/components/floating-button/floating-button.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      floatingButtonContainer.innerHTML = htmlContent;
      initializeFloatingButton();
      const menuContainer = document.getElementById("menu-container");
      if (menuContainer) addMenu(menuContainer);
    })
    .catch(console.error);
}

// Restore the floating button's position from local storage if available
function setPositionFromLocalStorageIfAvailable(floatingButton) {
  let positionX = getLocalStorageItem(FLOATING_BUTTON_X);
  let positionY = getLocalStorageItem(FLOATING_BUTTON_Y);

  if (notNullUndefinedNaNAny(positionX, positionY)) {
    positionX = Number.parseFloat(positionX);
    positionY = Number.parseFloat(positionY);

    // Get button dimensions
    const buttonWidth = floatingButton.offsetWidth;
    const buttonHeight = floatingButton.offsetHeight;

    // Ensure the button stays within horizontal viewport bounds
    if (positionX < 0) positionX = 0;
    if (positionX + buttonWidth > viewportWidth) positionX = viewportWidth - buttonWidth;

    // Ensure the button stays within vertical viewport bounds
    if (positionY < 0) positionY = 0;
    if (positionY + buttonHeight > viewportHeight) positionY = viewportHeight - buttonHeight;

    floatingButtonPosX = positionX;
    floatingButtonPosY = positionY;
    floatingButton.style.left = `${positionX}px`;
    floatingButton.style.top = `${positionY}px`;
    floatingButton.style.bottom = "auto"; // Avoid overriding bottom CSS
    floatingButton.style.right = "auto";  // Avoid overriding right CSS
  }
}

// Track button position coordinates
let floatingButtonPosX = 0;
let floatingButtonPosY = 0;

// Save the current button position to local storage
function saveButtonPositionToLocalStorage(x, y) {
  if (notNullUndefinedNaNAny(x, y)) {
    setLocalStorageItem(FLOATING_BUTTON_X, x);
    setLocalStorageItem(FLOATING_BUTTON_Y, y);
  }
}

// Initialize floating button interactions, including drag and click events
function initializeFloatingButton() {
  const floatingButton = document.getElementById("floating-button");

  setPositionFromLocalStorageIfAvailable(floatingButton);

  let isDragging = false;
  let isButtonClicked = false;

  // Flags for specific icon clicks
  let isMenuIconClicked = false;
  let isLeftIconClicked = false;
  let isRightIconClicked = false;
  let isFullscreenIconClicked = false;

  let startX, startY, initialLeft, initialTop;

  // Check if a specific icon was clicked and update respective flags
  function updateIconClickStatus(target, iconId) {
    const iconElement = target.closest(`#${iconId}`);
    return iconElement !== null;
  }

  // Handle pointer down event for drag and click actions
  floatingButton.addEventListener("pointerdown", (e) => {
    isLeftIconClicked = updateIconClickStatus(e.target, "left-icon");
    isRightIconClicked = updateIconClickStatus(e.target, "right-icon");
    isMenuIconClicked = updateIconClickStatus(e.target, "menu-icon");
    isFullscreenIconClicked = updateIconClickStatus(e.target, "fullscreen-icon");

    isButtonClicked = true;
    isDragging = true;
    floatingButton.classList.remove("inactive"); // Make button active
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = floatingButton.offsetLeft;
    initialTop = floatingButton.offsetTop;
    floatingButton.setPointerCapture(e.pointerId); // Capture pointer events
  });

  // Handle pointer move event for dragging the button
  floatingButton.addEventListener("pointermove", (e) => {
    // Reset icon click statuses during drag
    isMenuIconClicked = false;
    isLeftIconClicked = false;
    isRightIconClicked = false;
    isFullscreenIconClicked = false;
    isButtonClicked = false;

    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Get button dimensions
      const buttonWidth = floatingButton.offsetWidth;
      const buttonHeight = floatingButton.offsetHeight;

      // Calculate and constrain new button position within the viewport
      floatingButtonPosX = initialLeft + deltaX;
      floatingButtonPosY = initialTop + deltaY;

      if (floatingButtonPosX < 0) floatingButtonPosX = 0;
      if (floatingButtonPosX + buttonWidth > viewportWidth) floatingButtonPosX = viewportWidth - buttonWidth;
      if (floatingButtonPosY < 0) floatingButtonPosY = 0;
      if (floatingButtonPosY + buttonHeight > viewportHeight) floatingButtonPosY = viewportHeight - buttonHeight;

      // Update button position
      floatingButton.style.left = `${floatingButtonPosX}px`;
      floatingButton.style.top = `${floatingButtonPosY}px`;
      floatingButton.style.bottom = "auto";
      floatingButton.style.right = "auto";
    }
  });

  // Handle pointer up event for releasing drag and executing icon click actions
  floatingButton.addEventListener("pointerup", (e) => {
    if (isButtonClicked) {
      if (isMenuIconClicked) {
        toggleOpenCloseMenu();
      }
      if (isLeftIconClicked) {
        console.log("Left icon clicked");
      }
      if (isRightIconClicked) {
        console.log("Right icon clicked");
      }
      if (isFullscreenIconClicked) {
        console.log("Fullscreen icon clicked");
      }
    } else if (isDragging) {
      console.log("Drag stopped");
      saveButtonPositionToLocalStorage(floatingButtonPosX, floatingButtonPosY);
    }
    isDragging = false;
    if (!menuOpen) {
      floatingButton.classList.add("inactive"); // Lower opacity when inactive
    }
    floatingButton.releasePointerCapture(e.pointerId); // Release capture
  });
}
