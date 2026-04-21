let playerName = "";
let playerScore = 0;
let computerScore = 0;

const startBtn = document.getElementById("startBtn");
const gameDiv = document.getElementById("game");
const startDiv = document.getElementById("start");

const welcomeText = document.getElementById("welcome");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");

const buttons = document.querySelectorAll("button[data-choice]");

startBtn.addEventListener("click", () => {
    playerName = document.getElementById("playerName").value;

    if (playerName === "") return;

    startDiv.classList.add("hidden");
    gameDiv.classList.remove("hidden");

    welcomeText.textContent = "Spelare: " + playerName;
    updateScore();
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        playRound(btn.dataset.choice);
    });
});

function playRound(playerChoice) {
    const choices = ["sten", "sax", "påse"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "Oavgjort!";
    } else if (
        (playerChoice === "sten" && computerChoice === "sax") ||
        (playerChoice === "sax" && computerChoice === "påse") ||
        (playerChoice === "påse" && computerChoice === "sten")
    ) {
        result = playerName + " vinner rundan!";
        playerScore++;
    } else {
        result = "Datorn vinner rundan!";
        computerScore++;
    }

    resultText.textContent =
        "Du valde " + playerChoice +
        ", datorn valde " + computerChoice +
        ". " + result;

    updateScore();
    checkWinner();
}

function updateScore() {
    scoreText.textContent = playerName + ": " + playerScore + " | Dator: " + computerScore;
}

function checkWinner() {
    if (playerScore === 3 || computerScore === 3) {
        if (playerScore === 3) {
            resultText.textContent = playerName + " vann spelet!";
        } else {
            resultText.textContent = "Datorn vann spelet!";
        }

        setTimeout(resetGame, 3000);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
}