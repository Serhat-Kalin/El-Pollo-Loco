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
     * Constructor for a Bottle object
     * @param {number} x - the x position of the bottle
     * @param {number} y - the y position of the bottle
     */
    constructor(x, y) {
      super();
      this.loadImage(this.IMAGES);
      this.x = x; 
      this.y = y;
    }
  }
  