class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new Bottlebar();
    coinBar = new Coinbar();
    endbossBar = new Endbossbar();
    throwableObjects = [];
    coins_sound = new Audio('audio/coins.mp3');
    bottle_sound = new Audio("audio/bottle.mp3");
    hurt_sound = new Audio("audio/hurt.mp3");
    win_music = new Audio("audio/winmusic.mp3")
    gameOver = false;
  
    /**
     * Initializes the world by setting up the keyboard control, retrieving the canvas
     * element, creating a new World instance, setting up the background music, and
     * starting the music if sound is not muted.
     *
     * @param {HTMLCanvasElement} canvas - The HTML canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard controller to control the player.
     */
    constructor(canvas, keyboard) {
      this.keyboard = keyboard;
      if (canvas != null) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.setWorld();
        this.draw();
        this.run();
      }
    }
  
    /**
     * Sets the world of the character to this world.
     * 
     * This method is used to set the world of the character after the world has been
     * created.
     */
    setWorld() {
      this.character.world = this;
    }
  
    /**
     * Runs the game by calling the following methods every 200ms:
     * 
     * - checkCollisions()
     * - collectingCoins()
     * - collectingBottles()
     * - checkThrowObjects()
     * - checkEndbossHealth()
     * - winScreen()
     * 
     * This method is used to check for collisions between the character and enemies,
     * to check if the character has collected any coins or bottles, to check if the
     * character has thrown any objects, to check if the endboss is dead, and to check
     * if the game is won.
     */
    run() {
      setInterval(() => {
        this.checkCollisions();
        this.collectingCoins();
        this.collectingBottles();
        this.checkThrowObjects();
        this.checkEndbossHealth();
        this.winScreen();
      }, 50);
    }
  
    /**
     * Checks the health of the endboss and updates the health bar accordingly.
     * 
     * This method finds the endboss in the level and if it exists, it checks if its
     * energy is greater than 0. If it is, the health bar is updated to reflect the
     * endboss's current energy. If the energy is 0, the health bar is set to 0.
     * 
     * This method is used to update the health bar of the endboss during the game.
     */
    checkEndbossHealth() {
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      if (endboss) {
        if (endboss.energy > 0) {
          this.endbossBar.setPercantage(endboss.energy);
        } else {
          this.endbossBar.setPercantage(0);
        }
      }
    }
  
    /**
     * Checks if the 'D' key is pressed and handles the throwing of bottles.
     * 
     * If the 'D' key is pressed and the character has bottles, it creates a new
     * ThrowableObject and adds it to the throwableObjects array, then decreases
     * the character's bottle count and updates the bottle bar percentage.
     * If the character has no bottles, it shakes the bottle bar.
     */
    checkThrowObjects() {
      if (this.keyboard.D && !this.hasThrown) {
        if (this.character.amountOfBottle > 0) {
          this.hasThrown = true;
          let bottle = new ThrowableObject(
            this.character.x + 100,
            this.character.y + 100,
            this.character
          );
          this.throwableObjects.push(bottle);
          this.character.amountOfBottle--;
          this.bottleBar.setPercantage((this.character.amountOfBottle / 5) * 100);
        } else {
          this.hasThrown = true;
          this.bottleBar.shake();
        }
        setTimeout(() => {
          this.hasThrown = false;
        }, 1000);
      }
    }
  
    /**
     * Checks for collisions between the character and enemies, and between bottles and enemies.
     * 
     * This method calls two other methods to check for collisions. The first method checks for
     * collisions between the character and enemies, and if a collision is detected, the enemy
     * is killed. The second method checks for collisions between bottles and enemies, and if a
     * collision is detected, the enemy is killed. If the enemy is the Endboss, the level is
     * finished and the game is won.
     */
    checkCollisions() {
      this.checkCharacterEnemyCollisions();
      this.checkBottleEnemyCollisions();
    }
  
    /**
     * Checks for collisions between the character and enemies.
     * 
     * This method loops through all enemies in the level and checks if the character
     * is colliding with them. If the character is jumping and colliding with an enemy, the
     * enemy is killed and set to be splicable. If the character is not jumping and colliding
     * with an enemy, the character takes damage. Finally, all splicable enemies are removed
     * from the level.
     */
    checkCharacterEnemyCollisions() {
      this.level.enemies.forEach((enemy) => {
        if (this.characterJumpToKill(enemy)) {
            if(enemy instanceof Chicken || enemy instanceof Chick){
            enemy.die();
            setTimeout(() => {
              enemy.isSplicable = true;
            }, 1000);
          }
        } else if (this.characterCollidingWithEnemies(enemy) && !enemy.isDead) {
          this.characterGetsHurt();
        }
      });
      this.level.enemies = this.level.enemies.filter(enemy => !enemy.isSplicable);
    }
  
    /**
     * Determines if the character can jump on and kill an enemy.
     * 
     * This method checks if the character is colliding with an enemy and is above the ground.
     * If both conditions are true, it indicates that the character can jump on the enemy to kill it.
     * 
     * @param {Enemy} enemy - The enemy object to check collision with.
     * @returns {boolean} - True if the character can jump on and kill the enemy, false otherwise.
     */
    characterJumpToKill(enemy) {
      return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }
  
    /**
     * Checks for collisions between bottles and enemies.
     * 
     * This method loops through all bottles and enemies in the level and checks if a bottle
     * is colliding with an enemy. If the bottle is colliding with an enemy, the enemy
     * takes damage. If the enemy is the Endboss, the level's Endboss status bar is
     * updated. Finally, all splicable bottles are removed from the level.
     */
    checkBottleEnemyCollisions() {
      this.throwableObjects.forEach((bottle, i) => {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
            if (!bottle.collidedWith[enemy.id]) {
              bottle.splash(enemy);
              enemy.takeDamage(20);
              if (enemy instanceof Endboss) {
                this.endbossBar.setPercantage(enemy.energy);
              }
            }
          }
        });
        if (bottle.isSplicable) {
          this.throwableObjects.splice(i, 1);
        }
      });
    }
  
  
    /**
     * Checks if the character is colliding with an enemy.
     * 
     * This method takes an enemy object as a parameter and checks if the character is
     * colliding with it. If the character is colliding with the enemy, the method returns
     * true. Otherwise, it returns false.
     * 
     * @param {Enemy} enemy - The enemy object to check collision with.
     * @returns {boolean} - True if the character is colliding with the enemy, false otherwise.
     */
    characterCollidingWithEnemies(enemy) {
      return this.character.isColliding(enemy);
    }
  
    /**
     * Reduces the character's energy by 5 and updates the last hit timestamp.
     * 
     * This method plays the hurt sound and updates the status bar with the character's
     * new energy percentage.
     */
    characterGetsHurt() {
      this.character.hit();
      this.hurt_sound.play();
      this.statusBar.setPercantage(this.character.energy);
    }
  
    /**
     * Renders the game world onto the canvas.
     * 
     * This method clears the canvas and redraws all game elements, including background objects,
     * clouds, status bars, character, coins, bottles, enemies, and throwable objects. It uses
     * the camera position to translate the view, ensuring the camera follows the character.
     * The method also continuously calls itself using `requestAnimationFrame` for smooth animation.
     * 
     * If the game is over, the rendering process stops.
     */
    draw() {
      if (this.gameOver) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBar);
      this.addToMap(this.bottleBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.endbossBar);
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  
    /**
     * Adds multiple objects to the map.
     * 
     * This method takes an array of objects and calls `addToMap` on each of them.
     * It is used to add multiple objects of the same type to the map at once.
     * 
     * @param {Array<MovableObject>} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
      objects.forEach((o) => {
        this.addToMap(o);
      });
    }
  
    /**
     * Adds a single object to the map.
     * 
     * This method renders the provided object onto the canvas by calling its
     * `draw` method. If the object is flipped, this method flips the canvas
     * horizontally using `flipImage` and `flipImageBack` to ensure the object
     * is rendered correctly.
     * 
     * @param {MovableObject} mo - The object to add to the map.
     */
    addToMap(mo) {
      if (mo.otherDirection) {
        this.flipImage(mo);
      }
      mo.draw(this.ctx);
      if (mo.otherDirection) {
        this.flipImageBack(mo);
      }
    }
  
    /**
     * Flips the given object's image horizontally on the canvas.
     * 
     * This method saves the current canvas context state, translates the context by the object's width,
     * and scales the context horizontally by -1 to flip the image. The object's x-coordinate is also
     * negated to adjust its position after flipping.
     * 
     * @param {MovableObject} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  
    /**
     * Restores the canvas context state to its original state before flipping the image.
     * This method is the counterpart of `flipImage` and is used to restore the original
     * state of the canvas context after an object's image has been flipped.
     * 
     * @param {MovableObject} mo - The object whose image is to be restored.
     */
    flipImageBack(mo) {
      this.ctx.restore();
      mo.x = mo.x * -1;
    }
  
    /**
     * Checks if the character is colliding with any coin in the level.
     * If a collision is detected, the character collects the coin, the coin is removed
     * from the level, and the coin bar is updated to reflect the new score.
     */
    collectingCoins() {
      this.level.coins.forEach((coin, i) => {
        if (this.character.isColliding(coin)) {
          this.character.collectCoin();
          this.coins_sound.play();
          this.level.coins.splice(i, 1);
          this.coinBar.setPercantage(this.character.amountOfCoins);
        }
      });
    }
  
    /**
     * Checks if the character is colliding with any bottle in the level.
     * If a collision is detected, the character collects the bottle, the bottle is removed
     * from the level, and the bottle bar is updated to reflect the new amount of bottles.
     */
    collectingBottles() {
      this.level.bottles.forEach((bottle, i) => {
        if (this.character.amountOfBottle < 5 && this.character.isColliding(bottle)) {
          this.character.amountOfBottle++;
          this.bottle_sound.play();
          this.level.bottles.splice(i, 1);
          let percentage = this.character.amountOfBottle * 20;
          this.bottleBar.setPercantage(percentage);
        }
      });
    }
  
    /**
     * Checks if the character has won the game by killing the Endboss.
     * If the Endboss is dead, the win music is played and the win screen is displayed after a delay of 1500 milliseconds.
     * @returns {void}
     */
    winScreen() {
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      if (endboss && endboss.energy === 0) {
        this.win_music.play();
  
        setTimeout(() => {
          winScreen();
        }, 1500);
      }
    }
  }