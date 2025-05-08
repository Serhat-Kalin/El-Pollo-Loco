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
   * Applies gravity to the object over time, simulating falling or jumping.
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
   * Checks whether the object is above the ground level.
   */
  isAboveGround() {
      if (this instanceof ThrowableObject) {
          return true;
      } else {
          return this.y < 180;
      }
  }

  /**
   * Detects collision with another movable object.
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
   * Increases the coin count when a coin is collected.
   */
  collectCoin() {
      this.amountOfCoins += 10;
      if (this.amountOfCoins > 100) {
          this.amountOfCoins = 100;
      }
  }

  /**
   * Reduces energy when hit. Stores timestamp of last hit.
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
   * Checks if the object was recently hit.
   */
  isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      return timepassed < 500;
  }

  /**
   * Checks if the object has no energy left.
   */
  isDead() {
      return this.energy == 0;
  }

  /**
   * Cycles through an array of images for animation.
   */
  playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
  }

  /**
   * Plays an animation sequence once over the given duration.
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
   * Moves the object to the right.
   */
  moveRight() {
      this.x += this.speed;
      this.lastActionTime = new Date().getTime();
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
      this.x -= this.speed;
      this.lastActionTime = new Date().getTime();
  }

  /**
   * Triggers the death of an enemy the object jumps on.
   */
  jumpOn(enemy) {
      enemy.die();
  }

  /**
   * Moves the object automatically in a pattern between x boundaries.
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
