let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭'];
const gameGrid = document.getElementById('memoryGrid');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const resultDisplay = document.getElementById('result');

function initializeGame() {
    // Reset game state
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    // Reset displays
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matchedPairs;
    resultDisplay.textContent = '';
    
    // Create card pairs
    const cardPairs = [...emojis, ...emojis];
    shuffleArray(cardPairs);
    
    // Clear and rebuild grid
    gameGrid.innerHTML = '';
    cardPairs.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cards.push(card);
        gameGrid.appendChild(card);
    });
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.dataset.value = emoji;
    card.textContent = '?';
    
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        canFlip = false;
        
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;
    
    if (match) {
        matchedPairs++;
        matchesDisplay.textContent = matchedPairs;
        
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                resultDisplay.textContent = `Tebrikler! ${moves} hamlede tamamladınız!`;
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    
    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event Listeners
document.getElementById('newGame').addEventListener('click', initializeGame);

// Start game
initializeGame(); 