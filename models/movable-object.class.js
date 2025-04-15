class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
  
    offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  
    /**
     * Applies gravity to the object by moving it down and reducing the
     * vertical speed every 25 milliseconds. The vertical speed is reduced
     * by the acceleration until the object is no longer above the ground.
     * If the object is above the ground, the vertical speed is reset to 0.
     */
    applyGravity() {
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
    }
  
    /**
     * Checks if the object is above the ground.
     * 
     * @return {boolean} - True if the object is above the ground, false otherwise.
     */
  
    isAboveGround() {
      if (this instanceof ThrowableObject) {
        return true;
      } else {
        return this.y < 180;
      }
    }
  
    /**
     * Checks if the object is colliding with another object.
     * 
     * The check is done by comparing the object's position and size with the
     * other object's position and size. It takes into account the offset of
     * both objects around their edges.
     * 
     * @param {MovableObject} mo - The other object to check collision with.
     * @return {boolean} - True if the object is colliding with the other object, false otherwise.
     */
    isColliding(mo) {
      return (
        this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
      );
    }
  
    /**
     * Increases the amount of coins the character has by 10.
     * If the amount of coins exceeds 100, it is capped at 100.
     */
    collectCoin() {
      this.amountOfCoins += 10;
      if (this.amountOfCoins > 100) {
        this.amountOfCoins = 100;
      }
    }
  
  
  
    /**
     * Reduces the energy of the object by 5 and updates the last hit timestamp.
     * 
     * If the energy falls below 0, it is set to 0. Otherwise, the last hit
     * timestamp is updated to the current time.
     */
    hit() {
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Checks if the object is currently hurt.
     * 
     * This function determines whether the object is still considered hurt based on
     * the time elapsed since the last hit. If the time passed since the last hit is
     * less than 500 milliseconds, the object is considered hurt.
     *
     * @returns {boolean} True if the object is hurt, otherwise false.
     */
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      return timepassed < 500;
    }
  
    /**
     * Checks if the object is dead.
     * 
     * This function returns true if the object's energy is zero, indicating that
     * the object is dead.
     *
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Cycles through the provided images to animate the object.
     * 
     * This function selects an image from the provided array based on the
     * current image index, updates the object's image to the selected image,
     * and increments the current image index for the next cycle.
     *
     * @param {string[]} images - An array of image paths to cycle through for the animation.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    /**
     * Plays a single animation cycle through the provided images and then stops.
     * 
     * This function selects an image from the provided array based on the
     * current image index, updates the object's image to the selected image,
     * and increments the current image index. The animation is played at a
     * constant rate across all frames, with the rate determined by the total
     * duration provided. The animation is stopped after the total duration
     * has elapsed.
     * 
     * @param {string[]} images - An array of image paths to cycle through for the animation.
     * @param {number} totalDuration - The total duration of the animation in milliseconds.
     */
    playOnce(images, totalDuration) {
      this.currentImage = 0;
      const timePerFrame = totalDuration / images.length;
      const animationInterval = setInterval(() => {
        if (this.currentImage < images.length) {
          let path = images[this.currentImage];
          this.img = this.imageCache[path];
          this.currentImage++;
        } else {
          clearInterval(animationInterval);
        }
      }, timePerFrame);
    }
  
    /**
     * Moves the object to the right by increasing its x coordinate by the
     * object's speed.
     * 
     * This function updates the object's position to the right and records
     * the time of the last action.
     */
    moveRight() {
      this.x += this.speed;
      this.lastActionTime = new Date().getTime();
    }
  
    /**
     * Moves the object to the left by decreasing its x coordinate by the
     * object's speed.
     * 
     * This function updates the object's position to the left and records
     * the time of the last action.
     */
    moveLeft() {
      this.x -= this.speed;
      this.lastActionTime = new Date().getTime();
    }
  
    /**
     * Kills an enemy that the object jumps on.
     * 
     * This function takes an enemy object as a parameter and calls the die
     * method on it to kill it.
     * @param {Enemy} enemy The enemy object to be killed.
     */
    jumpOn(enemy) {
      enemy.die();
    }
  
    /**
     * Continuously moves the object within a specified range.
     * 
     * This function uses an interval to move the object left or right based on its
     * current position and direction. If the object's x-coordinate is less than 350,
     * it moves to the right and changes its direction flag. If the x-coordinate is
     * greater than 1400, it moves to the left and resets the direction flag. The 
     * movement is updated every 60 frames per second.
     */
    move() {
      setInterval(() => {
        if (this.x < 350) {
          this.moveRight();
          this.otherDirection = true;
        }
        if (!this.otherDirection) {
          this.moveLeft();
        } else {
          this.moveRight();
          this.otherDirection = true;
        }
        if (this.x > 1400) {
          this.otherDirection = false;
          this.moveLeft();
        }
      }, 1000 / 60)
    }
  }
  
  
  