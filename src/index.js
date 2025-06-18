import "./pages/index.css";
import {
  createCard,
  removeCard,
  handleCardLikeButtonClick,
} from "./modules/card.js";
import { openPopup, closePopup } from "./modules/modal.js";
import { enableValidation, clearValidation } from "./modules/validation.js";
import {
  getInitialCards,
  getUser,
  patchProfile,
  editAvatar,
  postNewCard,
} from "./modules/api.js";

const placesList = document.querySelector(".places__list");
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector("form[name='edit-profile']");
const formNewPlace = document.querySelector("form[name='new-place']");
const formEditAvatar = document.querySelector("form[name='edit-avatar']");
const imgInputLink = document.querySelector(".popup__input_type_url");
const imgInputName = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const avatarInput = document.querySelector(".popup__input_type_url_avatar");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const popupEditAvatar = document.querySelector(".popup_type_edit_avatar");
const userJob = document.querySelector(".profile__description");
const userName = document.querySelector(".profile__title");
const userAvatar = document.querySelector(".profile__image");
const popups = [popupProfile, popupAddPlace, popupImage, popupEditAvatar];
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorActive: "popup__input-error_active",
};

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

const openProfilePopup = (popup) => {
  clearValidation(popup, validationConfig);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popup);
};

const openEditAvatarPopup = (popup) => {
  avatarInput.value = "";
  clearValidation(popup, validationConfig);
  openPopup(popup);
};

const openAddPlacePopup = (popup) => {
  imgInputName.value = "";
  imgInputLink.value = "";
  clearValidation(popup, validationConfig);
  openPopup(popup);
};

const openImagePopup = (cardElement, popup) => {
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");
  const imageElement = cardElement.querySelector(".card__image");
  console.log(cardElement);
  image.src = imageElement.currentSrc;
  image.alt = imageElement.alt;
  caption.textContent = imageElement.alt;

  openPopup(popup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const saveButton = formEditProfile.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value).finally(() => {
    saveButton.textContent = "Сохранить";
  });
  closePopup(evt, popupProfile);
};

const handleImageSubmit = (evt) => {
  evt.preventDefault();
  const saveButton = formNewPlace.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  postNewCard(imgInputName.value, imgInputLink.value).finally(() => {
    saveButton.textContent = "Сохранить";
  });
  const cardElement = createCard(
    imgInputName.value,
    imgInputLink.value,
    [],
    removeCard,
    handleCardLikeButtonClick,
    handleCardImageClick
  );
  placesList.prepend(cardElement);
  formNewPlace.reset();

  closePopup(evt, popupAddPlace);
};

const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  const saveButton = formEditAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  const link = avatarInput.value;
  editAvatar(link)
    .then((updatedUser) => {
      userAvatar.src = updatedUser.avatar;
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
  closePopup(evt, popupEditAvatar);
};

const handleCardImageClick = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    const cardElement = evt.target.closest(".card");
    openImagePopup(cardElement, popupImage);
  }
};

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handleImageSubmit);
formEditAvatar.addEventListener("submit", handleAvatarSubmit);

buttonProfile.addEventListener("click", () => openProfilePopup(popupProfile));
buttonAddPlace.addEventListener("click", () =>
  openAddPlacePopup(popupAddPlace)
);
userAvatar.addEventListener("click", (evt) =>
  openEditAvatarPopup(popupEditAvatar)
);

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", (evt) => closePopup(evt, popup));
  if (closeButton) {
    closeButton.addEventListener("click", (evt) => closePopup(evt, popup));
  }
});

const initUser = () => {
  getUser()
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
      userAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
};

Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    const userId = userInfo._id;

    initialCards.forEach((item) => {
      const cardElement = createCard(
        item.name,
        item.link,
        item.likes,
        removeCard,
        handleCardLikeButtonClick,
        handleCardImageClick,
        userId,
        item.owner._id,
        item._id
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

initUser();

enableValidation(validationConfig);
