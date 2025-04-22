class Bottle extends DrawableObject {
  height = 80;
  width = 80;

  IMAGES = [
      "img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
  ];

  offset = {
      top: 20,
      bottom: 25,
      left: 40,
      right: 25,
  };

  /**
   * Creates a new bottle object at the given position.
   * Loads the image and sets the x and y coordinates.
   *
   * @param {number} x - The horizontal position of the bottle.
   * @param {number} y - The vertical position of the bottle.
   */
  constructor(x, y) {
      super();
      this.loadImage(this.IMAGES);
      this.x = x;
      this.y = y;
  }
}
