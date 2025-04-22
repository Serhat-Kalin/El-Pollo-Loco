class Cloud extends MovableObject {
  /**
   * Creates a cloud object with a fixed image, 
   * sets position, size and speed, and starts animation.
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
   * Animates the cloud by moving it left continuously.
   */
  animate() {
      setInterval(() => {
          this.moveLeft();
      }, 1000 / 60);
  }
}
