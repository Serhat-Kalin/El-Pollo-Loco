class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Initializes the keyboard event listeners.
   */
  constructor() {
      this.keyBoardPress();
  }

  /**
   * Listens for keyboard keydown and keyup events and updates flags accordingly.
   */
  keyBoardPress() {
      window.addEventListener('keydown', (event) => {
          if (event.keyCode == 32) keyboard.SPACE = true;      // Spacebar
          if (event.keyCode == 37) keyboard.LEFT = true;       // Left arrow
          if (event.keyCode == 39) keyboard.RIGHT = true;      // Right arrow
          if (event.keyCode == 40) keyboard.DOWN = true;       // Down arrow
          if (event.keyCode == 68) keyboard.D = true;          // 'D' key
      });

      window.addEventListener('keyup', (event) => {
          if (event.keyCode == 32) keyboard.SPACE = false;
          if (event.keyCode == 37) keyboard.LEFT = false;
          if (event.keyCode == 39) keyboard.RIGHT = false;
          if (event.keyCode == 40) keyboard.DOWN = false;
          if (event.keyCode == 68) keyboard.D = false;
      });
  }

  /**
   * Adds touch event listeners for mobile controls using on-screen buttons.
   * Requires buttons with IDs: leftbtn, rightbtn, jumpbtn, throwbtn.
   */
  mobileControl() {
    this.addTouchControl('leftbtn', 'LEFT');
    this.addTouchControl('rightbtn', 'RIGHT');
    this.addTouchControl('jumpbtn', 'SPACE');
    this.addTouchControl('throwbtn', 'D');
}

addTouchControl(buttonId, keyName) {
    const button = document.getElementById(buttonId);

    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this[keyName] = true;
    }, { passive: false });

    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        this[keyName] = false;
    }, { passive: false });
}
}