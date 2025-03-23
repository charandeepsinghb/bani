import { resetShabadsSize } from "./insert-bani.js";
import { BOOKMARKS, getLocalStorageItem, setLocalStorageItem } from "./local-storage-utils.js";
import { isArrayEmpty, isStringNotBlank } from "./type-utils.js";
import { getBaniName } from "./which-bani.js";

let enableBookmarks = false;

/**
 * @type {Array}
 */
let bookmarksFromLocal;

export function bookmarkInitialize(baniElement) {
  const bookmarkCheckbox = document.getElementById("bookmark");
  const bookmarkContainer = document.getElementById("bookmarks-container");

  const baniName = getBaniName(baniElement);

  bookmarksFromLocal = getBookmarksFromLocal(baniElement, baniName);
  showLoadBookmarks(bookmarkContainer);
  enableAddBookmarkListner(bookmarkCheckbox, baniElement);
  saveBookmarkListner(baniElement, bookmarkContainer, baniName);
  deleteBookmarkButtonsListner(baniName);
  bookmarkJumpListners();
}


function getBookmarksFromLocal(baniElement, baniName) {
  const bookmarksFromLocalString = getLocalStorageItem(BOOKMARKS);
  if (!isStringNotBlank(bookmarksFromLocalString)) {
    return [];
  }
  /**
   * @type {Array}
   */
  const allBookmarks = JSON.parse(bookmarksFromLocalString);

  const currentBaniBookmarks = allBookmarks.filter((val)=>{
    if (val.baniName == baniName) {
      return true;
    } else {
      false;
    }
  });

  return currentBaniBookmarks;
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
    const singleBookmark = getSingleBookmarkBodyFromNameAndNumber(bookmarkLocalObject.shabadPre, bookmarkLocalObject.shabadId);
    dataToAppend += singleBookmark;
  }
  bookmarkContainer.innerHTML = dataToAppend;
}

function getSingleBookmarkBodyFromNameAndNumber(shabadPre, shabadId) {
  return `
    <div id='bookmark_${shabadId}' class="bookmark" data-shabadid='${shabadId}'>
      <a data-shabadid='${shabadId}' href='#' class='bookmark-show' id='bookmark-show_${shabadId}'>${shabadPre}</a>
      <button class="icon bookmark-delete" data-shabadid='${shabadId}' id='bookmark-delete_${shabadId}'>
        <span class="material-symbols-outlined" data-shabadid='${shabadId}'>delete</span>
      </button>
    </div>
  `;
}

/**
 * Function used to add bookmarks on click or longpress of pankti
 * 
 * @param {Event} event 
 */
function addBookmark(event, bookmarkContainer, baniElement, baniName) {
  /**
   * @type {HTMLElement}
   */
  const baniPanktiElement = event.target.closest('.gurmukhi');
  if (!enableBookmarks || !baniPanktiElement?.classList.contains('gurmukhi')) {
    return;
  }

  const bookmarkObject = prepareBookmarkObject(baniPanktiElement, baniElement, baniName);
  if (!bookmarkObject) {
    return;
  }
  addBookmarkToUI(bookmarkContainer, bookmarkObject);
  deleteSingleBookmarkListner(baniName, bookmarkObject.shabadId);
  bookmarkJumpSingleListner(bookmarkObject.shabadId);
  saveBookmarkToLocal(bookmarkObject);
}

function prepareBookmarkObject(baniPanktiElement, baniElement, baniName) {
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

  const shabadPre = baniPanktiElement.innerText.trim().substring(0, 20);

  return {
    shabadId: shabadId,
    shabadPre: shabadPre,
    baniName: baniName
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
  const singleBookmark = getSingleBookmarkBodyFromNameAndNumber(bookmarkObject.shabadPre, bookmarkObject.shabadId);

  bookmarkContainer.insertAdjacentHTML(
    'beforeend',
    singleBookmark
  );
}

function saveBookmarkListner(baniElement, bookmarkContainer, baniName) {
  longPress(baniElement,
    (e) => {
      addBookmark(e, bookmarkContainer, baniElement, baniName)
    },
    500
  )
}

/**
 * Enable disable bookmark feature
 * 
 * @param {HTMLInputElement} bookmarkCheckbox 
 * @param {HTMLElement} baniElement 
 */
function enableAddBookmarkListner(bookmarkCheckbox, baniElement) {
  bookmarkCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      enableBookmarks = true;
      baniElement.classList.add('prevent-selection');
    } else {
      enableBookmarks = false;
      baniElement.classList.remove('prevent-selection');
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

function deleteBookmarkButtonsListner(baniName) {
  const buttons = document.getElementsByClassName('bookmark-delete');

  for (const button of buttons) {
    button.addEventListener('click', (e)=>{
      const shabadId = Number(e.target.getAttribute('data-shabadid'));
      deleteSingleBookmarkFromLocal(shabadId, baniName);
      deleteSingleBookmarkFromUI(shabadId);
    });
  }
}

function deleteSingleBookmarkListner(baniName, shabadId) {
  const deleteButton = document.getElementById("bookmark-delete_" + shabadId);

  deleteButton.addEventListener('click', (e)=>{
    const shabadId = Number(e.target.getAttribute('data-shabadid'));
    deleteSingleBookmarkFromLocal(shabadId, baniName);
    deleteSingleBookmarkFromUI(shabadId);
  });
}

function deleteSingleBookmarkFromLocal(shabadId, baniName) {
  bookmarksFromLocal = bookmarksFromLocal.filter((val)=>val.baniName == baniName && val.shabadId != shabadId);
  
  const bookmarksStringForSaving = JSON.stringify(bookmarksFromLocal);

  setLocalStorageItem(BOOKMARKS, bookmarksStringForSaving);
}

function deleteSingleBookmarkFromUI(shabadId) {
  /**
   * @type {HTMLElement}
   */
  const bookmarkToDelete = document.getElementById("bookmark_" + shabadId);

  bookmarkToDelete.remove();
}

function bookmarkJumpListners() {
  const jumpLinks = document.getElementsByClassName("bookmark-show");

  for (const link of jumpLinks) {
    bookmarkJumpListner(link);
  }
}

function bookmarkJumpSingleListner(shabadId) {
  const link = document.getElementById("bookmark-show_" + shabadId);
  bookmarkJumpListner(link);
}

function bookmarkJumpListner(bookmarkLink) {
  bookmarkLink.addEventListener('click', (e)=>{
    const shabadId = e.target.getAttribute('data-shabadid');
    jumpToBookmark(shabadId)
  });
}

function jumpToBookmark(shabadId) {
  resetShabadsSize(shabadId);
}
