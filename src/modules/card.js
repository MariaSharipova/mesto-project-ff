const cardTemplate = document.querySelector("#card-template").content;

export { createCard, removeCard };

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
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}
