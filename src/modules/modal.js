export { addOpenClass, openPopup, closePopupEsc, closePopup };

const buttonSubmitPopup = document.querySelectorAll(".popup__button");
const buttonsClosePopup = document.querySelectorAll(".popup__close");

function addOpenClass(popup) {
  popup.classList.add("popup_is-opened");
}

function removeOpenClass(popup) {
  popup.classList.remove("popup_is-opened");
}

function openPopup(button, popup) {
  button.addEventListener("click", function () {
    addOpenClass(popup);
  });
}

function handleEscClose(evt, popup) {
  if (evt.key === "Escape") {
    removeOpenClass(popup);
    document.removeEventListener("keydown", (ev) => handleEscClose(ev, popup));
  }
}

function closePopupEsc(popup) {
  const escCloseHandler = (evt) => handleEscClose(evt, popup);
  document.addEventListener("keydown", escCloseHandler);
}

function closePopup(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      removeOpenClass(popup);
    }
  });
  buttonsClosePopup.forEach((button) => {
    button.addEventListener("click", () => {
      removeOpenClass(popup);
    });
  });
  buttonSubmitPopup.forEach((button) => {
    button.addEventListener("click", () => {
      removeOpenClass(popup);
    });
  });
}
