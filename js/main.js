let overlayBtn = document.querySelector(".overlay button");
let nameSpan = document.querySelector(".game .info span.name");
let info = document.querySelector(".game .info");

// overlay btn
overlayBtn.addEventListener("click", () => {
  let prompt = window.prompt("Enter Your Name Please:");
  nameSpan.innerHTML = prompt;
  overlayBtn.parentElement.remove();
  info.style.display = "flex";
});

let duration = 1000;

let cardsCont = document.querySelector(".cards");
let cards = Array.from(cardsCont.children);
let orderRange = [...Array(cards.length).keys()];

cards.forEach((card) => {
  card.style.order = orderRange[parseInt(Math.random() * orderRange.length)];
  card.addEventListener("click", () => {
    flipCard(card);
  });
});

function flipCard(selectedCard) {
  selectedCard.classList.add("is-flipped");
  let allFlippedCard = cards.filter((flipped) =>
    flipped.classList.contains("is-flipped")
  );
  if (allFlippedCard.length === 2) {
    stopClick();
    matchedCards(allFlippedCard[0], allFlippedCard[1]);
  }
}

function stopClick() {
  cardsCont.classList.add("no-click");
  setTimeout(() => {
    cardsCont.classList.remove("no-click");
  }, duration);
}

function matchedCards(firstCard, secondCard) {
  let tries = document.querySelector(".game .info span.tries");
  if (firstCard.dataset.tech === secondCard.dataset.tech) {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    document.getElementById("success").play();
  } else {
    tries.textContent++;
    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
    }, duration);
    document.getElementById("failed").play();
  }
}

// playground sound
// timer and game over when it ends
// tries for users local storage
