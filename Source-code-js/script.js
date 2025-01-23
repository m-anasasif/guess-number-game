let randomNumber = Math.floor(Math.random() * 100) + 1;
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessednumbers = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const restartButton = document.querySelector(".restart-button");

restartButton.style.display = 'none';

let prevGuesses = [];
let remainingGuesses = 10;
let gameActive = true;

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!gameActive) return;
  const guess = parseInt(userInput.value);
  processGuess(guess);
});

function processGuess(guess) {
  if (guess < 1 || guess > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  prevGuesses.push(guess);
  updateUI(guess);

  if (guess === randomNumber) {
    endGame(`Congratulations! You guessed it right.`);
  } else if (remainingGuesses === 0) {
    endGame(`Game Over! The correct number was ${randomNumber}.`);
  } else {
    giveHint(guess);
  }
}

function updateUI(guess) {
  userInput.value = "";
  guessednumbers.textContent = `Previous guesses: ${prevGuesses.join(", ")}`;
  remaining.textContent = `Remaining guesses: ${remainingGuesses}`;
  remainingGuesses--;
}

function giveHint(guess) {
  lowOrHi.textContent = guess < randomNumber ? "Too low!" : "Too high!";
}

function endGame(message) {
  gameActive = false;
  lowOrHi.textContent = message;
  userInput.disabled = true;
  restartButton.style.display = "block";
  reloadPage();
}

const reloadPage = () => {
  restartButton.addEventListener("click", () => {
    location.reload();
  });
}