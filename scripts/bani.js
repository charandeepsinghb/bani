import { addFloatingButton } from "../components/floating-button/floating-button.js";
import { setFromLocalColumnWidth } from "../libs/column-width.js";
import { setFromLocalFontSize } from "../libs/font-size.js";
import { setFromLocalLineHeight } from "../libs/line-height.js";

const floatingButtonContainer = document.getElementById("floating-button-container");

if (floatingButtonContainer != null) addFloatingButton(floatingButtonContainer);

function setPropertiesFromLocal() {
    const baniElement = document.getElementById("bani");

    setFromLocalFontSize(baniElement);
    setFromLocalColumnWidth(baniElement);
    setFromLocalLineHeight(baniElement);
}

setPropertiesFromLocal();
