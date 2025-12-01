# STEP 6: AI Basic

## What This Step Does
Makes computer-controlled players automatically make random moves. When it's a computer player's turn, they'll pick a random empty tile after a short delay.

## What I'm Building
- AI function that finds all empty tiles
- Random selection from available moves
- Automatic turn-taking for computer players
- Delay to make it feel more natural (not instant)

## Why This Matters
This introduces artificial intelligence (AI) concepts! You'll learn:
- How to make the computer "think" and make decisions
- Using timers and delays in JavaScript
- Filtering arrays to find specific items
- Making your game playable solo

## Technical Concepts Introduced
- **setTimeout**: Delays code execution (makes AI wait before moving)
- **filter() method**: Creates a new array with only items that match a condition
- **map() method**: Transforms each item in an array
- **Random selection**: Picking a random item from a list
- **Asynchronous code**: Code that doesn't run immediately

## How to Do This Yourself

### Step-by-step Instructions:

1. **Create ai.js file**
   - Create a new file called `ai.js` in the same folder as `game.js`
   - Add this code:

```javascript
// AI player logic

// Make AI move after a delay
function makeAIMove() {
    console.log('AI (Player ' + (currentPlayer + 1) + ') is thinking...');
    
    // Wait 500ms before moving (feels more natural)
    setTimeout(() => {
        const move = getRandomMove();
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
```

2. **Link ai.js to HTML**
   - Open `index.html`
   - Add the AI script AFTER the game.js script:

```html
    <script src="game.js"></script>
    <script src="ai.js"></script>
</body>
```

3. **Update nextTurn function in game.js**
   - Find the `nextTurn` function and modify it to trigger AI moves:

```javascript
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
```

4. **Update startGame function in game.js**
   - Add AI move check at the end of `startGame`:

```javascript
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
    
    console.log('Game started with ' + humanPlayers + ' human players');
    console.log('Player ' + (currentPlayer + 1) + ' goes first');
    
    // If first player is AI, make their move
    if (currentPlayer >= humanPlayers) {
        makeAIMove();
    }
}
```

5. **Test it**
   - Refresh your browser
   - Start a game with 1 human player
   - You should see:
     - If a computer player goes first, they automatically place a piece
     - After you make a move, the next computer player moves automatically
     - Computer players take turns automatically
     - The game continues until someone wins or ties

### Understanding the Code:

**setTimeout:**
```javascript
setTimeout(() => {
    // This code runs after the delay
}, 500);
```
The `500` is milliseconds (500ms = 0.5 seconds). This makes the AI wait half a second before moving, so it doesn't feel instant.

**Arrow function `() =>`:**
```javascript
setTimeout(() => { ... }, 500);
```
This is a modern JavaScript way to write a function. It's equivalent to:
```javascript
setTimeout(function() { ... }, 500);
```

**Finding empty tiles:**
```javascript
const emptyTiles = [];
for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
        emptyTiles.push(i);
    }
}
```
This loops through the board and builds a list of all empty positions.

**Random selection:**
```javascript
const randomIndex = Math.floor(Math.random() * emptyTiles.length);
return emptyTiles[randomIndex];
```
- `Math.random()` gives a number between 0 and 1
- Multiply by array length to get 0 to length
- `Math.floor()` rounds down to get a whole number
- Use that as the index to pick from the array

Example: If emptyTiles = [0, 3, 7, 12], length = 4
- `Math.random()` = 0.73
- `0.73 * 4` = 2.92
- `Math.floor(2.92)` = 2
- `emptyTiles[2]` = 7 ← Pick tile 7!

**Checking player type:**
```javascript
if (currentPlayer >= humanPlayers && gameActive)
```
If we have 2 human players:
- Player 0 (< 2) = human
- Player 1 (< 2) = human
- Player 2 (>= 2) = AI ✓
- Player 3 (>= 2) = AI ✓

## Success Criteria
✅ Computer players automatically make moves
✅ There's a half-second delay before each AI move
✅ AI only picks empty tiles
✅ Game works with 1, 2, 3, or 4 human players
✅ Console shows "AI is thinking..." messages
✅ Game ends correctly when AI wins or causes a tie

## Testing Checklist:

- ✅ Start with 1 player - AI opponents should move automatically
- ✅ Start with 2 players - 2 AI opponents take turns
- ✅ Start with 3 players - 1 AI opponent plays every 4th turn
- ✅ Start with 4 players - no AI moves (all human)
- ✅ Let AI win - game should end correctly
- ✅ Let game tie - should detect tie correctly

## Next Step
In Step 7, we'll make the AI smarter! Instead of random moves, they'll try to block opponents and go for wins.
