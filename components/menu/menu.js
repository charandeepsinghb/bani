export let menuOpen = false;

export function addMenu(menuContainer) {
  fetch("/components/menu/menu.html")
    .then((data) => {
      data.text().then((t) => {
        menuContainer.innerHTML = t;
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

export function toggleOpenCloseMenu() {
  
  const menu = document.getElementById("menu");
  if (menuOpen) {
    // menu.style.display = "none";
    menu.classList.add("menuClose");
  } else {
    menu.classList.remove("menuClose");
    // menu.style.display = "block";
  }

  menuOpen = !menuOpen;
}
