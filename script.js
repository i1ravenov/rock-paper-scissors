const CHOICES = ["rock", "paper", "scissors"];
const WIN_SCORE = 5;

let playerScore = 0;
let computerScore = 0;

function randomInt(n) {
  return Math.floor(Math.random() * n);
}

function getComputerChoice() {
  return CHOICES[randomInt(CHOICES.length)];
}

function playRound(playerMove, computerMove = getComputerChoice()) {
  if (playerMove === "rock" && computerMove === "paper"
    || playerMove === "scissors" && computerMove === "rock"
    || playerMove === "paper" && computerMove == "scissors") {
    return `You lost, ${computerMove} beats ${playerMove}.`;
  } else if (playerMove === computerMove) {
    return `Draw for a round, ${playerMove} and ${computerMove}.`;
  }
  return `You won, ${playerMove} beats ${computerMove}.`;
}

const buttons = document.querySelectorAll(".move");
const resDiv = document.querySelector(".round-results");
const playerPara = document.querySelector(".player-score");


function displayScore(pScore, cScore) {
  const playerScore = document.querySelector("#pscore");
  playerScore.innerText = pScore;
  const computerScore = document.querySelector("#cscore");
  computerScore.innerText = cScore;
  if (pScore === WIN_SCORE) {
    clear();
    return " You won in a game series";
  }
  if (cScore === WIN_SCORE) {
    clear();
    return " You lost in a game series!"; 
  }
}

buttons.forEach(b => {
  b.addEventListener('click', (e) => {
    let res = playRound(e.target.dataset.move);
    if (res.includes("won")) {
      playerScore++;
    }
    if (res.includes("lost")) {
      computerScore++;
    }
    const gameResult = displayScore(playerScore, computerScore);
    if (gameResult) {
      res += "<p style='font-weight: bold'>" + gameResult + "</p>";
    }
    const para = document.querySelector('.round-text-res');
    para.innerHTML = res;
    })
});

const resetButton = document.querySelector(".reset-btn");

function clear() {
  resetButton.classList.add("hide");
  const para = document.querySelector('.round-text-res');
  para.textContent = "";
  playerScore = 0;
  computerScore = 0;
  displayScore(playerScore, computerScore);
}

resetButton.addEventListener('click', (e) => {
  clear();
});

const config = { attributes: true, childList: true, subtree: true };

const callback = (mutation, observer) => {
  if (mutation[0].addedNodes.length >= 1) {
    resetButton.classList.remove("hide");
  }
};

const observer = new MutationObserver(callback);
observer.observe(resDiv, config);
