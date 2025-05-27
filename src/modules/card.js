export { createCard, removeCard, handleCardLikeButtonClick };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  removeCard,
  handleCardLikeButtonClick,
  handleCardImageClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(cardElement));
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = `Фотография места: ${name}`;
  cardElement.addEventListener("click", handleCardLikeButtonClick);
  cardElement.addEventListener("click", handleCardImageClick);
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function handleCardLikeButtonClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
