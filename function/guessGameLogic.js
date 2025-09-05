let targetNumber;
let attempts;
const maxAttempts = 10;
let gameOver = false;
// Start Game
export function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    document.getElementById("feedback").textContent = "Guess a number between 1 and 100!";
    document.getElementById("attempts").textContent = "Attempts: 0";
    document.getElementById("restartGame").classList.add("hidden");
    document.getElementById("submitGuess").disabled = false;
    document.getElementById("userInput").value = "";
}

function handleGuess() {
    if (gameOver) return;

    const userInput = document.getElementById("userInput");
    const feedback = document.getElementById("feedback");
    const attemptsDisplay = document.getElementById("attempts");

    const guess = Number(userInput.value);
    if (!guess || guess < 1 || guess > 100) {
        feedback.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    if (guess === targetNumber) {
        feedback.textContent = `🎉 Correct! The number was ${targetNumber}. You guessed it in ${attempts} attempts.`;
        endGame();
    } else if (attempts >= maxAttempts) {
        feedback.textContent = `❌ Game over! The number was ${targetNumber}.`;
        endGame();
    } else {
        feedback.textContent = guess < targetNumber ? "Too low! Try again." : "Too high! Try again.";
        const guessElement = document.createElement("div");
        guessElement.textContent = `Guess ${attempts}: ${guess}`;
    }

    userInput.value = "";
}

function endGame() {
    gameOver = true;
    document.getElementById("submitGuess").disabled = true;
    document.getElementById("restartGame").classList.remove("hidden");
}

// Mulai dan restart game
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitGuess").addEventListener("click", handleGuess);
    document.getElementById("restartGame").addEventListener("click", startGame);

    startGame();
});