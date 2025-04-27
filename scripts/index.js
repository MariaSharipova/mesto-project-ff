const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(name, link, removeCard) {
  const cardElement  = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement .querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(cardElement));
  cardElement.querySelector(".card__title").textContent = name;
  cardElement .querySelector(".card__image").src = link;
  return cardElement;
}

function removeCard(cardElement ) {
    cardElement .remove();
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link, removeCard);
  placesList.append(cardElement );
});
