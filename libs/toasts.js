export function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast-container");

  // Set the message
  toast.textContent = message;

  // Show toast
  toast.classList.remove("hide");
  toast.classList.add("show");

  // Hide toast after duration
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, duration);
}
