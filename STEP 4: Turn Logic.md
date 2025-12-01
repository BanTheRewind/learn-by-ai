# STEP 4: Turn Logic

## What This Step Does
Makes the game functional! When you click a tile, it shows the current player's symbol and switches to the next player. The game tracks whose turn it is and whether a player is human or computer-controlled.

## What I'm Building
- Place player symbols (X, O, ❤️, ⭐) when tiles are clicked
- Switch turns after each move
- Distinguish between human and computer players
- Prevent clicking on already-filled tiles

## Why This Matters
This is where your game comes to life! You'll learn:
- How to modify both data (the board array) and the display (the tiles)
- How to calculate which player is human vs. computer
- The concept of "game loop" - the cycle of taking turns

## Technical Concepts Introduced
- **Modulo operator (%)**: Gets the remainder of division (used for cycling through players)
- **Conditional logic**: Making decisions in code (if/else)
- **DOM manipulation**: Changing what's displayed on the page
- **State synchronization**: Keeping data and display in sync

## How to Do This Yourself

### Step-by-step Instructions:

1. **Update game.js**
   - Find the `handleTileClick` function and replace it with this:

```javascript
// Handle when a tile is clicked
function handleTileClick(index) {
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
    tiles[index].textContent = playerSymbols[currentPlayer];
    tiles[index].classList.add('filled');
    
    console.log('Player ' + (currentPlayer + 1) + ' placed ' + playerSymbols[currentPlayer] + ' at position ' + index);
    
    // Move to next player
    nextTurn();
}

// Move to the next player's turn
function nextTurn() {
    // Cycle through players 0 -> 1 -> 2 -> 3 -> 0 -> ...
    currentPlayer = (currentPlayer + 1) % 4;
    updateTurnDisplay();
    
    console.log('Now it\'s Player ' + (currentPlayer + 1) + '\'s turn');
}
```

2. **Test it**
   - Refresh `index.html` in your browser
   - Start a game with 2 human players
   - Click on different tiles - you should see:
     - Player 1 places an X
     - It becomes Player 2's turn (shows O)
     - Player 2 places an O
     - It becomes Player 3's turn, but clicking does nothing (computer player)
     - The pattern continues through all 4 players
   - Try starting a game with 4 human players - all players should be able to click

### Understanding the Code:

**The Modulo Operator (%):**
```javascript
currentPlayer = (currentPlayer + 1) % 4;
```
This cycles through 0, 1, 2, 3, then back to 0:
- Start: currentPlayer = 0
- After move: (0 + 1) % 4 = 1
- After move: (1 + 1) % 4 = 2
- After move: (2 + 1) % 4 = 3
- After move: (3 + 1) % 4 = 0 ← Back to start!

**Checking if player is human:**
```javascript
if (currentPlayer >= humanPlayers) {
    return; // Computer player, don't allow human click
}
```
Example with 2 human players:
- Player 0 (< 2) ✓ human
- Player 1 (< 2) ✓ human  
- Player 2 (>= 2) ✗ computer
- Player 3 (>= 2) ✗ computer

**querySelectorAll:**
```javascript
const tiles = document.querySelectorAll('.tile');
```
Gets ALL elements with class "tile" and returns them as a list. We can then access specific tiles by index: `tiles[0]`, `tiles[1]`, etc.

**classList.add:**
```javascript
tiles[index].classList.add('filled');
```
Adds the "filled" class to the tile, which changes its appearance (remember the CSS for `.tile.filled`).

## Success Criteria
✅ Clicking a tile places the current player's symbol
✅ Turn indicator updates to show the next player
✅ Can't click on already-filled tiles
✅ Only human players can click tiles (computer players are skipped for now)
✅ Players cycle correctly (1→2→3→4→1...)
✅ Console shows clear messages about what's happening

## Common Issues & Fixes:

**Problem**: All players can click, even computer players
- **Fix**: Check that you're testing with fewer than 4 human players

**Problem**: Symbols don't appear when clicking
- **Fix**: Make sure you copied the entire `makeMove` function

**Problem**: Turn indicator doesn't update
- **Fix**: Verify the `nextTurn` function calls `updateTurnDisplay()`

## Next Step
In Step 5, we'll add the win detection algorithm so the game knows when someone gets three in a row!
