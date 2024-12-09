export const FLOATING_BUTTON_X = "floatingButtonX";
export const FLOATING_BUTTON_Y = "floatingButtonY";

export function setLocalStorageItem(name, value) {
  localStorage.setItem(name, value);
}

export function removeLocalStorageItem(name) {
  localStorage.removeItem(name);
}

export function getLocalStorageItem(name) {
  return localStorage.getItem(name);
}

export const FONT_SIZE = "fontSize";
export const LINE_HEIGHT = "lineHeight";
export const WORD_SPACING = "wordSpacing";
export const COLUMN_WIDTH = "columnWidth";
export const ALIGN = "align";
export const SCROLL = "scroll";
export const PUNJABI = "english";
export const ENGLISH = "punjabi";
export const DARK_MODE = "darkMode";
export const FONT_COLOR = "fontColor";
export const BACKGROUND_COLOR = "backgroundColor";

export function cleanLocalStoreage() {
  localStorage.clear();
}
