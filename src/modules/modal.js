export { openPopup, closePopup };

const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
};

const closePopup = (evt, popup) => {
  if (!evt || evt.target === evt.currentTarget || evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
  }
};

const handleEscClose = (evt) => {
  const activePopup = document.querySelector(".popup_is-opened");
  if (activePopup) {
    closePopup(evt, activePopup);
  }
};
