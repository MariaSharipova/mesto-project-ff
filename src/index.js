import "./pages/index.css";
import { initialCards } from "./modules/cards.js";
import { createCard, removeCard } from "./modules/card.js";
import { openPopup, closePopup } from "./modules/modal.js";

const placesList = document.querySelector(".places__list");
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonProfile = document.querySelector(".profile__edit-button");
const buttonsClosePopupList = document.querySelectorAll(".popup__close");
const formEditProfile = document.querySelector("form[name='edit-profile']");
const formNewPlase = document.querySelector("form[name='new-place']");
const imgInputLink = document.querySelector(".popup__input_type_url");
const imgInputName = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const userJob = document.querySelector(".profile__description");
const userName = document.querySelector(".profile__title");
const popups = [popupProfile, popupAddPlace, popupImage];

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

function openProfilePopup(popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popup);
}

function openImagePopup(evt, popup) {
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");
  image.src = evt.target.currentSrc;
  image.alt = evt.target.offsetParent.textContent;
  caption.textContent = evt.target.offsetParent.textContent;
  openPopup(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(evt, popupProfile);
}

function handleImageSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(
    imgInputName.value,
    imgInputLink.value,
    removeCard,
    handleCardLikeButtonClick,
    handleCardImageClick
  );
  placesList.prepend(cardElement);
  formNewPlase.reset();
  closePopup(evt, popupAddPlace);
}

function handleCardLikeButtonClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function handleCardImageClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    openImagePopup(evt, popupImage);
  }
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlase.addEventListener("submit", handleImageSubmit);

buttonProfile.addEventListener("click", () => openProfilePopup(popupProfile));
buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => closePopup(evt, popup));
  buttonsClosePopupList.forEach((button) => {
    button.addEventListener("click", (evt) => closePopup(evt, popup));
  });
});

initialCards.forEach(function (item) {
  const cardElement = createCard(
    item.name,
    item.link,
    removeCard,
    handleCardLikeButtonClick,
    handleCardImageClick
  );
  placesList.append(cardElement);
});
