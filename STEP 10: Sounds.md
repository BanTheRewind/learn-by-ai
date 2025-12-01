# STEP 10: Sounds

## What This Step Does
Adds retro sound effects using the Web Audio API! We'll create simple beep sounds programmatically instead of using audio files, giving it an authentic 8-bit game feel.

## What I'm Building
- Sound system using Web Audio API
- Different tones for different actions (place tile, win, tie)
- Retro beep and bloop sounds
- Volume control

## Why This Matters
Sound is crucial for game feel! You'll learn:
- How to generate sounds with code (no audio files needed!)
- The Web Audio API
- Creating different tones and frequencies
- Making games feel more engaging

## Technical Concepts Introduced
- **Web Audio API**: Browser API for creating and manipulating sounds
- **AudioContext**: The main controller for audio
- **OscillatorNode**: Generates tones at specific frequencies
- **GainNode**: Controls volume
- **Frequency**: Pitch of the sound (measured in Hertz)

## How to Do This Yourself

### Step-by-step Instructions:

1. **Create sounds.js file**
   - Create a new file called `sounds.js`
   - Add this code:

```javascript
// Sound effects using Web Audio API

// Create audio context (modern browsers)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

// Initialize audio context (must be done after user interaction)
function initAudio() {
    if (!audioContext) {
        audioContext = new AudioContext();
        console.log('Audio initialized');
    }
}

// Play a beep sound
function playBeep(frequency, duration) {
    initAudio();
    
    // Create oscillator (tone generator)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect: oscillator -> gain -> speakers
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set frequency (pitch)
    oscillator.frequency.value = frequency;
    oscillator.type = 'square'; // Retro square wave sound
    
    // Set volume envelope (fade out)
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    // Play sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Play a sequence of beeps
function playSequence(notes, noteDuration, gap) {
    notes.forEach((freq, index) => {
        setTimeout(() => {
            playBeep(freq, noteDuration);
        }, index * (noteDuration * 1000 + gap));
    });
}

// Sound effects for different actions
function soundPlace() {
    playBeep(800, 0.1); // Quick high beep
}

function soundWin() {
    // Victory fanfare: ascending notes
    const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord)
    playSequence(notes, 0.15, 50);
}

function soundTie() {
    // Sad descending tones
    const notes = [400, 350, 300]; // Descending beeps
    playSequence(notes, 0.2, 100);
}

function soundBlock() {
    // Two-tone warning sound
    playBeep(300, 0.1);
    setTimeout(() => playBeep(200, 0.1), 120);
}
```

2. **Link sounds.js to HTML**
   - Add to `index.html` after the other scripts:

```html
    <script src="game.js"></script>
    <script src="ai.js"></script>
    <script src="sounds.js"></script>
</body>
```

3. **Add sounds to game.js**
   - Update `makeMove` to play sound when placing tiles:

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
```

4. **Add sounds to winner announcements**
   - Update `announceWinner`:

```javascript
// Announce the winner
function announceWinner() {
    const playerSymbols = ['X', 'O', '❤️', '⭐'];
    
    // Play win sound
    soundWin();
    
    // Highlight winning tiles
    highlightWinningTiles();
    
    // Show overlay with celebration (rest of function stays the same)
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
```

   - Update `announceTie`:

```javascript
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
```

5. **Add sound to AI blocking (optional)**
   - In `ai.js`, update `getSmartMove`:

```javascript
// Get the best possible move (strategic AI)
function getSmartMove() {
    // Priority 1: Block any opponent from winning
    const blockMove = findBlockingMove();
    if (blockMove !== null) {
        console.log('AI blocking at position ' + blockMove);
        soundBlock(); // Add this line
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
```

6. **Test it**
   - Refresh your browser
   - Start a game - you should hear:
     - A beep when you click a tile
     - An ascending musical fanfare when someone wins
     - Descending sad beeps when there's a tie
     - A warning beep-boop when AI blocks you

### Understanding the Code:

**Web Audio API basics:**
```javascript
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
```
- `AudioContext`: The main audio engine
- `Oscillator`: Generates tones
- `GainNode`: Controls volume

**Audio routing:**
```javascript
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
```
Sound flows: Oscillator → Volume Control → Speakers

**Frequency = Pitch:**
- 261 Hz = Middle C note
- 523 Hz = C one octave higher
- Higher number = higher pitch
- Lower number = lower pitch

**Oscillator types:**
```javascript
oscillator.type = 'square';
```
- `square`: Retro, harsh (like 8-bit games)
- `sine`: Pure, smooth tone
- `sawtooth`: Buzzy
- `triangle`: Softer than square

**Volume envelope:**
```javascript
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
```
Starts at 30% volume, fades to near-silent. Creates a natural sound decay.

**Musical notes (frequencies in Hz):**
```javascript
const notes = [523, 659, 784, 1047]; // C, E, G, C
```
These form a C major chord - sounds happy!

## Success Criteria
✅ Beep sound plays when placing a tile
✅ Victory fanfare plays when someone wins
✅ Sad descending tones play on tie
✅ Optional: Block sound plays when AI blocks
✅ Sounds are retro and 8-bit style
✅ All sounds work in browser (Chrome, Firefox, Safari)

## Common Issues & Fixes:

**Problem**: No sound plays
- **Fix**: Modern browsers require user interaction before audio. The first click should initialize it.
- **Check**: Console should show "Audio initialized"

**Problem**: Sound is too loud/quiet
- **Fix**: Change `0.3` in `setValueAtTime(0.3, ...)` to adjust volume (0.1 = quieter, 0.5 = louder)

**Problem**: Sounds don't work in Safari
- **Fix**: Safari requires `webkitAudioContext` - already handled in the code!

## Customization Ideas:

Try different frequencies and sequences:
```javascript
// Higher pitched place sound
function soundPlace() {
    playBeep(1200, 0.08);
}

// Different victory tune
function soundWin() {
    const notes = [392, 523, 659, 784]; // G, C, E, G
    playSequence(notes, 0.2, 50);
}

// Change oscillator type for different sound
oscillator.type = 'triangle'; // Smoother sound
```

## Next Step
In Step 11, we'll add final polish - a reset button, improved mobile responsiveness, and code cleanup!
