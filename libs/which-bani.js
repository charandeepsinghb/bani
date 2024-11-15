let baniName = '';

/**
 * 
 * @param {HTMLElement} baniElement 
 * @returns 
 */
export function getBaniName(baniElement) {
    if (baniName != '') {
        return baniName;
    }

    baniName = baniElement.getAttribute("data-bani-name") || '';
    return baniName;
}
