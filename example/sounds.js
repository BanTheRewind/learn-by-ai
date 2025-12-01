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
