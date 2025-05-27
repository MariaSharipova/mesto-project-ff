export { openPopup, closePopup };

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(evt, popup) {
  if (evt.target === evt.currentTarget || evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(evt) {
  const activePopup = document.querySelector(".popup_is-opened");
  if (activePopup) {
    closePopup(evt, activePopup);
  }
}
