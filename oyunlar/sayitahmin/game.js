let targetNumber;
let attempts;
let bestScore = localStorage.getItem('bestScore') || '-';
let gameHistory = [];

const guessInput = document.getElementById('guess');
const guessBtn = document.getElementById('guessBtn');
const resultDisplay = document.getElementById('result');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('bestScore');
const historyContainer = document.getElementById('guessHistory');

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameHistory = [];
    attemptsDisplay.textContent = attempts;
    bestScoreDisplay.textContent = bestScore;
    resultDisplay.textContent = '';
    historyContainer.innerHTML = '';
    guessInput.value = '';
    guessInput.focus();
}

function updateBestScore() {
    if (bestScore === '-' || attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
    }
}

function addToHistory(guess, message) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const guessSpan = document.createElement('span');
    guessSpan.className = 'history-guess';
    guessSpan.textContent = `${guess}`;
    
    const resultSpan = document.createElement('span');
    resultSpan.className = 'history-result';
    resultSpan.textContent = message;
    
    historyItem.appendChild(guessSpan);
    historyItem.appendChild(resultSpan);
    
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
}

function makeGuess() {
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultDisplay.textContent = 'Lütfen 1-100 arası bir sayı girin!';
        resultDisplay.style.color = '#ff4444';
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    let message;
    if (guess === targetNumber) {
        message = `Tebrikler! ${attempts} denemede bildiniz!`;
        resultDisplay.style.color = '#4CAF50';
        updateBestScore();
        guessBtn.textContent = 'Yeni Oyun';
        guessBtn.removeEventListener('click', makeGuess);
        guessBtn.addEventListener('click', () => {
            guessBtn.textContent = 'Tahmin Et';
            guessBtn.removeEventListener('click', arguments.callee);
            guessBtn.addEventListener('click', makeGuess);
            initGame();
        });
    } else if (guess < targetNumber) {
        message = 'Daha yüksek bir sayı deneyin!';
        resultDisplay.style.color = '#ff9800';
    } else {
        message = 'Daha düşük bir sayı deneyin!';
        resultDisplay.style.color = '#ff9800';
    }
    
    resultDisplay.textContent = message;
    addToHistory(guess, message);
    guessInput.value = '';
    guessInput.focus();
}

guessBtn.addEventListener('click', makeGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

// Initialize game
initGame(); 