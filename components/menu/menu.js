import { cleanLocalStoreage } from "../../libs/local-storage-utils";
import { addDials } from "../dial/dial";
import { setMenuPosition } from "../floating-button/floating-button";

export let menuOpen = false;

export function addMenu(menuContainer) {
  fetch("components/menu/menu.html")
    .then((data) => {
      data.text().then((t) => {
        menuContainer.innerHTML = t;

        menuAddedCallback();

        const dialContainer = document.getElementById("dial-container");

        if (dialContainer) addDials(dialContainer);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

let menu;

function menuAddedCallback() {
  if (!menu) {
    menu = document.getElementById("menu");
  }
  setMenuPosition(menu);
  resetAllLocalButton();
}

export function toggleOpenCloseMenu() {
  if (!menu) {
    menu = document.getElementById("menu");
  }
  if (menuOpen) {
    // menu.style.display = "none";
    menu.classList.add("menuClose");
  } else {
    menu.classList.remove("menuClose");
    // menu.style.display = "block";
  }

  menuOpen = !menuOpen;
}

export function changeMenuPosition(posX, posY) {
  if (!menu) {
    menu = document.getElementById("menu");
  }

  menu.style.left = `${posX}px`;
  menu.style.top = `${posY}px`;
  menu.style.bottom = "auto";
  menu.style.right = "auto";
}

function resetAllLocalButton() {
  const resetAllLocal = document.getElementById("reset-icon");

  resetAllLocal.addEventListener("click", ()=>{
    cleanLocalStoreage();
    location.reload();
  });
}
