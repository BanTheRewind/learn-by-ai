# STEP 2: Menu

## What This Step Does
Creates a start menu where players can choose how many humans are playing (1-4). The remaining players will be controlled by the computer.

## What I'm Building
- A menu screen with 4 buttons (1-4 human players)
- Basic CSS styling to make it look clean
- JavaScript to handle button clicks
- The menu hides when a button is clicked

## Why This Matters
Games need user interaction! This teaches you how to:
- Style elements with CSS
- Handle user clicks with JavaScript
- Change the page dynamically (show/hide elements)

## Technical Concepts Introduced
- **CSS (Cascading Style Sheets)**: Controls how the page looks
- **JavaScript**: Makes the page interactive
- **DOM (Document Object Model)**: How JavaScript interacts with HTML
- **Event Listeners**: Code that runs when something happens (like a click)
- **Variables**: Storing information in your program

## How to Do This Yourself

### Step-by-step Instructions:

1. **Update index.html**
   - Replace the content inside `<body>` with:

```html
<body>
    <div id="menu">
        <h1>Four Player Tic-Tac-Toe</h1>
        <p>How many human players?</p>
        <button onclick="startGame(1)">1 Player</button>
        <button onclick="startGame(2)">2 Players</button>
        <button onclick="startGame(3)">3 Players</button>
        <button onclick="startGame(4)">4 Players</button>
    </div>
    
    <div id="game" style="display: none;">
        <p>Game will go here...</p>
    </div>

    <script src="game.js"></script>
</body>
```

2. **Create styles.css**
   - Create a new file called `styles.css` in the same folder as `index.html`
   - Add this code:

```css
body {
    font-family: 'Courier New', monospace;
    background-color: #000;
    color: #0f0;
    text-align: center;
    margin: 0;
    padding: 20px;
}

#menu {
    margin-top: 100px;
}

#menu h1 {
    font-size: 48px;
    margin-bottom: 20px;
    text-shadow: 0 0 10px #0f0;
}

#menu p {
    font-size: 24px;
    margin-bottom: 30px;
}

button {
    background-color: #0a0;
    color: #000;
    border: 3px solid #0f0;
    font-family: 'Courier New', monospace;
    font-size: 20px;
    font-weight: bold;
    padding: 15px 30px;
    margin: 10px;
    cursor: pointer;
    box-shadow: 0 0 10px #0f0;
}

button:hover {
    background-color: #0f0;
    box-shadow: 0 0 20px #0f0;
}
```

3. **Link CSS to HTML**
   - In `index.html`, add this line inside the `<head>` section (before `</head>`):

```html
<link rel="stylesheet" href="styles.css">
```

4. **Create game.js**
   - Create a new file called `game.js` in the same folder
   - Add this code:

```javascript
// Game state variables
let humanPlayers = 0;

// Start the game with selected number of human players
function startGame(numHumans) {
    humanPlayers = numHumans;
    
    // Hide menu, show game
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    console.log('Game started with ' + humanPlayers + ' human players');
}
```

5. **Test it**
   - Open (or refresh) `index.html` in your browser
   - You should see a retro-styled menu with green text on black
   - Click any button - the menu should disappear and show "Game will go here..."
   - Open the browser console (F12 or right-click → Inspect → Console tab) to see the log message

### Understanding the Code:

**HTML:**
- `<div id="menu">` - A container for the menu (id lets us find it in JavaScript)
- `onclick="startGame(1)"` - When clicked, run the `startGame` function with number 1
- `<script src="game.js">` - Load the JavaScript file

**CSS:**
- `font-family: 'Courier New', monospace` - Retro computer font
- `background-color: #000` - Black background (#000 is hexadecimal for black)
- `color: #0f0` - Green text (like old terminals)
- `text-shadow: 0 0 10px #0f0` - Glow effect
- `:hover` - Styles that apply when you move mouse over an element

**JavaScript:**
- `let humanPlayers = 0;` - Creates a variable to store the number of human players
- `function startGame(numHumans)` - Defines a function that takes one parameter
- `document.getElementById('menu')` - Finds the element with id "menu"
- `.style.display = 'none'` - Hides the element
- `console.log()` - Prints a message to the browser console (for debugging)

## Success Criteria
✅ Menu displays with retro green-on-black styling
✅ Four buttons appear (1-4 Players)
✅ Clicking any button hides the menu
✅ "Game will go here..." message appears after clicking
✅ Console shows the correct number of human players

## Next Step
In Step 3, we'll create the actual 5x5 game board where players will place their pieces.
