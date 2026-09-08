let deck = [];
let playerHand = [];
let dealerHand = [];
let gameInProgress = false;

function createDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(card, hidden = false) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    if (hidden) {
        cardElement.textContent = '?';
        cardElement.style.background = '#2c3e50';
        cardElement.style.color = 'white';
    } else {
        cardElement.textContent = card.value + card.suit;
        if (card.suit === '♥' || card.suit === '♦') {
            cardElement.classList.add('red');
        }
    }
    return cardElement;
}

function startGame() {
    if (gameInProgress) return;
    
    // Reset everything
    createDeck();
    playerHand = [];
    dealerHand = [];
    gameInProgress = true;
    document.getElementById('hitBtn').disabled = false;
    document.getElementById('standBtn').disabled = false;
    document.getElementById('result').textContent = 'Oyun başladı!';
    
    // Deal initial cards
    playerHand.push(deck.pop(), deck.pop());
    dealerHand.push(deck.pop(), deck.pop());
    
    updateDisplay();
}

function hit() {
    if (!gameInProgress) return;
    
    playerHand.push(deck.pop());
    updateDisplay();
    
    if (getHandValue(playerHand) > 21) {
        endGame('Kaybettiniz! 21\'i geçtiniz!');
    }
}

function stand() {
    if (!gameInProgress) return;
    
    // Dealer must hit on 16 and below
    while (getHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    
    const playerValue = getHandValue(playerHand);
    const dealerValue = getHandValue(dealerHand);
    
    let result;
    if (dealerValue > 21) {
        result = 'Kazandınız! Dağıtıcı 21\'i geçti!';
    } else if (playerValue > dealerValue) {
        result = 'Kazandınız!';
    } else if (playerValue < dealerValue) {
        result = 'Kaybettiniz!';
    } else {
        result = 'Berabere!';
    }
    
    endGame(result);
}

function getHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            value += 11; // As'ı önce 11 olarak ekle
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    
    // Toplam 21'i geçerse, her As için 10 çıkar (yani 1 olarak say)
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    
    return value;
}

function updateDisplay() {
    const dealerContainer = document.getElementById('dealerHand');
    const playerContainer = document.getElementById('playerHand');
    const dealerTotal = document.getElementById('dealerTotal');
    const playerTotal = document.getElementById('playerTotal');
    
    // Clear containers
    dealerContainer.innerHTML = '';
    playerContainer.innerHTML = '';
    
    // Show dealer's cards (first card hidden during game)
    if (gameInProgress) {
        dealerContainer.appendChild(createCardElement(dealerHand[0]));
        dealerContainer.appendChild(createCardElement(null, true));
        dealerTotal.textContent = 'Toplam: ?';
    } else {
        dealerHand.forEach(card => {
            dealerContainer.appendChild(createCardElement(card));
        });
        dealerTotal.textContent = `Toplam: ${getHandValue(dealerHand)}`;
    }
    
    // Show player's cards
    playerHand.forEach(card => {
        playerContainer.appendChild(createCardElement(card));
    });
    playerTotal.textContent = `Toplam: ${getHandValue(playerHand)}`;
}

function endGame(message) {
    gameInProgress = false;
    document.getElementById('hitBtn').disabled = true;
    document.getElementById('standBtn').disabled = true;
    document.getElementById('result').textContent = `${message} (Siz: ${getHandValue(playerHand)} - Dağıtıcı: ${getHandValue(dealerHand)})`;
    updateDisplay();
}

// Event listeners
document.getElementById('dealBtn').addEventListener('click', startGame);
document.getElementById('hitBtn').addEventListener('click', hit);
document.getElementById('standBtn').addEventListener('click', stand); 