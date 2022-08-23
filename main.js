const cardBoard = document.querySelector("#cardboard");
const imgs = [
  "black.webp",
  "bucha.webp",
  "jack.webp",
  "james.webp",
  "old.webp",
  "special.webp"
];

let cardHTML = "";

imgs.forEach(img => {
  cardHTML += ` 
    <div class="memory-card">
     <img src="img/${img}">
     <img src="img/capa.jpg">
    </div>
  `
});

cardBoard.innerHTML = cardHTML;
const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));