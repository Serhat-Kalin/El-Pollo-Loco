class Cloud extends MovableObject {

    /**
     * Creates a new cloud.
     *
     * @constructor
     */
    constructor() {
      super().loadImage("img/img/5_background/layers/4_clouds/1.png");
      this.x = 500;
      this.y = 10;
      this.width = 500;
      this.height = 300;
      this.speed = 0.1;
      this.animate();
    }
  
    /**
     * Animates the cloud's movement. The cloud moves left at a speed of 0.1
     * pixels per frame. The animation is updated every 16.7 milliseconds, which
     * is equivalent to 60 frames per second.
     */
    animate() {
      setInterval(() => {
          this.moveLeft();
      }, 1000 / 60);
  }
  }
  