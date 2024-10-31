export const FLOATING_BUTTON_X = "floatingButtonX";
export const FLOATING_BUTTON_Y = "floatingButtonY";

export function setLocalStorageItem(name, value) {
    localStorage.setItem(name, value)
}

export function getLocalStorageItem(name) {
    return localStorage.getItem(name);
}

export const FONT_SIZE = "fontSize";
export const LINE_HEIGHT = "lineHeight";
export const COLUMN_WIDTH = "columnWidth";

export function cleanLocalStoreage() {
  localStorage.clear();
}