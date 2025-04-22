class ThrowableObject extends MovableObject {
  collidedWith = {};
  splash_sound = new Audio("audio/splash.mp3");

  IMAGES_BOTTLE_ROTATION = [
      "img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  direction;

  offset = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
  };

  /**
   * Creates a new throwable object at a given position and associates it with the character.
   */
  constructor(x, y, character) {
      super().loadImage("img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
      this.loadImages(this.IMAGES_BOTTLE_ROTATION);
      this.loadImages(this.IMAGES_BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.character = character;
      this.direction = character.otherDirection;

      this.throw();              // Start the throwing movement
      this.animateRotation();   // Start the rotation animation
  }

  /**
   * Simulates the throwing movement, including horizontal motion and sound.
   */
  throw() {
      const throw_sound = new Audio("audio/throw.mp3");
      throw_sound.play();
      this.speedY = 30;

      if (this.character) {
          this.character.lastActionTime = new Date().getTime();
          this.character.playAnimation(this.character.IMAGES_WALKING);
      }

      this.applyGravity();

      // Move horizontally depending on direction
      this.throwInterval = setInterval(() => {
          if (this.direction) {
              this.x -= 10;
          } else {
              this.x += 10;
          }
      }, 50);
  }

  /**
   * Animates the bottle's rotation while flying through the air.
   */
  animateRotation() {
      this.rotationInterval = setInterval(() => {
          this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }, 100);
  }

  /**
   * Triggers splash animation and logic when the bottle hits an enemy.
   */
  splash(enemy) {
      // Prevent multiple splashes for the same enemy
      if (this.collidedWith[enemy.id]) return;
      this.collidedWith[enemy.id] = true;

      // If already splashing, do nothing
      if (this.isSplashing) return;
      this.isSplashing = true;

      // Stop motion and animations
      clearInterval(this.rotationInterval);
      clearInterval(this.throwInterval);
      this.speedY = 0;
      this.speedX = 0;
      this.acceleration = 0;

      // Play splash animation and sound
      this.playOnce(this.IMAGES_BOTTLE_SPLASH, 1800);
      this.splash_sound.play();

      // Mark object as ready for removal after splash
      setTimeout(() => {
          this.isSplicable = true;
      }, this.IMAGES_BOTTLE_SPLASH.length * 100);
  }
}
