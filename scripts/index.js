const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(name, link, removeCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(card));
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  placesList.append(card);
}

function removeCard(card) {
  card.remove();
}

for (let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i].name, initialCards[i].link, removeCard);
}
