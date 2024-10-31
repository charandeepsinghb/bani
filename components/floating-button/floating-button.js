import { setLocalStorageItem, getLocalStorageItem, FLOATING_BUTTON_X, FLOATING_BUTTON_Y } from "../../libs/local-storage-utils.js";
import { notNullUndefinedNaNAny } from "../../libs/type-utils.js";
import { toggleOpenCloseMenu, menuOpen, changeMenuPosition } from "../menu/menu";
import { addMenu } from "../menu/menu.js";

// Get viewport dimensions
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Main function to add the floating button to the container
export function addFloatingButton(floatingButtonContainer) {
  fetch("components/floating-button/floating-button.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      floatingButtonContainer.innerHTML = htmlContent;
      const menuContainer = document.getElementById("menu-container");
      if (menuContainer) addMenu(menuContainer);
      initializeFloatingButton();
    })
    .catch(console.error);
}

export function setMenuPosition(menu) {
  changeMenuPosition(floatingButtonPosX, floatingButtonPosY);
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

    constrainAndSetButtonPosition(floatingButton, positionX, positionY, buttonWidth, buttonHeight);
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

    // dialPointerDown(e);
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

      // Calculate new button position
      let posX = initialLeft + deltaX;
      let posY = initialTop + deltaY;

      constrainAndSetButtonPosition(floatingButton, posX, posY, buttonWidth, buttonHeight);

      changeMenuPosition(floatingButtonPosX, floatingButtonPosY);
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

    // dialPointerUp();
  });
}

// Function to constrain button position within viewport and set styles
function constrainAndSetButtonPosition(button, posX, posY, buttonWidth, buttonHeight) {

  // Square button so choosing buttonwidth as one unit

  const buttonSizeHalf = buttonWidth / 2;

  if (posX - buttonSizeHalf < 0) posX = buttonSizeHalf;
  if (posX + buttonSizeHalf > viewportWidth) posX = viewportWidth - buttonSizeHalf;
  if (posY - buttonSizeHalf < 0) posY = buttonSizeHalf;
  if (posY + buttonSizeHalf > viewportHeight) posY = viewportHeight - buttonSizeHalf;

  floatingButtonPosX = posX;
  floatingButtonPosY = posY;
  button.style.left = `${posX}px`;
  button.style.top = `${posY}px`;
  button.style.bottom = "auto"; // Avoid overriding bottom CSS
  button.style.right = "auto";  // Avoid overriding right CSS
}