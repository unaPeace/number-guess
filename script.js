const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.querySelector(".check-btn"),
  remainChances = document.querySelector(".chances"),
  gameModal = document.querySelector(".game-modal"),
  playAgainBtn = gameModal.querySelector("button");

input.focus();

let randomNum = Math.floor(Math.random() * 100), inputValue;
chance = 10;

const gameOver = (isVictory) => {
  // After game complete.. showing modal with relevant details
  const modalText = isVictory ? `You found the number:` : "The correct number was:";
  gameModal.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Congrats!"
    : "Game Over!";
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${randomNum}</b>`;
  gameModal.classList.add("show");
};

checkButton.addEventListener("click", () => {
  chance--;
  inputValue = input.value;
  if (inputValue == randomNum) {
    gameOver(true);
  } else if (inputValue > randomNum && inputValue < 100) {
    [guess.textContent, remainChances.textContent] = ["Your guess is high", chance];
    guess.style.color = "#333";
  } else if (inputValue < randomNum && inputValue > 0) {
    [guess.textContent, remainChances.textContent] = ["Your guess is low", chance];
    guess.style.color = "#333";
  } else {
    [guess.textContent, remainChances.textContent] = ["Your number is invalid", chance];
    guess.style.color = "#DE0611";
  }
  if (chance == 0) {
    gameOver(false);
  }
  if (chance < 0) {
    window.location.reload();
  }
});

playAgainBtn.addEventListener("click", () => {
  // Resetting variables
  randomNum = Math.floor(Math.random() * 100);
  chance = 10;
  
  // Resetting UI elements
  input.value = "";
  guess.textContent = "";
  remainChances.textContent = chance;
  guess.style.color = "#333";

  // Hide the modal if it's currently shown
  gameModal.classList.remove("show");
});