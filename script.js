const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.querySelector(".check-btn"),
  remainChances = document.querySelector(".chances"),
  gameModal = document.querySelector(".game-modal"),
  playAgainBtn = gameModal.querySelector("button");

let randomNum = generateRandomNumber(1, 100),
  chance = 10;

input.focus();

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateUI(message, color) {
  guess.textContent = message;
  guess.style.color = color;
  remainChances.textContent = chance;
}

function gameOver(isVictory) {
  const modalText = isVictory ? `You found the number:` : "The correct number was:";
  const resultImage = isVictory ? "victory" : "lost";
  const resultText = isVictory ? "Congrats!" : "Game Over!";
  const resultNumber = isVictory ? randomNum : "";

  gameModal.querySelector("img").src = `images/${resultImage}.gif`;
  gameModal.querySelector("h4").innerText = resultText;
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${resultNumber}</b>`;
  gameModal.classList.add("show");
}

checkButton.addEventListener("click", () => {
  chance--;
  const inputValue = parseInt(input.value);

  if (inputValue === randomNum) {
    gameOver(true);
  } else if (inputValue > randomNum && inputValue < 100) {
    updateUI("Your guess is high", "#333");
  } else if (inputValue < randomNum && inputValue > 0) {
    updateUI("Your guess is low", "#333");
  } else {
    updateUI("Your number is invalid", "#DE0611");
  }

  if (chance === 0) {
    gameOver(false);
  }
  if (chance < 0) {
    window.location.reload();
  }
});

playAgainBtn.addEventListener("click", () => {
  randomNum = generateRandomNumber(1, 100);
  chance = 10;

  input.value = "";
  updateUI("", "#333");
  gameModal.classList.remove("show");
});
