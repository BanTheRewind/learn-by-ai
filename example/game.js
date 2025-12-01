/**
 * Four Player Tic-Tac-Toe Game
 * A 5x5 grid game where 4 players compete to get 3 in a row
 * Supports 1-4 human players, with AI controlling the rest
 */

// ===== GAME STATE =====
// These variables track the current state of the game

let humanPlayers = 0;              // How many human players (1-4)
let board = Array(25).fill(null);  // The 5x5 board (25 cells, all empty)
let currentPlayer = 0;             // Current player (0-3)
let gameActive = true;             // Is the game still going?

// ===== GAME SETUP =====

// Start the game with selected number of human players
function startGame(numHumans) {
    humanPlayers = numHumans;
    
    // Hide menu, show game
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    // Create the board
    createBoard();
    
    // Randomly choose who goes first
    currentPlayer = Math.floor(Math.random() * 4);
    updateTurnDisplay();
    
    console.log('=== GAME STARTED ===');
    console.log('Human players: ' + humanPlayers);
    console.log('AI players: ' + (4 - humanPlayers));
    console.log('Player ' + (currentPlayer + 1) + ' goes first');
    console.log('Players: 1=X, 2=O, 3=❤️, 4=⭐');
    console.log('==================');
    
    // If first player is AI, make their move
    if (currentPlayer >= humanPlayers) {
        makeAIMove();
    }
}

// Create the 5x5 board
function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear any existing content
    
    // Create 25 tiles (5x5 grid)
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.index = i; // Store the tile's position
        tile.onclick = () => handleTileClick(i);
        boardElement.appendChild(tile);
    }
}

// Handle when a tile is clicked
function handleTileClick(index) {
    // Check if game is still active
    if (!gameActive) {
        return;
    }
    
    console.log('Tile ' + index + ' clicked by Player ' + (currentPlayer + 1));
    
    // Check if tile is already filled
    if (board[index] !== null) {
        console.log('Tile already filled!');
        return;
    }
    
    // Check if current player is human
    if (currentPlayer >= humanPlayers) {
        console.log('Not your turn! Computer is playing.');
        return;
    }
    
    // Make the move
    makeMove(index);
}

// Make a move on the board
function makeMove(index) {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    
    // Update the board data
    board[index] = currentPlayer;
    
    // Update the visual tile
    const tiles = document.querySelectorAll('.tile');
    const tile = tiles[index];
    tile.textContent = playerSymbols[currentPlayer];
    tile.classList.add('filled');
    tile.classList.add('player-' + currentPlayer);
    
    // Play sound
    soundPlace();
    
    // Trigger pulse animation
    tile.classList.add('pulse');
    setTimeout(() => {
        tile.classList.remove('pulse');
    }, 400);
    
    console.log('Player ' + (currentPlayer + 1) + ' placed ' + playerSymbols[currentPlayer] + ' at position ' + index);
    
    // Check for winner
    if (checkWin()) {
        gameActive = false;
        announceWinner();
        return;
    }
    
    // Check for tie
    if (checkTie()) {
        gameActive = false;
        announceTie();
        return;
    }
    
    // Move to next player
    nextTurn();
}

// Move to the next player's turn
function nextTurn() {
    // Cycle through players 0 -> 1 -> 2 -> 3 -> 0 -> ...
    currentPlayer = (currentPlayer + 1) % 4;
    updateTurnDisplay();
    
    console.log('Now it\'s Player ' + (currentPlayer + 1) + '\'s turn');
    
    // If current player is computer, make AI move
    if (currentPlayer >= humanPlayers && gameActive) {
        makeAIMove();
    }
}

// Update the turn display
function updateTurnDisplay() {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    const h2 = document.querySelector('#game h2');
    h2.textContent = 'Player ' + (currentPlayer + 1) + ' (' + playerSymbols[currentPlayer] + ')';
}

