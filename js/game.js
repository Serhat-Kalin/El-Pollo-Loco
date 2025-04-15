let canvas;
let world;
let keyboard = new Keyboard();
let = bg_music = new Audio("audio/bgmusic.mp3");
let soundMuted = false;
const originalPlay = Audio.prototype.play;

/**
 * Overrides the default play method of the Audio prototype
 * to prevent playback if the sound is muted.
 */
Audio.prototype.play = function () {
  if (!soundMuted) {
    return originalPlay.call(this);
  }
};

/**
 * Initializes the game by:
 * - Activating mobile controls
 * - Getting the canvas element
 * - Creating a new World instance
 * - Setting background music to loop
 * - Playing background music if not muted
 */
function init() {
  keyboard.mobileControl();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  bg_music.loop = true;
  bg_music.volume = 0.1;

  if (!soundMuted) {
    bg_music.play();
  }
}

/**
 * Ends the game by:
 * - Setting the gameOver flag
 * - Pausing background music
 * - Clearing all intervals
 * - Restarting the game
 */
function endGame() {
  world.gameOver = true;
  bg_music.pause();
  clearAllIntervals();
  startGame();
}

/**
 * Initializes the HTML body elements:
 * - Hides the canvas
 * - Pauses background music
 * - Loads the muted state from localStorage
 * - Updates the sound icon accordingly
 */
function initBody() {
  document.getElementById("canvas").style.display = "none";
  bg_music.pause();
  soundMuted = JSON.parse(localStorage.getItem("soundMuted")) || false;
  const soundIcon = document.getElementById("soundid");
  if (soundMuted) {
    soundIcon.src = "./img/soundoff.png";
  } else {
    soundIcon.src = "./img/soundon.png";
  }
}

/**
 * Toggles the muted state of the game:
 * - Updates the soundMuted variable
 * - Saves the state to localStorage
 * - Pauses or plays the background music based on state
 * - Updates the sound icon image
 */
function mute() {
  const soundIcon = document.getElementById("soundid");
  const startscreen = document.getElementById("startscreen");
  soundMuted = !soundMuted;
  localStorage.setItem("soundMuted", JSON.stringify(soundMuted));
  if (soundMuted) {
    bg_music.pause();
    soundIcon.src = "./img/soundoff.png";
  } else {
    if (startscreen.style.display !== "flex") {
      bg_music.play();
    }
    soundIcon.src = "./img/soundon.png";
  }
}









