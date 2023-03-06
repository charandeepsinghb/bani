let currentFontSize;
let numberFontSize;
let baniSection;
setTimeout(() => {
    baniSection = document.getElementById("bani");
    currentFontSize = window.getComputedStyle(baniSection).getPropertyValue('font-size');
    numberFontSize = Number(currentFontSize.substring(0, currentFontSize.length - 2));
    setFontSize(numberFontSize);
}, 100);


function changeBackgroundColor(value) {
    document.body.style.backgroundColor = value;
}

function changeFontColor(value) {
    document.body.style.color = value;
}

function increaseFontSize() {
    numberFontSize = numberFontSize + 0.2;
    setFontSize(numberFontSize);
    baniSection.style.fontSize = numberFontSize + "px"
}

function decreaseFontSize() {
    numberFontSize = numberFontSize - 0.2;
    setFontSize(numberFontSize);
    baniSection.style.fontSize = numberFontSize + "px";
}

function setFontSize(value) {
    document.getElementById("currentFontSize").value = value.toFixed(1);
}

function changeFontSize(size) {
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
