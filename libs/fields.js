export function updateNumberInputValue(element, value) {
  element.value = Number.parseFloat(value).toFixed(2);
}

function setCheckedAttribute(value, fieldId) {
  if (value === "true") {
    document.getElementById(fieldId).setAttribute("checked", true);
    return;
  }
  document.getElementById(fieldId).removeAttribute("checked");
}
