class Chicken extends MovableObject {
    y = 380;
    height = 60;
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
     * Constructor for Chicken
     * 
     * @description Initializes chicken object with starting position, speed, and animations
     * @param {none}
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
     * Animates the chicken by playing the walk animation if alive, dead animation if dead
     * 
     * @description Animates the chicken by playing the walk animation if alive, dead animation if dead
     * @param {none}
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
     * Reduces health by given amount, if health falls to 0, calls die()
     * @description Reduces health by given amount, if health falls to 0, calls die()
     * @param {number} amount - amount of health to reduce
     */
    takeDamage(amount) {
      this.health = Math.max(0, this.health - amount);
      if (this.health === 0) {
        this.die();
      }
    }
  
    /**
     * Sets isDead to true, stops movement, plays die sound, changes image to dead image, and moves off screen
     * @description Sets isDead to true, stops movement, plays die sound, changes image to dead image, and moves off screen
     * @param {none}
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
  