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

  // Status bars
  statusBar = new StatusBar();
  bottleBar = new Bottlebar();
  coinBar = new Coinbar();
  endbossBar = new Endbossbar();

  // Objects the character can throw
  throwableObjects = [];

  // Sound effects
  coins_sound = new Audio('audio/coins.mp3');
  bottle_sound = new Audio("audio/bottle.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  win_music = new Audio("audio/winmusic.mp3");

  gameOver = false;

  /**
   * Initializes the world, sets up canvas, keyboard and runs the game loop.
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
   * Assigns this world instance to the character object.
   */
  setWorld() {
      this.character.world = this;
  }

  /**
   * Starts repeated game logic checks such as collisions and collecting items.
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
   * Updates the endboss health bar based on its current energy.
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
   * Handles throwing bottles when the 'D' key is pressed.
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
   * Triggers the different collision checks.
   */
  checkCollisions() {
      this.checkCharacterEnemyCollisions();
      this.checkBottleEnemyCollisions();
  }

  /**
   * Handles collisions between the character and enemies.
   */
  checkCharacterEnemyCollisions() {
      this.level.enemies.forEach((enemy) => {
          if (this.characterJumpToKill(enemy)) {
              if (enemy instanceof Chicken || enemy instanceof Chick) {
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
   * Checks if the character is jumping on top of an enemy to kill it.
   */
  characterJumpToKill(enemy) {
      return this.character.isColliding(enemy) &&
             this.character.isAboveGround() &&
             this.character.speedY < 0;
  }

  /**
   * Handles collisions between bottles and enemies.
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
   * Checks if character is colliding with an enemy.
   */
  characterCollidingWithEnemies(enemy) {
      return this.character.isColliding(enemy);
  }

  /**
   * Reduces character health and updates the health bar.
   */
  characterGetsHurt() {
      this.character.hit();
      this.hurt_sound.play();
      this.statusBar.setPercantage(this.character.energy);
  }

  /**
   * Draws all visible elements in the game world.
   */
  draw() {
    if (this.gameOver) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

    [this.statusBar, this.bottleBar, this.coinBar, this.endbossBar].forEach(obj => this.addToMap(obj));

    this.ctx.translate(this.camera_x, 0);
    [this.character, ...this.level.coins, ...this.level.bottles, ...this.level.enemies, ...this.throwableObjects]
        .forEach(obj => this.addToMap(obj));
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
}


  /**
   * Adds multiple game objects to the canvas.
   */
  addObjectsToMap(objects) {
      objects.forEach((o) => {
          this.addToMap(o);
      });
  }

  /**
   * Adds a single object to the canvas and handles image flipping.
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
   * Flips image horizontally (used for character facing left).
   */
  flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
  }

  /**
   * Restores original image orientation.
   */
  flipImageBack(mo) {
      this.ctx.restore();
      mo.x = mo.x * -1;
  }

  /**
   * Handles collecting coins when character touches them.
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
   * Handles collecting bottles when character touches them.
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
   * Displays the win screen if the endboss is defeated.
   */
  winScreen() {
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      if (endboss && endboss.energy === 0) {
          this.win_music.play();

          setTimeout(() => {
              winScreen(); // This should point to a function to show the actual win UI
          }, 1500);
      }
  }
}
