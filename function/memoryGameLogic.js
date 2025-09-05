let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
let totalPairs = 6;
let attempts = 0;
let maxAttempts = 20;

// Mulai game
function startGame() {

    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchesFound = 0;
    attempts = 0;

    document.getElementById("attempts").textContent = "Attempts: 0";
    document.getElementById("result").textContent = "Find all matching pairs!";
    document.getElementById("restartGame").classList.add("hidden");

    createBoard();
}

// card creation
function createBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    const cardValues = [];
    for (let i = 1; i <= totalPairs; i++) {
        cardValues.push(i);
        cardValues.push(i);
    }

    shuffleArray(cardValues);

    cardValues.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add(
            "card", "w-16", "h-20", "flex", "items-center", "justify-center",
            "bg-border", "text-xl", "font-bold", "rounded-lg",
            "cursor-pointer", "select-none"
        );

        card.dataset.value = value;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip CCard logic
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Cek apakah kartu cocok
function checkForMatch() {
    attempts++;
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;

    // Cek jumlah percobaan
    overMaxAttempts();
    if (attempts >= maxAttempts) return;

    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
        firstCard.classList.add("matched", "bg-primary", "text-white");
        secondCard.classList.add("matched", "bg-primary", "text-white");
        matchesFound++;
        resetTurn();

        if (matchesFound === totalPairs) {
            document.getElementById("result").textContent = "🎉 Congratulations! You've found all pairs!";
            endGame();
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";

            resetTurn();
        }, 1000);
    }
}

// Funsi untuk cek apakah sudah mencapai max attempts
function overMaxAttempts() {
    if (attempts >= maxAttempts) {
        document.getElementById("result").textContent = "❌ Game over! You've exceeded the maximum attempts.";
        lockBoard = true;
        endGame();
    }
}


function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function endGame() {
    document.getElementById("restartGame").classList.remove("hidden");
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.removeEventListener("click", flipCard));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("restartGame").addEventListener("click", startGame);
    startGame();
});