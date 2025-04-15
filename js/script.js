/**
 * Shows or hides an HTML element by setting its display property.
 * @param {string} elementId - The ID of the HTML element.
 * @param {boolean} show - If true, the element is shown (display: flex), otherwise hidden (display: none).
 */
function toggleDisplay(elementId, show) {
    const displayStyle = show ? "flex" : "none";
    document.getElementById(elementId).style.display = displayStyle;
}

/**
 * Triggers the game over sequence:
 * - Hides the canvas
 * - Shows the game over screen
 * - Clears all running intervals
 * - Pauses background music
 */
function gameOver() {
    toggleDisplay("canvas", false);
    toggleDisplay("gameover", true);
    clearAllIntervals();
    bg_music.pause();
}

/**
 * Clears all active intervals by iterating through a large range of possible IDs.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        clearInterval(i);
    }
}

/**
 * Displays the win screen:
 * - Ends the game
 * - Hides the canvas
 * - Shows the win screen
 * - Hides the start screen
 * - Pauses background music
 */
function winScreen() {
    endGame();
    toggleDisplay("canvas", false);
    toggleDisplay("win", true);
    toggleDisplay("startscreen", false);
    bg_music.pause();
}

/**
 * Starts the game:
 * - Initializes the level and the game
 * - Shows canvas, hides menus and overlays
 * - Starts playing background music
 */
function startGame() {
    initLevel();
    init();
    toggleDisplay("startscreen", false);
    toggleDisplay("canvas", true);
    toggleDisplay("gameover", false);
    toggleDisplay("instructionBtn", false);
    toggleDisplay("policyid", false);
    bg_music.loop = true;
    bg_music.volume = 0.1;
    bg_music.play();
}

/**
 * Restarts the game after a win or game over:
 * - Hides win and game over screens
 * - Shows the canvas again
 * - Ends current game and restarts
 */
function restartGame() {
    toggleDisplay("win", false);
    toggleDisplay("gameover", false);
    toggleDisplay("canvas", true);
    endGame();
}


/**
 * Returns to the start menu:
 * - Hides all game-related screens
 * - Shows the start screen and relevant buttons
 */
function goToStartMenu() {
    toggleDisplay("gameover", false);
    toggleDisplay("startscreen", true);
    toggleDisplay("canvas", false);
    toggleDisplay("win", false);
    toggleDisplay("instructionBtn", true);
    toggleDisplay("policyid", true);
}

/**
 * Checks the screen orientation:
 * - Shows a warning if the device is in portrait mode
 */
function checkOrientation() {
    const warning = document.getElementById('orientationWarning');
    if (window.matchMedia("(orientation: portrait)").matches) {
        warning.style.display = "flex";
    } else {
        warning.style.display = "none";
    }
}

/**
 * Shows the instructions screen:
 * - Hides the start screen
 * - Displays the instruction section
 * - Hides the policy section
 */
function showInstructions() {
    toggleDisplay("startscreen", false);
    toggleDisplay("instructionid", true);
    toggleDisplay("impressum", false);
}

/**
 * Hides the instructions and returns to the start screen.
 */
function hideInstructions() {
    toggleDisplay("startscreen", true);
    toggleDisplay("instructionid", false);
}

/**
 * Shows the policy section:
 * - Hides other sections
 * - Displays the policy (impressum) block
 */
function showpolicy() {
    toggleDisplay("startscreen", false);
    toggleDisplay("instructionid", false);
    document.getElementById("impressum").style.display = "block";
}

/**
 * Hides the policy section and returns to the start screen.
 */
function hidepolicy() {
    toggleDisplay("startscreen", true);
    document.getElementById("impressum").style.display = "none";
}


/**
 * Event listeners to check the orientation when:
 * - The window is resized
 * - The device orientation changes
 * - The page is loaded
 */
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.onload = checkOrientation;




