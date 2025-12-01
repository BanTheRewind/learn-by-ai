# STEP 5: Win Detection

## What This Step Does
Adds the logic to detect when a player gets three in a row (horizontally, vertically, or diagonally). When someone wins, the game announces the winner and stops accepting moves.

## What I'm Building
- Win detection algorithm that checks all possible 3-in-a-row patterns
- Game-over state when someone wins
- Winner announcement
- Check for tie games (board full with no winner)

## Why This Matters
This is complex problem-solving! You'll learn:
- How to think through all possible winning combinations
- Pattern recognition in code
- Using nested loops
- Game state management

## Technical Concepts Introduced
- **Nested loops**: Loops inside loops (for checking patterns)
- **Boolean logic**: true/false values and conditions
- **Early return**: Stopping a function as soon as we find what we need
- **Game state**: Tracking whether the game is still active

## How to Do This Yourself

### Step-by-step Instructions:

1. **Add game state variable**
   - At the top of `game.js`, add a new variable after the others:

```javascript
let humanPlayers = 0;
let board = Array(25).fill(null);
let currentPlayer = 0;
let gameActive = true; // Add this new line
```

2. **Update makeMove function**
   - Find the `makeMove` function and add win checking after placing the piece:

```javascript
// Make a move on the board
function makeMove(index) {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    
    // Update the board data
    board[index] = currentPlayer;
    
    // Update the visual tile
    const tiles = document.querySelectorAll('.tile');
    tiles[index].textContent = playerSymbols[currentPlayer];
    tiles[index].classList.add('filled');
    
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
```

3. **Update handleTileClick function**
   - Add a check at the start to prevent moves when game is over:

```javascript
// Handle when a tile is clicked
function handleTileClick(index) {
    // Check if game is still active
    if (!gameActive) {
        return;
    }
    
    console.log('Tile ' + index + ' clicked by Player ' + (currentPlayer + 1));
    
    // ... rest of the function stays the same
```

4. **Add win detection functions**
   - Add these new functions at the end of `game.js`:

```javascript
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
    const h2 = document.querySelector('#game h2');
    h2.textContent = '🎉 Player ' + (currentPlayer + 1) + ' (' + playerSymbols[currentPlayer] + ') WINS! 🎉';
    h2.style.color = '#ff0';
    h2.style.textShadow = '0 0 20px #ff0';
    console.log('Player ' + (currentPlayer + 1) + ' wins!');
}

// Announce a tie
function announceTie() {
    const h2 = document.querySelector('#game h2');
    h2.textContent = '😞 It\'s a TIE! Nobody wins! 😞';
    h2.style.color = '#f00';
    h2.style.textShadow = '0 0 20px #f00';
    console.log('Game ended in a tie');
}
```

5. **Test it**
   - Refresh your browser
   - Start a game with 4 human players
   - Try to get 3 in a row:
     - Horizontally: Click 3 tiles in the same row
     - Vertically: Click 3 tiles in the same column
     - Diagonally: Click 3 tiles diagonally
   - When someone wins, you should see a yellow victory message
   - Try filling the entire board without getting 3 in a row - you should see a red tie message

### Understanding the Code:

**Win Patterns Array:**
```javascript
const winPatterns = [
    [0,1,2], [1,2,3], ...
];
```
Each sub-array represents 3 tiles that form a winning line. For example, `[0,1,2]` is the top-left horizontal line.

**How the board positions map to the grid:**
```
 0  1  2  3  4
 5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24
```

Examples:
- `[0,1,2]` = Top row, first 3 tiles
- `[0,5,10]` = Left column, first 3 tiles
- `[0,6,12]` = Diagonal from top-left

**For...of loop:**
```javascript
for (let pattern of winPatterns) {
    // Check this pattern
}
```
This loops through each pattern in the array. Modern JavaScript way of iterating.

**Array destructuring:**
```javascript
const [a, b, c] = pattern;
```
Takes the 3 numbers from the pattern and assigns them to variables a, b, c.
Example: If pattern is `[0,1,2]`, then a=0, b=1, c=2.

**Checking the pattern:**
```javascript
if (board[a] !== null && 
    board[a] === board[b] && 
    board[a] === board[c])
```
Checks if:
1. Position `a` is filled (not null)
2. Position `a` equals position `b` (same player)
3. Position `a` equals position `c` (same player)

If all true, that player has 3 in a row!

**every() method:**
```javascript
board.every(cell => cell !== null)
```
Returns true if EVERY cell in the board is not null (i.e., all filled).

## Success Criteria
✅ Getting 3 in a row (horizontal, vertical, or diagonal) triggers a win
✅ Winner message appears in yellow
✅ Game stops accepting moves after win
✅ Filling all tiles without 3-in-a-row shows tie message in red
✅ Console logs confirm win detection

## Testing Checklist:

Test these winning patterns to verify everything works:
- ✅ Horizontal: Tiles 0, 1, 2
- ✅ Vertical: Tiles 0, 5, 10
- ✅ Diagonal: Tiles 0, 6, 12
- ✅ Middle row: Tiles 11, 12, 13
- ✅ Tie game: Fill all 25 tiles without getting 3 in a row

## Next Step
In Step 6, we'll add basic AI so computer players can make random moves automatically!
