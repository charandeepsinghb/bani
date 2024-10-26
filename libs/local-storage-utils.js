export const FLOATING_BUTTON_X = "floatingButtonX";
export const FLOATING_BUTTON_Y = "floatingButtonY";

export function setLocalStorageItem(name, value) {
    localStorage.setItem(name, value)
}

export function getLocalStorageItem(name) {
    return localStorage.getItem(name);
}