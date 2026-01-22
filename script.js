const winningScore = 3;
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choices button");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice () {
    const randomIndex = Math.floor(Math.random() *choices.length);
    return choices[randomIndex];
}

function playRound (playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        resultMessage.textContent = `It's a tie: you threw ${playerChoice} & computer threw ${computerChoice}`
    } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice ==="rock") ||
            (playerChoice === "scissors" && computerChoice === "paper") 
    ) {
        playerScore ++;
        resultMessage.textContent = `You win!: ${playerChoice} beats ${computerChoice}`
    } else {
        computerScore ++;
        resultMessage.textContent = `You lose: ${computerChoice} beats ${playerChoice}`
    }
    
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    checkGameOver ();         
}

buttons.forEach (button => {
    button.addEventListener("click",() => {
        if (playerScore === winningScore || computerScore === winningScore) return;
        
        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();
        playRound(playerChoice, computerChoice);
    });
});
function checkGameOver () {
    if (playerScore === winningScore) {
        resultMessage.textContent = `You win 🎉 the best of three`
        restartButton.hidden = false;
    } else if (computerScore === winningScore) {
        resultMessage.textContent = `You lose... the best of three:`
        restartButton.hidden = false;
    }
}
restartButton.addEventListener("click", () =>{
    playerScore = 0;
    computerScore = 0;

    playerScoreSpan.textContent = 0;
    computerScoreSpan.textContent = 0;
    resultMessage.textContent = "New Game: Make your move!";
    restartButton.hidden = true;
});