// Check if current player has won
function checkWin() {
    // All possible ways to get 3 in a row on a 5x5 board
    const winPatterns = [
        // Horizontal rows (5 rows, 3 starting positions each)
        [0,1,2], [1,2,3], [2,3,4],
        [5,6,7], [6,7,8], [7,8,9],
        [10,11,12], [11,12,13], [12,13,14],
        [15,16,17], [16,17,18], [17,18,19],
        [20,21,22], [21,22,23], [22,23,24],
        
        // Vertical columns (5 columns, 3 starting positions each)
        [0,5,10], [5,10,15], [10,15,20],
        [1,6,11], [6,11,16], [11,16,21],
        [2,7,12], [7,12,17], [12,17,22],
        [3,8,13], [8,13,18], [13,18,23],
        [4,9,14], [9,14,19], [14,19,24],
        
        // Diagonal top-left to bottom-right
        [0,6,12], [1,7,13], [2,8,14],
        [5,11,17], [6,12,18], [7,13,19],
        [10,16,22], [11,17,23], [12,18,24],
        
        // Diagonal top-right to bottom-left
        [2,6,10], [3,7,11], [4,8,12],
        [7,11,15], [8,12,16], [9,13,17],
        [12,16,20], [13,17,21], [14,18,22]
    ];
    
    // Check each pattern
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== null && 
            board[a] === board[b] && 
            board[a] === board[c]) {
            console.log('Win found! Pattern: ' + pattern);
            return true;
        }
    }
    
    return false;
}

// Check if the game is a tie
function checkTie() {
    // If every cell is filled (not null), it's a tie
    return board.every(cell => cell !== null);
}

// Announce the winner
function announceWinner() {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    
    // Play win sound
    soundWin();
    
    // Highlight winning tiles
    highlightWinningTiles();
    
    // Show overlay with celebration
    setTimeout(() => {
        const overlay = document.getElementById('overlay');
        const message = document.getElementById('overlay-message');
        const container = document.getElementById('celebration-container');
        
        message.textContent = '🎉 Player ' + (currentPlayer + 1) + ' (' + playerSymbols[currentPlayer] + ') WINS! 🎉';
        
        // Add spinning stars
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = '⭐';
            container.appendChild(star);
        }
        
        overlay.style.display = 'flex';
    }, 800);
    
    console.log('Player ' + (currentPlayer + 1) + ' wins!');
}

// Announce a tie
function announceTie() {
    // Play tie sound
    soundTie();
    
    setTimeout(() => {
        const overlay = document.getElementById('overlay');
        const message = document.getElementById('overlay-message');
        const container = document.getElementById('celebration-container');
        
        message.textContent = '😞 It\'s a TIE! 😞';
        message.style.color = '#f00';
        message.style.textShadow = '0 0 30px #f00';
        
        // Add falling sad faces
        container.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const falling = document.createElement('div');
            falling.className = 'falling';
            falling.textContent = '💔';
            container.appendChild(falling);
        }
        
        overlay.style.display = 'flex';
    }, 500);
    
    console.log('Game ended in a tie');
}

// Highlight the winning tiles
function highlightWinningTiles() {
    const winPatterns = [
        [0,1,2], [1,2,3], [2,3,4],
        [5,6,7], [6,7,8], [7,8,9],
        [10,11,12], [11,12,13], [12,13,14],
        [15,16,17], [16,17,18], [17,18,19],
        [20,21,22], [21,22,23], [22,23,24],
        [0,5,10], [5,10,15], [10,15,20],
        [1,6,11], [6,11,16], [11,16,21],
        [2,7,12], [7,12,17], [12,17,22],
        [3,8,13], [8,13,18], [13,18,23],
        [4,9,14], [9,14,19], [14,19,24],
        [0,6,12], [1,7,13], [2,8,14],
        [5,11,17], [6,12,18], [7,13,19],
        [10,16,22], [11,17,23], [12,18,24],
        [2,6,10], [3,7,11], [4,8,12],
        [7,11,15], [8,12,16], [9,13,17],
        [12,16,20], [13,17,21], [14,18,22]
    ];
    
    const tiles = document.querySelectorAll('.tile');
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== null && 
            board[a] === board[b] && 
            board[a] === board[c]) {
            tiles[a].classList.add('winning-tile');
            tiles[b].classList.add('winning-tile');
            tiles[c].classList.add('winning-tile');
            return;
        }
    }
}

// Restart the game
function restartGame() {
    // Reset game state
    board = Array(25).fill(null);
    gameActive = true;
    
    // Hide overlay
    document.getElementById('overlay').style.display = 'none';
    
    // Show menu
    document.getElementById('game').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    
    console.log('Game restarted');
}
