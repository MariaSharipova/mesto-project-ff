export { createCard, removeCard, handleCardLikeButtonClick };
import { deleteCard, addLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

const createCard = (
  name,
  link,
  likes,
  removeCard,
  handleCardLikeButtonClick,
  handleCardImageClick,
  userId, 
  cardOwnerId,
  cardId 
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like_counter");

  if (userId === cardOwnerId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId)
        .then(() => {
          removeCard(cardElement);
        })
        .catch((err) => {
          console.error("Ошибка при удалении карточки:", err);
        });
    });
  } else {
    deleteButton.style.display = "none";
  }
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  likeCounter.textContent = likes.length;
  
  const likesArray = Array.isArray(likes) ? likes : [];
  const userHasLiked = likesArray.some((like) => like._id === userId);
  if (userHasLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    handleCardLikeButtonClick(
      evt,
      cardId,
      likeButton,
      likeCounter
    )});
  cardElement.addEventListener("click", handleCardImageClick);

  return cardElement;
};

const removeCard = (cardElement) => {
  cardElement.remove();
};


const handleCardLikeButtonClick = (evt, cardId, likeButton, likeCounter) => {
  if (evt.target.classList.contains("card__like-button")) {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    if (!isLiked) {
      addLike(cardId)
        .then((data) => {
          likeButton.classList.add("card__like-button_is-active");
          likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при добавлении лайка:", err);
        });
    } else {
      removeLike(cardId)
        .then((data) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при удалении лайка:", err);
        });
    }
  }
};
