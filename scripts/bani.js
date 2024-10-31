import { addFloatingButton } from "../components/floating-button/floating-button";
import { setFromLocalColumnWidth } from "../libs/column-width";
import { setFromLocalFontSize } from "../libs/font-size";
import { setFromLocalLineHeight } from "../libs/line-height";

const floatingButtonContainer = document.getElementById("floating-button-container");

if (floatingButtonContainer != null) addFloatingButton(floatingButtonContainer);

function setPropertiesFromLocal() {
    const baniElement = document.getElementById("bani");

    setFromLocalFontSize(baniElement);
    setFromLocalColumnWidth(baniElement);
    setFromLocalLineHeight(baniElement);
}

setPropertiesFromLocal();
