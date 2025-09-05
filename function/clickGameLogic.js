let score = 0;
let timeLeft = 30;
let gameInterval;

// Start Game
function startGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    document.getElementById("feedback").textContent = "";

    gameInterval = setInterval(gameLoop, 1000);
}

function gameLoop() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        endGame();
    }
}

function updateScore() {
    document.getElementById("clickCount").textContent = `Score: ${score}`;
}

function updateTimer() {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
}

function incrementScore() {
    if (timeLeft > 0) {
        score++;
        updateScore();
    }
}

function endGame() {
    clearInterval(gameInterval);
    document.getElementById("feedback").textContent = `Game Over! Your final score is ${score}.`;
    document.getElementById("clickButton").disabled = true;
    document.getElementById("restartGame").classList.remove("hidden");
}

function resetGame() {
    document.getElementById("clickButton").disabled = false;
    document.getElementById("restartGame").classList.add("hidden");
    startGame();
}

// Pasang event listener setelah halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clickButton").addEventListener("click", incrementScore);
    document.getElementById("restartGame").addEventListener("click", resetGame);
    startGame();
});