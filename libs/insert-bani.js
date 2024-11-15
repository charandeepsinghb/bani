let currentShabadStart = parseInt(localStorage.getItem('currentShabadStart')) || 1;
let currentShabadEnd = currentShabadStart;

let baniElementForFullScreen;

export function initializeBaniShow(baniElement) {
  // Set starting point from saved value, or default to 1 if not found
  currentShabadStart = parseInt(localStorage.getItem('currentShabadStart')) || 1;
  currentShabadEnd = currentShabadStart;

  baniElementForFullScreen = baniElement;
  
  showBaniShabads(baniElement);
}

export function showPrev(baniElement) {
  if (currentShabadStart <= 1) {
    console.log("No more previous elements to show.");
    return;
  }

  hideCurrentPrev();

  currentShabadEnd = currentShabadStart - 1;
  const threshLimit = 500;
  let i = 0;

  while (baniElement.getBoundingClientRect().height < window.innerHeight) {
    currentShabadStart--;

    const shabadElement = document.getElementById("shabad_" + currentShabadStart);
    if (!shabadElement) {
      currentShabadStart++;
      break;
    }

    shabadElement.classList.add("d-block");

    if (baniElement.getBoundingClientRect().height > window.innerHeight) {
      shabadElement.classList.remove("d-block");
      currentShabadStart++;
      break;
    }

    if (i > threshLimit) {
      break;
    }
    i++;
  }

  // Save currentShabadStart to localStorage
  localStorage.setItem('currentShabadStart', currentShabadStart);

  console.log("Current range:", currentShabadStart, currentShabadEnd);
}

function hideCurrentPrev() {
  const threshLimit = 500;
  let i = currentShabadStart;
  let endIndex = Math.max(currentShabadEnd, currentShabadStart);

  while (i <= endIndex) {
    const shabad = document.getElementById("shabad_" + i);
    if (shabad) {
      shabad.classList.remove("d-block");
    }

    if (i - currentShabadStart > threshLimit) {
      break;
    }
    i++;
  }
}

function hideCurrentNext() {
  const threshLimit = 500;
  let i = currentShabadStart;
  currentShabadStart = currentShabadEnd + 1;

  while (i <= currentShabadEnd) {
    const shabad = document.getElementById("shabad_" + i);
    if (shabad) {
      shabad.classList.remove("d-block");
    }

    if (i - currentShabadStart > threshLimit) {
      break;
    }
    i++;
  }
}

export function showNext(baniElement) {
  const nextShabadElement = document.getElementById("shabad_" + (currentShabadEnd + 1));
  if (!nextShabadElement) {
    console.log("No more next elements to show.");
    return;
  }

  hideCurrentNext();

  currentShabadEnd = currentShabadStart;
  const threshLimit = 500;
  let i = 0;

  while (baniElement.getBoundingClientRect().height < window.innerHeight) {
    const shabadElement = document.getElementById("shabad_" + currentShabadEnd);
    if (!shabadElement) {
      break;
    }

    shabadElement.classList.add("d-block");

    if (baniElement.getBoundingClientRect().height > window.innerHeight) {
      shabadElement.classList.remove("d-block");
      currentShabadEnd--;
      break;
    }

    currentShabadEnd++;
    if (i > threshLimit) {
      break;
    }
    i++;
  }

  // Save currentShabadStart to localStorage
  localStorage.setItem('currentShabadStart', currentShabadStart);

  console.log("Current range:", currentShabadStart, currentShabadEnd);
}

/**
 * Initializes and shows the Bani Shabads
 * @param {HTMLElement} baniElement - The main container element for Bani
 */
function showBaniShabads(baniElement) {
  const threshLimit = 500;
  let i = 0;

  while (baniElement.getBoundingClientRect().height < window.innerHeight) {
    const shabadElement = document.getElementById("shabad_" + currentShabadEnd);
    if (!shabadElement) {
      break;
    }

    shabadElement.classList.add("d-block");

    if (baniElement.getBoundingClientRect().height > window.innerHeight) {
      shabadElement.classList.remove("d-block");
      currentShabadEnd--;
      break;
    }

    currentShabadEnd++;
    if (i > threshLimit) {
      break;
    }
    i++;
  }

  // Save currentShabadStart to localStorage
  localStorage.setItem('currentShabadStart', currentShabadStart);

  console.log("Current range:", currentShabadStart, currentShabadEnd);
}

/**
 * 
 */
export function resetShabadsSize() {
  if (!baniElementForFullScreen) {
    return;
  }

  hideCurrentShabads();
  // Reset currentShabadEnd to start from the current position
  currentShabadEnd = currentShabadStart;

  // Call showBaniShabads to adjust based on the new screen size
  showBaniShabads(baniElementForFullScreen);
}


function hideCurrentShabads() {
  let i = currentShabadStart;

  const threshLimit = 500;
  let j = 0;
  while (i <= currentShabadEnd) {
    const shabad = document.getElementById("shabad_" + i);
    if (shabad) {
      shabad.classList.remove("d-block");
    }
    i++;

    if (j > threshLimit) {
      break;
    }
    j++;
  }
}