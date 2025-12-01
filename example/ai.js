// AI player logic

// Make AI move after a delay
function makeAIMove() {
    console.log('AI (Player ' + (currentPlayer + 1) + ') is thinking...');
    
    // Wait 500ms before moving (feels more natural)
    setTimeout(() => {
        const move = getSmartMove();
        if (move !== null) {
            makeMove(move);
        }
    }, 500);
}

// Get a random empty tile
function getRandomMove() {
    // Find all empty tiles
    const emptyTiles = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            emptyTiles.push(i);
        }
    }
    
    // If no empty tiles, return null
    if (emptyTiles.length === 0) {
        return null;
    }
    
    // Pick a random empty tile
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    return emptyTiles[randomIndex];
}

// Get the best possible move (strategic AI)
function getSmartMove() {
    // Priority 1: Block any opponent from winning
    const blockMove = findBlockingMove();
    if (blockMove !== null) {
        console.log('AI blocking at position ' + blockMove);
        soundBlock();
        return blockMove;
    }
    
    // Priority 2: Try to win
    const winMove = findWinningMove(currentPlayer);
    if (winMove !== null) {
        console.log('AI going for win at position ' + winMove);
        return winMove;
    }
    
    // Priority 3: Make a random move
    console.log('AI making random move');
    return getRandomMove();
}

// Find a move that blocks an opponent from winning
function findBlockingMove() {
    // Check each opponent
    for (let player = 0; player < 4; player++) {
        if (player !== currentPlayer) {
            const blockMove = findWinningMove(player);
            if (blockMove !== null) {
                return blockMove; // Block this player!
            }
        }
    }
    return null;
}

// Find a move that would win for the specified player
function findWinningMove(player) {
    // All possible win patterns (same as in checkWin)
    const winPatterns = [
        // Horizontal rows
        [0,1,2], [1,2,3], [2,3,4],
        [5,6,7], [6,7,8], [7,8,9],
        [10,11,12], [11,12,13], [12,13,14],
        [15,16,17], [16,17,18], [17,18,19],
        [20,21,22], [21,22,23], [22,23,24],
        // Vertical columns
        [0,5,10], [5,10,15], [10,15,20],
        [1,6,11], [6,11,16], [11,16,21],
        [2,7,12], [7,12,17], [12,17,22],
        [3,8,13], [8,13,18], [13,18,23],
        [4,9,14], [9,14,19], [14,19,24],
        // Diagonals
        [0,6,12], [1,7,13], [2,8,14],
        [5,11,17], [6,12,18], [7,13,19],
        [10,16,22], [11,17,23], [12,18,24],
        [2,6,10], [3,7,11], [4,8,12],
        [7,11,15], [8,12,16], [9,13,17],
        [12,16,20], [13,17,21], [14,18,22]
    ];
    
    // Check each pattern
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const values = [board[a], board[b], board[c]];
        
        // Count how many tiles the player has in this pattern
        let playerCount = 0;
        let emptyCount = 0;
        let emptyPosition = null;
        
        for (let i = 0; i < 3; i++) {
            if (values[i] === player) {
                playerCount++;
            } else if (values[i] === null) {
                emptyCount++;
                emptyPosition = pattern[i];
            }
        }
        
        // If player has 2 and there's 1 empty, that empty spot wins/blocks!
        if (playerCount === 2 && emptyCount === 1) {
            return emptyPosition;
        }
    }
    
    return null;
}
