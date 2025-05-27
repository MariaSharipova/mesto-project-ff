export { openPopup, closePopup };

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => {
    handleEscClose(evt, popup);
  });
}

function closePopup(evt, popup) {
  if (evt.target === evt.currentTarget || evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(evt, popup) {
  closePopup(evt, popup);
}
