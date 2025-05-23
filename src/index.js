import "./pages/index.css";
import { initialCards } from "./modules/cards.js";
import { createCard, removeCard } from "./modules/card.js";
import { addOpenClass, openPopup, closePopupEsc, closePopup, removeOpenClass } from "./modules/modal.js";

const placesList = document.querySelector(".places__list");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector("form[name='edit-profile']");
const formNewPlase = document.querySelector("form[name='new-place']");
const imgInputLink = document.querySelector(".popup__input_type_url");
const imgInputName = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const places = document.querySelector(".places__list");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const userJob = document.querySelector(".profile__description");
const userName = document.querySelector(".profile__title");
const popups = [popupProfile, popupAdd, popupImage];

popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
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





 
function openProfilePopup(button, popup) {
  button.addEventListener("click", function () {
    nameInput.value = userName.innerText;
    jobInput.value = userJob.innerText;
    addOpenClass(popup);
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

formEditProfile.addEventListener("submit", handleFormSubmit);

// function openPopup(button, popup) {
//   button.addEventListener("click", function () {
//     addOpenClass(popup);
//   });
// }

// function handleEscClose(evt, popup) {
//   if (evt.key === "Escape") {
//     removeOpenClass(popup);
//     document.removeEventListener("keydown", (ev) => handleEscClose(ev, popup));
//   }
// }

// function closePopupEsc(popup) {
//   const escCloseHandler = (evt) => handleEscClose(evt, popup);
//   document.addEventListener("keydown", escCloseHandler);
// }


// function closePopup(popup) {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target === evt.currentTarget) {
//       removeOpenClass(popup);
//     }
//   });
//   buttonsClosePopup.forEach((button) => {
//     button.addEventListener("click", () => {
//       removeOpenClass(popup);
//     });
//   });
//   buttonSubmitPopup.forEach((button) => {
//     button.addEventListener("click", () => {
//       removeOpenClass(popup);
//     });
//   });
// }

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

formNewPlase.addEventListener("submit", handleImageSubmit);



function handleCardLikeButtonClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
places.addEventListener("click", handleCardLikeButtonClick);
places.addEventListener("click", handleCardImageClick);

function handleCardImageClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    openImagePopup(evt, popupImage);
  }
}

function openImagePopup(evt, popup) {
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");
  image.src = evt.target.currentSrc;
  image.alt = evt.target.offsetParent.innerText;
  caption.textContent = evt.target.offsetParent.innerText;
  addOpenClass(popup);
}


openProfilePopup(buttonProfile, popupProfile);
openPopup(buttonAdd, popupAdd);
closePopup(popupProfile);
closePopup(popupAdd);
closePopupEsc(popupProfile);
closePopupEsc(popupAdd);
closePopup(popupImage);
closePopupEsc(popupImage);

