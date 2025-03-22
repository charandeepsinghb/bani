import { BOOKMARKS, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { isArrayEmpty, isStringNotBlank } from "./type-utils.js";

let enableBookmarks = false;

/**
 * @type {Array}
 */
let bookmarksFromLocal;

export function bookmarkInitialize(baniElement) {
  const bookmarkCheckbox = document.getElementById("bookmark");
  const bookmarkContainer = document.getElementById("bookmarks-container");

  bookmarksFromLocal = getBookmarksFromLocal();
  showLoadBookmarks(bookmarkContainer);
  enableAddBookmarkListner(bookmarkCheckbox);
  saveBookmarkListner(baniElement, bookmarkContainer);
}


function getBookmarksFromLocal() {
  const bookmarksFromLocalString = getLocalStorageItem(BOOKMARKS);
  if (!isStringNotBlank(bookmarksFromLocalString)) {
    return [];
  }
  return JSON.parse(bookmarksFromLocalString);
}

/**
 * Show all bookmarks in menu on load
 * 
 * @param {HTMLElement} bookmarkContainer 
 * @returns 
 */
function showLoadBookmarks(bookmarkContainer) {
  if (isArrayEmpty(bookmarksFromLocal)) {
    return;
  }
  let dataToAppend = '';
  for (const bookmarkLocalObject of bookmarksFromLocal) {
    const singleBookmark = getSingleBookmarkFromNameAndNumber(bookmarkLocalObject.shabadPre, bookmarkLocalObject.shabadId);
    dataToAppend += singleBookmark;
  }
  bookmarkContainer.innerHTML = dataToAppend;
}

function getSingleBookmarkFromNameAndNumber(shabadPre, shabadId) {
  return `
    <div class="bookmark">
      <a data-shabadid='${shabadId}' href='#' class='bookmark-show'>${shabadPre}</a>
      <button class="icon bookmark-delete" data-shabadid='${shabadId}'>
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  `;
}

/**
 * Function used to add bookmarks on click or longpress of pankti
 * 
 * @param {Event} event 
 */
function addBookmark(event, bookmarkContainer) {
  /**
   * @type {HTMLElement}
   */
  const baniPanktiElement = event.target.closest('.gurmukhi');
  if (!enableBookmarks || !baniPanktiElement?.classList.contains('gurmukhi')) {
    return;
  }

  const bookmarkObject = prepareBookmarkObject(baniPanktiElement);
  if (!bookmarkObject) {
    return;
  }
  addBookmarkToUI(bookmarkContainer, bookmarkObject);
  saveBookmarkToLocal(bookmarkObject);
}

function prepareBookmarkObject(baniPanktiElement) {
  const idOfElement = baniPanktiElement.getAttribute('id');
  const shabadId = Number.parseInt(idOfElement.replace('shabad_', ''));

  for (const bookmarkLocalObject of bookmarksFromLocal) {
    if (bookmarkLocalObject?.shabadId == shabadId) {
      return;
    }
  }

  if (bookmarksFromLocal.includes(shabadId)) {
    return;
  }

  const shabadPre = baniPanktiElement.innerText.trim().substring(0, 15);

  return {
    shabadId: shabadId,
    shabadPre: shabadPre
  };
}

function saveBookmarkToLocal(bookmarkObject) {
  bookmarksFromLocal.push(bookmarkObject);

  const bookmarksStringForSaving = JSON.stringify(bookmarksFromLocal);

  setLocalStorageItem(BOOKMARKS, bookmarksStringForSaving);
}

/**
 * 
 * @param {HTMLElement} bookmarkContainer 
 * @param {Object} bookmarkObject 
 */
function addBookmarkToUI(bookmarkContainer, bookmarkObject) {
  const singleBookmark = getSingleBookmarkFromNameAndNumber(bookmarkObject.shabadPre, bookmarkObject.shabadId);

  bookmarkContainer.insertAdjacentHTML(
    'beforeend',
    singleBookmark
  );
}

function saveBookmarkListner(baniElement, bookmarkContainer) {
  longPress(baniElement,
    (e) => {
      addBookmark(e, bookmarkContainer)
    },
    500
  )
}

function enableAddBookmarkListner(bookmarkCheckbox) {
  bookmarkCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      enableBookmarks = true;
    } else {
      enableBookmarks = false;
    }
  });
}

function longPress(element, callback, duration = 500) {
  let timer;

  element.addEventListener("mousedown", (event) => {
    timer = setTimeout(() => callback(event), duration);
  });

  element.addEventListener("mouseup", () => clearTimeout(timer));
  element.addEventListener("mouseleave", () => clearTimeout(timer));

  // For mobile touch events
  element.addEventListener("touchstart", (event) => {
    timer = setTimeout(() => callback(event), duration);
  });

  element.addEventListener("touchend", () => clearTimeout(timer));
  element.addEventListener("touchcancel", () => clearTimeout(timer));
}

function deleteBookmarkButtonsListner() {
  const buttons = document.getElementsByClassName('bookmark-delete');

  for (const button of buttons) {
    buttons.addEventListener('click', (e)=>{
      const shabadId = Number(e.target.getAttribute('data-shabadid'));

            

    });
  }
}

function deleteSingleBookmarkFromLocal(shabadId) {
  
}

function deleteSingleBookmarkFromUI(bookmarkContainer, shabadId) {
  
}
