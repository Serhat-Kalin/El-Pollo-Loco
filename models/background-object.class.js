class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new background object and places it at the correct vertical position.
   * Loads the image and sets the horizontal (x) position.
   *
   * @param {string} imagePath - The path to the background image file.
   * @param {number} x - The horizontal position where the background should be placed.
   */
  constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height; // places the object at the bottom of the canvas
  }
}