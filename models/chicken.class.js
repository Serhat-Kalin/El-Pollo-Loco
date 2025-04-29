class Chicken extends MovableObject {
  y = 350;
  height = 90;
  width = 90;
  health = 20;
  chicken_sound = new Audio("audio/chicken.mp3");

  IMAGES_WALKING = [
      "img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
      "img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  offset = {
      top: 0,
      bottom: 0,
      left: 5,
      right: 5,
  };

  /**
   * Creates a normal chicken enemy, loads images,
   * sets position and starts movement/animation.
   */
  constructor() {
      super().loadImage("img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 700 + Math.random() * 500;
      this.speed = 1;
      this.move();
      this.animate();
      this.isDead = false;
  }

  /**
   * Animates chicken depending on state (walking or dead).
   */
  animate() {
      setInterval(() => {
          if (!this.isDead) {
              this.playAnimation(this.IMAGES_WALKING);
          } else {
              this.playAnimation(this.IMAGES_DEAD);
          }
      }, 200);
  }

  /**
   * Reduces health by given amount and checks for death.
   * @param {number} amount - How much damage to apply.
   */
  takeDamage(amount) {
      this.health = Math.max(0, this.health - amount);
      if (this.health === 0) {
          this.die();
      }
  }

  /**
   * Handles death logic: stops movement, plays sound,
   * shows dead image and removes from screen after delay.
   */
  die() {
      if (this.isDead) return;
      this.isDead = true;
      this.speed = 0;
      this.chicken_sound.play();
      this.img = this.imageCache[this.IMAGES_DEAD[0]];

      setTimeout(() => {
          this.y = -1000;
      }, 1000);
  }
}
