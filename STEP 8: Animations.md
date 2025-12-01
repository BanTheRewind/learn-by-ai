# STEP 8: Animations

## What This Step Does
Adds retro-style animations when tiles are clicked! Each move triggers a pulse animation that makes the tile glow and grow slightly, giving satisfying visual feedback.

## What I'm Building
- CSS keyframe animations (the retro way to animate!)
- Pulse effect when tiles are placed
- Different colored glows for each player
- Scanline effect for authentic retro feel

## Why This Matters
Animations make your game feel professional and fun! You'll learn:
- How to create animations with CSS
- The @keyframes rule for defining animations
- How to trigger animations from JavaScript
- Visual feedback principles (users need to see what's happening)

## Technical Concepts Introduced
- **@keyframes**: Defines an animation sequence
- **animation property**: Applies animations to elements
- **transform**: Changes element size, position, or rotation
- **box-shadow**: Creates glow effects
- **CSS custom properties**: Color variables for each player
- **classList operations**: Adding/removing classes to trigger effects

## How to Do This Yourself

### Step-by-step Instructions:

1. **Add player-specific colors to styles.css**
   - Add these at the end of `styles.css`:

```css
/* Player-specific colors */
.player-0 {
    color: #0ff;
    text-shadow: 0 0 20px #0ff;
}

.player-1 {
    color: #f0f;
    text-shadow: 0 0 20px #f0f;
}

.player-2 {
    color: #f00;
    text-shadow: 0 0 20px #f00;
}

.player-3 {
    color: #ff0;
    text-shadow: 0 0 20px #ff0;
}

/* Pulse animation */
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 15px #0f0;
    }
    50% {
        transform: scale(1.2);
        box-shadow: 0 0 30px currentColor;
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 15px currentColor;
    }
}

.tile.pulse {
    animation: pulse 0.4s ease-out;
}

/* Retro scanline effect */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
    );
    pointer-events: none;
    z-index: 1000;
}

/* Screen flicker */
@keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.95; }
}

body {
    animation: flicker 0.15s infinite;
}
```

2. **Update makeMove function in game.js**
   - Find the `makeMove` function and update it to add animations:

```javascript
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
```

3. **Test it**
   - Refresh your browser
   - Start a game
   - Click on tiles and watch them:
     - Pulse and glow when clicked
     - Show different colors for each player (cyan, magenta, red, yellow)
     - Have a retro scanline effect over the whole screen
   - Notice the subtle screen flicker effect

### Understanding the Code:

**@keyframes animation:**
```css
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
```
This defines how the animation progresses:
- 0% (start): Normal size
- 50% (middle): 120% size (bigger)
- 100% (end): Back to normal size

**Applying the animation:**
```css
.tile.pulse {
    animation: pulse 0.4s ease-out;
}
```
- `pulse` - Which animation to use
- `0.4s` - Duration (400 milliseconds)
- `ease-out` - Timing function (starts fast, ends slow)

**Player colors:**
```css
.player-0 { color: #0ff; } /* Cyan */
.player-1 { color: #f0f; } /* Magenta */
.player-2 { color: #f00; } /* Red */
.player-3 { color: #ff0; } /* Yellow */
```
Each player gets a unique retro color!

**Adding/removing animation:**
```javascript
tile.classList.add('pulse');
setTimeout(() => {
    tile.classList.remove('pulse');
}, 400);
```
We add the class to trigger the animation, then remove it after 400ms so it can be triggered again later.

**Scanlines effect:**
```css
background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
);
```
Creates horizontal lines that repeat every 2 pixels, like an old CRT monitor!

**::before pseudo-element:**
```css
body::before {
    content: '';
    position: fixed;
    /* ... */
}
```
Creates an invisible element before the body content. We use it for the scanline overlay.

**currentColor keyword:**
```css
box-shadow: 0 0 30px currentColor;
```
Uses whatever color the element currently has. Since each player has a different color class, the glow matches the player color!

## Success Criteria
✅ Tiles pulse when clicked
✅ Each player has a unique color (cyan, magenta, red, yellow)
✅ Scanline effect visible across the screen
✅ Subtle screen flicker creates retro feel
✅ Animations are smooth and satisfying

## Visual Reference:

**Player Colors:**
- Player 1 (X): Cyan (#0ff) - like Tron
- Player 2 (O): Magenta (#f0f) - vibrant pink
- Player 3 (❤️): Red (#f00) - classic red
- Player 4 (⭐): Yellow (#ff0) - bright yellow

## Customization Ideas:

Want to experiment? Try changing:
- Animation duration: Change `0.4s` to `0.2s` (faster) or `0.8s` (slower)
- Scale amount: Change `scale(1.2)` to `scale(1.5)` (bigger pulse)
- Flicker speed: Change `0.15s` to `0.3s` (slower flicker)
- Player colors: Pick your own hex colors!

## Next Step
In Step 9, we'll add special celebration animations for when someone wins or the game ends in a tie!
