class Character extends MovableObject {
  world;
  y = 190;
  height = 250;
  width = 140;
  speed = 8;
  isJumping = false;
  amountOfCoins = 0;
  amountOfBottle = 0;
  lastActionTime = new Date().getTime();
  pepe_snore = new Audio("audio/snore.mp3");
  loosingsound = new Audio("audio/loosing.mp3");
  walking_sound = new Audio("audio/walking.mp3");
  jump_sound = new Audio("audio/jump.mp3");



  IMAGES_WALKING = [
    "img/img/2_character_pepe/2_walk/W-21.png",
    "img/img/2_character_pepe/2_walk/W-22.png",
    "img/img/2_character_pepe/2_walk/W-23.png",
    "img/img/2_character_pepe/2_walk/W-24.png",
    "img/img/2_character_pepe/2_walk/W-25.png",
    "img/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/img/2_character_pepe/3_jump/J-31.png",
    "img/img/2_character_pepe/3_jump/J-32.png",
    "img/img/2_character_pepe/3_jump/J-33.png",
    "img/img/2_character_pepe/3_jump/J-34.png",
    "img/img/2_character_pepe/3_jump/J-35.png",
    "img/img/2_character_pepe/3_jump/J-36.png",
    "img/img/2_character_pepe/3_jump/J-37.png",
    "img/img/2_character_pepe/3_jump/J-38.png",
    "img/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/img/2_character_pepe/5_dead/D-51.png",
    "img/img/2_character_pepe/5_dead/D-52.png",
    "img/img/2_character_pepe/5_dead/D-53.png",
    "img/img/2_character_pepe/5_dead/D-54.png",
    "img/img/2_character_pepe/5_dead/D-55.png",
    "img/img/2_character_pepe/5_dead/D-56.png",
    "img/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/img/2_character_pepe/4_hurt/H-41.png",
    "img/img/2_character_pepe/4_hurt/H-42.png",
    "img/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/img/2_character_pepe/1_idle/idle/I-1.png",
    "img/img/2_character_pepe/1_idle/idle/I-2.png",
    "img/img/2_character_pepe/1_idle/idle/I-3.png",
    "img/img/2_character_pepe/1_idle/idle/I-4.png",
    "img/img/2_character_pepe/1_idle/idle/I-5.png",
    "img/img/2_character_pepe/1_idle/idle/I-6.png",
    "img/img/2_character_pepe/1_idle/idle/I-7.png",
    "img/img/2_character_pepe/1_idle/idle/I-8.png",
    "img/img/2_character_pepe/1_idle/idle/I-9.png",
    "img/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  offset = {
    top: 80,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Initializes the character with default image and loads all animation frames.
   * Applies gravity and starts idle and movement animations.
   */
  constructor() {
    super().loadImage("img/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.pepeIdleModus();
    this.pepeLongIdle();
}

  /**
   * Starts animation loops for movement and state-based animations.
   */
  animate() {
    setInterval(() => {
        this.handleMovement();
    }, 1000 / 60); // ~60 FPS

    setInterval(() => {
        this.handleAnimations();
    }, 100); // update animations
}

  /**
   * Handles character movement based on keyboard input.
   */
  handleMovement() {
    this.walking_sound.pause();
    this.handleMoveRight();
    this.handleMoveLeft();
    this.handleJump();
    this.world.camera_x = -this.x + 100;
}

  /**
   * Handles switching between animation states.
   */
  handleAnimations() {
    this.handleDeadAnimation();
    this.handleHurtAnimation();
    this.handleJumpAnimation();
    this.handleWalkingAnimation();
}

  /**
   * Moves the character to the right if possible.
   */
  handleMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.walking_sound.play();
      this.pepe_snore.pause();
      this.lastActionTime = new Date().getTime(); // <--- hinzufügen
  }
}

  /**
   * Moves the character to the left if possible.
   */
  handleMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
      this.pepe_snore.pause();
      this.lastActionTime = new Date().getTime(); // <--- hinzufügen
  }
}

  /**
   * Makes the character jump if on the ground.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.pepe_snore.pause();
        this.jump_sound.play();
    }
}

  /**
   * Plays dead animation and triggers game over.
   */
  handleDeadAnimation() {
    if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.pepeIsDead();
    }
}

  /**
   * Plays hurt animation when damaged.
   */
  handleHurtAnimation() {
    if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
    }
}

  /**
   * Plays jump animation while the character is in the air.
   */
  handleJumpAnimation() {
    if (this.isAboveGround()) {
        if (!this.isJumping) {
            this.isJumping = true;
        }
        this.playOnce(this.IMAGES_JUMPING, 1800);
    } else {
        this.isJumping = false;
    }
}

  /**
   * Plays walking animation when moving on the ground.
   */
  handleWalkingAnimation() {
    if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        this.playAnimation(this.IMAGES_WALKING);
    }
}

  /**
   * Triggers jump movement and sets state.
   */
  jump() {
    this.speedY = 30;
    this.isJumping = true;
}

  /**
   * Defeats an enemy when jumping on it.
   * @param {Enemy} enemy - The enemy to defeat.
   */
  jumpOn(enemy) {
    enemy.die();
}

  /**
   * Plays idle animation after a short period of no user input.
   */
  pepeIdleModus() {
    setInterval(() => {
        let timeSinceLastAction = new Date().getTime() - this.lastActionTime;
        if (timeSinceLastAction > 500) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }, 400);
}

  /**
   * Plays long idle (sleeping) animation after extended inactivity.
   */
  pepeLongIdle() {
    setInterval(() => {
        let timeSinceLastAction = new Date().getTime() - this.lastActionTime;
        if (timeSinceLastAction > 3000) {
            this.playAnimation(this.IMAGES_SLEEP);
            this.pepe_snore.play();
        }
    }, 400);
}

  /**
   * Increases coin counter when collecting a coin.
   * Caps at 100.
   */
  collectCoin() {
    this.amountOfCoins += 20;
    if (this.amountOfCoins > 100) {
        this.amountOfCoins = 100;
    }
}

  /**
   * Increases bottle counter when collecting a bottle.
   * Caps at 100.
   */
  collectBottle() {
    this.amountOfBottle += 1;
    if (this.amountOfBottle > 100) {
        this.amountOfBottle = 100;
    }
}

  /**
   * Handles what happens when the character dies (e.g. lose sound, game over).
   */
  pepeIsDead() {
    if (this.energy == 0) {
        this.loosingsound.play();
        setTimeout(() => {
            gameOver();
        }, 2500);
    }
}
}