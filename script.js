const CHOICES = ["rock", "paper", "scissors"];
const WIN_SCORE = 5;

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
    return `You lose, ${computerMove} beats ${playerMove}`;
  } else if (playerMove === computerMove) {
    return `Draw for a round, ${playerMove} and ${computerMove}`;
  }
  return `You won, ${playerMove} beats ${computerMove}`;
}

const buttons = document.querySelectorAll(".move");
const resDiv = document.querySelector(".round-results");
let playerScore = 0;
let computerScore = 0;
buttons.forEach(b => {
  b.addEventListener('click', (e) => {
    const res = playRound(e.target.dataset.move);
    if (res.includes("won")) {
      playerScore++;
    }
    if (res.includes("lose")) {
      computerScore++;
    }
    const para = document.createElement('p');
    para.innerText = res;
    document.body.appendChild(para);
    resDiv.appendChild(para);
  })
});

const resetButton = document.querySelector(".reset-btn");

resetButton.addEventListener('click', (e) => {
  resetButton.classList.add("hide");
  resDiv.textContent = "";
});

const config = { attributes: true, childList: true, subtree: true };
let mttn;
const callback = (mutation, observer) => {
  mttn = mutation;
  console.log(mutation);
  if (mutation[0].addedNodes.length >= 1) {
    resetButton.classList.remove("hide");
  }
};

const observer = new MutationObserver(callback);
observer.observe(resDiv, config);
