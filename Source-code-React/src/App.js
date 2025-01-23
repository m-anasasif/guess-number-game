import React, { useState } from "react";
import "./App.css";

const NumberGuessingGame = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [chances, setChances] = useState(10);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setFeedback("Please enter a valid number.");
      return;
    }

    if (userGuess < 1 || userGuess > 100) {
      setFeedback("Enter number between 1 to 100");
      return;
    }
    setPreviousGuesses([...previousGuesses, userGuess]);

    setAttempts(attempts + 1);
    setChances(chances - 1);

    if (chances === 1) {
      setFeedback(`Oops! The correct number is ${randomNumber}`);
    }else{
      if (userGuess === randomNumber) {
        setFeedback(`Congratulations! You guessed it in ${attempts + 1} attempts.`);
      } else if (userGuess < randomNumber) {
        setFeedback("Too low! Try again.");
      }      
      else {
        setFeedback("Too high! Try again.");
      }
    } 
    setGuess("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGuess();
    }
  };

  const handleReset = () => {window.location.reload()};

  return (
    <div className="game-container">
      <h1>Number Guessing Game</h1>
      <p className="text">Guess the number between 1 to 100</p>
      <input
        type="number"
        value={guess}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled = {chances === 0}
        placeholder="Enter your guess"
      />
      {feedback && <p className="feedback_text">{feedback}</p>}
      <div className="buttons">
        <button onClick={handleGuess}>Guess</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {previousGuesses.length !== 0 && (
        <p className="previous_guess">
          Previous Guesses: {previousGuesses.join(',')}
        </p>
      )}
      <p className="attempts">Attempts: {attempts}</p>
      {chances && <p>Guesses Left: {chances}</p>}
    </div>
  );
};

export default NumberGuessingGame;
