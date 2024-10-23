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

function update() {
  const floatingButton = document.getElementById("floatingButton");

  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  // Add pointer events for drag functionality
  floatingButton.addEventListener("pointerdown", (e) => {
    isDragging = true;
    floatingButton.classList.remove("inactive"); // Remove opacity on active
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = floatingButton.offsetLeft;
    initialTop = floatingButton.offsetTop;
    floatingButton.setPointerCapture(e.pointerId); // Captures events even if pointer leaves the element
  });

  floatingButton.addEventListener("pointermove", (e) => {
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
      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      // Prevent the button from moving outside the left and right edges
      if (newLeft < 0) newLeft = 0;
      if (newLeft + buttonWidth > viewportWidth) newLeft = viewportWidth - buttonWidth;

      // Prevent the button from moving outside the top and bottom edges
      if (newTop < 0) newTop = 0;
      if (newTop + buttonHeight > viewportHeight) newTop = viewportHeight - buttonHeight;

      // Update button position
      floatingButton.style.left = `${newLeft}px`;
      floatingButton.style.top = `${newTop}px`;
      floatingButton.style.bottom = "auto"; // To avoid overriding bottom CSS
      floatingButton.style.right = "auto"; // To avoid overriding right CSS
    } else {
      floatingButton.style.background = "green";
    }
  });

  floatingButton.addEventListener("pointerup", (e) => {
    isDragging = false;
    floatingButton.classList.add("inactive"); // Lower opacity when inactive
    floatingButton.releasePointerCapture(e.pointerId); // Release capture
  });
}
