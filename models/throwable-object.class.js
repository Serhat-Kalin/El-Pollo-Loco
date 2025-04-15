class ThrowableObject extends MovableObject {
    collidedWith = {};
    splash_sound = new Audio("audio/throw.mp3");
  
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
    ]
  
    direction;
  
    offset = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    };
  
    /**
     * Constructor for a ThrowableObject.
     * 
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {Character} character - The character that threw the object.
     * 
     * The constructor sets the image of the object to the first image in
     * the IMAGES_BOTTLE_ROTATION array, and sets the image cache to contain
     * all the images in the IMAGES_BOTTLE_ROTATION and IMAGES_BOTTLE_SPLASH
     * arrays. It also sets the x and y coordinates of the object, and the
     * height and width to 60 and 50 respectively. The character that threw
     * the object is stored in the character property. The throw() and
     * animateRotation() methods are then called.
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
  
      this.throw();
      this.animateRotation();
    }
  
    /**
     * Throws the object.
     * 
     * Sets the vertical speed of the object to 30, and if the object was thrown
     * by a character, sets the character's last action time to the current time
     * and plays the character's walk animation. It then applies gravity to the
     * object and starts moving the object to the right every 50 milliseconds.
     */
    throw() {
      this.speedY = 30;
      if (this.character) {
        this.character.lastActionTime = new Date().getTime();
        this.character.playAnimation(this.character.IMAGES_WALKING);
      }
      this.applyGravity();
      this.throwInterval = setInterval(() => {
        if(this.direction){
          this.x -= 10;
        } else {
          this.x += 10;
        }
      }, 50);
    }
  
    /**
     * Animates the rotation of the throwable object.
     * 
     * This method cycles through the rotation images of the bottle
     * at a 100ms interval to create a continuous rotation animation.
     */
    animateRotation() {
      this.rotationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }, 100);
    }
  
    /**
     * Handles the splash of the bottle when it hits an enemy.
     * 
     * This method checks if the bottle has already collided with the enemy and
     * if it is already splashing. If not, it sets the bottle's vertical and
     * horizontal speeds to 0, clears the rotation and throw intervals, and
     * plays the bottle splash animation and sound. It also sets the bottle's
     * isSplicable flag to true after the splash animation has finished.
     * 
     * @param {Enemy} enemy - The enemy that the bottle has collided with.
     */
    splash(enemy) {
      if (this.collidedWith[enemy.id]) return;
      this.collidedWith[enemy.id] = true;
      if (this.isSplashing) return;
      this.isSplashing = true;
      clearInterval(this.rotationInterval);
      clearInterval(this.throwInterval);
      this.speedY = 0;
      this.speedX = 0;
      this.acceleration = 0;
      this.playOnce(this.IMAGES_BOTTLE_SPLASH, 1800);
      this.splash_sound.play();
      setTimeout(() => {
        this.isSplicable = true;
      }, this.IMAGES_BOTTLE_SPLASH.length * 100);
    }
  }
  