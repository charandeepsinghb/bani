let currentFontSize;
let numberFontSize;
let baniSection;
setTimeout(() => {
    baniSection = document.getElementById("bani");
    currentFontSize = window.getComputedStyle(baniSection).getPropertyValue('font-size');
    numberFontSize = Number(currentFontSize.substring(0, currentFontSize.length - 2));
    setFontSize(numberFontSize);
}, 100);

const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 200;

function changeBackgroundColor(value) {
    document.body.style.backgroundColor = value;
}

function changeFontColor(value) {
    document.body.style.color = value;
}

function increaseFontSize() {
    let newNumberFontSize = numberFontSize + 0.2;
    if (!isBetween(MIN_FONT_SIZE, MAX_FONT_SIZE, numberFontSize)) {
        return;
    }
    numberFontSize = newNumberFontSize;
    setFontSize(numberFontSize);
    baniSection.style.fontSize = numberFontSize + "px"
}

function decreaseFontSize() {
    let newNumberFontSize = numberFontSize - 0.2;
    if (!isBetween(MIN_FONT_SIZE, MAX_FONT_SIZE, numberFontSize)) {
        return;
    }
    numberFontSize = newNumberFontSize;
    setFontSize(numberFontSize);
    baniSection.style.fontSize = numberFontSize + "px";
}

function setFontSize(value) {
    document.getElementById("currentFontSize").value = value.toFixed(1);
}

function changeFontSize(size) {
    if (!isBetween(MIN_FONT_SIZE, MAX_FONT_SIZE, size)) {
        return;
    }
    numberFontSize = Number(size);
    baniSection.style.fontSize = size + 'px';
}

function darkMode(isOn) {
    if (isOn) {
        document.body.style.backgroundColor = "#000000"
        document.body.style.color = "#ffffff";
    } else {
        document.body.style.backgroundColor = "#ffffff"
        document.body.style.color = "#000000";
    }
}

let emitterInterv;
function continuousEmitterStart(func) {
    emitterInterv = setInterval(() => {
        func()
    }, 1);
}

function continuousEmitterStop() {
    clearInterval(emitterInterv);
}

function isBetween(first, second, num) {
    if (num >= first && num <= second) {
        return true;
    }
}
