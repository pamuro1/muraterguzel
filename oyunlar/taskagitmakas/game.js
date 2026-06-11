let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getChoiceName(choice) {
    const names = {
        'rock': 'Taş',
        'paper': 'Kağıt',
        'scissors': 'Makas'
    };
    return names[choice];
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('result').textContent = 'Skorlar sıfırlandı! Yeni bir seçim yapın.';
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    let result = '';

    if (playerSelection === computerSelection) {
        result = 'Berabere!';
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore++;
        result = `Kazandınız! ${getChoiceName(playerSelection)} ${getChoiceName(computerSelection)}'ı yener`;
    } else {
        computerScore++;
        result = `Kaybettiniz! ${getChoiceName(computerSelection)} ${getChoiceName(playerSelection)}'ı yener`;
    }

    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').textContent = result;
}

document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors')); 