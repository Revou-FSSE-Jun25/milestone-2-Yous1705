let userScore = 0;
let computerScore = 0;
const maxScore = 5;

export function startGame() {
    userScore = 0;
    computerScore = 0;
    updateScore();
    setResult("Choose Rock, Paper, or Scissors!");
    document.getElementById("restartGame").classList.add("hidden");

    // Mengambil pilihan user
    document.getElementById("rock").onclick = () => playRound("Rock");
    document.getElementById("paper").onclick = () => playRound("Paper");
    document.getElementById("scissors").onclick = () => playRound("Scissors");

    // Tombol restart
    document.getElementById("restartGame").onclick = resetGame;
}

// Logic Game RPS
function playRound(userChoice) {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (userChoice === computerChoice) {
        setResult(`🤝 It's a tie! You both chose ${userChoice}.`);
    } else if (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Paper" && computerChoice === "Rock") ||
        (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
        setResult(`✅ You win! ${userChoice} beats ${computerChoice}.`);
        userScore++;
    } else {
        setResult(`❌ You lose! ${computerChoice} beats ${userChoice}.`);
        computerScore++;
    }

    updateScore();
    checkGameOver();
}

function updateScore() {
    document.getElementById("score").textContent =
        `Score - You: ${userScore} | Computer: ${computerScore}`;
}

function setResult(message) {
    document.getElementById("result").textContent = message;
}

function checkGameOver() {
    if (userScore >= maxScore) {
        setResult("🎉 Congratulations! You reached 5 points and won the game!");
        endGame();
    } else if (computerScore >= maxScore) {
        setResult("💻 The computer reached 5 points. You lose!");
        endGame();
    }
}

function endGame() {
    document.getElementById("restartGame").classList.remove("hidden");
    // Matikan tombol biar tidak bisa ditekan lagi
    document.getElementById("rock").onclick = null;
    document.getElementById("paper").onclick = null;
    document.getElementById("scissors").onclick = null;
}

export function resetGame() {
    startGame();
}

window.addEventListener("DOMContentLoaded", () => startGame());