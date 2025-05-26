import "./pages/index.css";
import { initialCards } from "./modules/cards.js";
import { createCard, removeCard } from "./modules/card.js";
import {
  addOpenClass,
  openPopup,
  closePopupEsc,
  closePopup,
} from "./modules/modal.js";

const placesList = document.querySelector(".places__list");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonProfile = document.querySelector(".profile__edit-button");
const buttonSubmitPopupList = document.querySelectorAll(".popup__button");
const buttonsClosePopupList = document.querySelectorAll(".popup__close");
const formEditProfile = document.querySelector("form[name='edit-profile']");
const formNewPlase = document.querySelector("form[name='new-place']");
const imgInputLink = document.querySelector(".popup__input_type_url");
const imgInputName = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const userJob = document.querySelector(".profile__description");
const userName = document.querySelector(".profile__title");
const popups = [popupProfile, popupAdd, popupImage];

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

function openProfilePopup(button, popup) {
  button.addEventListener("click", function () {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    addOpenClass(popup);
  });
}

function openImagePopup(evt, popup) {
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");
  image.src = evt.target.currentSrc;
  image.alt = evt.target.offsetParent.textContent;
  caption.textContent = evt.target.offsetParent.textContent;
  addOpenClass(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

function handleImageSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(
    imgInputName.value,
    imgInputLink.value,
    removeCard
  );
  placesList.prepend(cardElement);
  formNewPlase.reset();
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

openProfilePopup(buttonProfile, popupProfile);
openPopup(buttonAdd, popupAdd);

popups.forEach((popup) => {
  closePopup(popup);
  closePopupEsc(popup);
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
  cardElement.addEventListener("click", handleCardLikeButtonClick);
  cardElement.addEventListener("click", handleCardImageClick);
});


