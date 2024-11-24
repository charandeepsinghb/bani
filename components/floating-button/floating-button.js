import { toggleFullScreen } from "../../libs/fullscreen.js";
import { setLocalStorageItem, getLocalStorageItem, FLOATING_BUTTON_X, FLOATING_BUTTON_Y } from "../../libs/local-storage-utils.js";
import { nextButtonClick, previousButtonClick } from "../../libs/nextprev.js";
import { notNullUndefinedNaNAny } from "../../libs/type-utils.js";
import { toggleOpenCloseMenu, menuOpen } from "../menu/menu.js";
import { addMenu } from "../menu/menu.js";

// Get viewport dimensions
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

// Main function to add the floating button to the container
export function addFloatingButton(floatingButtonContainer, baniElement) {
  fetch("components/floating-button/floating-button.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      floatingButtonContainer.innerHTML = htmlContent;
      const menuContainer = document.getElementById("menu-container");
      if (menuContainer) addMenu(menuContainer, baniElement);
      initializeFloatingButton(baniElement);
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
function initializeFloatingButton(baniElement) {
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

  floatingButton.addEventListener("pointermove", (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
  
      // Only consider dragging if movement exceeds the threshold
      const isAboveThreshold = Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD;
      if (isAboveThreshold) {
        // Get button dimensions
        const buttonWidth = floatingButton.offsetWidth;
        const buttonHeight = floatingButton.offsetHeight;
  
        // Calculate new button position
        let posX = initialLeft + deltaX;
        let posY = initialTop + deltaY;
  
        constrainAndSetButtonPosition(floatingButton, posX, posY, buttonWidth, buttonHeight);
  
        // Reset click-related flags during drag
        isMenuIconClicked = false;
        isLeftIconClicked = false;
        isRightIconClicked = false;
        isFullscreenIconClicked = false;
        isButtonClicked = false;
      }
    }
  });

  const DRAG_THRESHOLD = 15; // Define a small threshold for movement

  // Handle pointer up event for releasing drag and executing icon click actions
  floatingButton.addEventListener("pointerup", (e) => {
    const endX = e.clientX;
    const endY = e.clientY;

    // Calculate the distance moved
    const moveX = Math.abs(endX - startX);
    const moveY = Math.abs(endY - startY);

    const isWithinThreshold = moveX <= DRAG_THRESHOLD && moveY <= DRAG_THRESHOLD;

    if (isButtonClicked && isWithinThreshold) {
      if (isMenuIconClicked) {
        toggleOpenCloseMenu();
      }
      if (isLeftIconClicked) {
        previousButtonClick(baniElement);
      }
      if (isRightIconClicked) {
        nextButtonClick(baniElement);
      }
      if (isFullscreenIconClicked) {
        toggleFullScreen();
      }
    } else if (isDragging) {
      saveButtonPositionToLocalStorage(floatingButtonPosX, floatingButtonPosY);
    }

    isDragging = false;
    if (!menuOpen) {
      floatingButton.classList.add("inactive"); // Lower opacity when inactive
    }
    floatingButton.releasePointerCapture(e.pointerId); // Release capture

  });
}

// Function to constrain button position within viewport and set styles
function constrainAndSetButtonPosition(button, posX, posY, buttonWidth, buttonHeight) {

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  // Square button so choosing buttonwidth as one unit

  const buttonSizeHalf = buttonWidth / 2;

  const sideThreshold = 10;

  if (posX - buttonSizeHalf - sideThreshold < 0) posX = buttonSizeHalf + sideThreshold;
  if (posX + buttonSizeHalf + sideThreshold > viewportWidth) posX = viewportWidth - buttonSizeHalf - sideThreshold;
  if (posY - buttonSizeHalf - sideThreshold < 0) posY = buttonSizeHalf + sideThreshold;
  if (posY + buttonSizeHalf + sideThreshold > viewportHeight) posY = viewportHeight - buttonSizeHalf - sideThreshold;

  floatingButtonPosX = posX;
  floatingButtonPosY = posY;
  button.style.left = `${posX}px`;
  button.style.top = `${posY}px`;
  button.style.bottom = "auto"; // Avoid overriding bottom CSS
  button.style.right = "auto"; // Avoid overriding right CSS
}

// Function to adjust the button's position if the screen size changes
export function adjustFloatingButtonPosition() {
  const floatingButton = document.getElementById("floating-button");
  if (!floatingButton) return;

  // Get current position and button dimensions
  const currentPosX = floatingButton.offsetLeft;
  const currentPosY = floatingButton.offsetTop;
  const buttonWidth = floatingButton.offsetWidth;
  const buttonHeight = floatingButton.offsetHeight;

  // Adjust the position to ensure the button stays within bounds
  constrainAndSetButtonPosition(floatingButton, currentPosX, currentPosY, buttonWidth, buttonHeight);
}
