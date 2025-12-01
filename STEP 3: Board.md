# STEP 3: Board

## What This Step Does
Creates the 5x5 game board where players will click to place their pieces. Each cell is clickable and shows which cell was clicked.

## What I'm Building
- A 5x5 grid of clickable tiles
- CSS Grid layout (modern way to create grids)
- Click handling for each tile
- Visual feedback when hovering over tiles

## Why This Matters
This is the core of the game! You'll learn:
- How to create grids with CSS Grid
- How to generate HTML elements with JavaScript
- How to track clicks on multiple elements
- Array indexing (how computers number things starting from 0)

## Technical Concepts Introduced
- **CSS Grid**: A powerful layout system for creating grids
- **Arrays**: Lists of values (our board is a 25-item array)
- **Loops**: Repeating code multiple times
- **Template Literals**: Modern way to combine text and variables in JavaScript
- **Dataset Attributes**: Storing custom data on HTML elements

## How to Do This Yourself

### Step-by-step Instructions:

1. **Update index.html**
   - Replace the `<div id="game">` section with:

```html
<div id="game" style="display: none;">
    <h2>Player 1's Turn</h2>
    <div id="board"></div>
</div>
```

2. **Add board styles to styles.css**
   - Add this code at the end of your `styles.css` file:

```css
#game {
    margin-top: 50px;
}

#game h2 {
    font-size: 32px;
    margin-bottom: 20px;
    text-shadow: 0 0 10px #0f0;
}

#board {
    display: grid;
    grid-template-columns: repeat(5, 100px);
    grid-template-rows: repeat(5, 100px);
    gap: 5px;
    justify-content: center;
    margin: 20px auto;
}

.tile {
    background-color: #001a00;
    border: 2px solid #0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    cursor: pointer;
    transition: all 0.2s;
}

.tile:hover {
    background-color: #003300;
    box-shadow: 0 0 15px #0f0;
}

.tile.filled {
    cursor: not-allowed;
}

.tile.filled:hover {
    background-color: #001a00;
}
```

3. **Update game.js**
   - Replace ALL the code in `game.js` with:

```javascript
// Game state variables
let humanPlayers = 0;
let board = Array(25).fill(null); // Array of 25 empty cells
let currentPlayer = 0; // 0-3 for players 1-4

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
    console.log('Tile ' + index + ' clicked');
    
    // Check if tile is already filled
    if (board[index] !== null) {
        console.log('Tile already filled!');
        return;
    }
    
    console.log('Valid move!');
}

// Update the turn display
function updateTurnDisplay() {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    const h2 = document.querySelector('#game h2');
    h2.textContent = 'Player ' + (currentPlayer + 1) + ' (' + playerSymbols[currentPlayer] + ')';
}
```

4. **Test it**
   - Refresh `index.html` in your browser
   - Click a button to start the game
   - You should see:
     - A 5x5 grid of green-bordered tiles
     - A random player number displayed at the top
     - Tiles glow when you hover over them
     - Console messages when you click tiles

### Understanding the Code:

**CSS:**
- `display: grid` - Tells the browser to use Grid layout
- `grid-template-columns: repeat(5, 100px)` - Create 5 columns, each 100px wide
- `gap: 5px` - Space between grid items
- `justify-content: center` - Center the grid on the page
- `transition: all 0.2s` - Smooth animation for hover effects

**JavaScript:**
- `Array(25).fill(null)` - Creates an array with 25 empty slots
- `for (let i = 0; i < 25; i++)` - Loop that runs 25 times (i = 0, 1, 2, ... 24)
- `document.createElement('div')` - Creates a new HTML element
- `tile.dataset.index = i` - Stores the tile number on the element
- `tile.onclick = () => handleTileClick(i)` - Sets up click handler
- `boardElement.appendChild(tile)` - Adds the tile to the board
- `Math.floor(Math.random() * 4)` - Random number from 0 to 3
- `document.querySelector('#game h2')` - Finds the first h2 inside #game

**Why arrays start at 0:**
Computers count from 0, not 1. So our 25 tiles are numbered 0-24:
```
 0  1  2  3  4
 5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24
```

## Success Criteria
✅ 5x5 grid appears when game starts
✅ A random player (1-4) is shown at the top
✅ Tiles glow when you hover over them
✅ Clicking a tile shows a console message
✅ Clicking the same tile multiple times shows "Tile already filled!" (wait for Step 4)

## Next Step
In Step 4, we'll make the tiles actually show the player's symbol when clicked and switch turns between players.
