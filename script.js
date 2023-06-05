const CHOICES = ["rock", "paper", "scissors"];
const ROUNDS_NUMBER = 5;

function randomInt(n) {
  return Math.floor(Math.random() * n);
}

function getComputerChoice() {
  return CHOICES[randomInt(CHOICES.length)];
}

function getPlayerMove() {
  let playerMove = prompt("Enter your choice: ");
  if (playerMove) {
    playerMove = playerMove.toLowerCase();
  }
  while (!playerMove || !CHOICES.includes(playerMove)) {
    playerMove = prompt("Wrong input! Choose among \"rock\", \"paper\" and \"scissors\":");
    playerMove = playerMove.toLowerCase();
  }
  return playerMove;
}

function playRound(playerMove, computerMove = getComputerChoice()) {
  if (playerMove === "rock" && computerMove === "paper"
    || playerMove === "scissors" && computerMove === "rock"
    || playerMove === "paper" && computerMove == "scissors") {
    return `You Lose! ${computerMove} beats ${playerMove}`;
  } else if (playerMove === computerMove) {
    return `Draw for a round ${playerMove} and ${computerMove}`; 
  }
  return `You Won! ${playerMove} beats ${computerMove}`;
}

function game() {
  let playerScore = 0;
  for (let i = 0; i < ROUNDS_NUMBER; i++) {
    let playerMove = getPlayerMove();
    let playResult = playRound(playerMove);
    console.log(playResult);
    if (playResult.includes("Won!")) {
      playerScore++;
    }
  }
  if (playerScore > ROUNDS_NUMBER / 2) {
    console.log(`You won the series of rounds with
    score ${playerScore} out of ${ROUNDS_NUMBER}`);
  }
}