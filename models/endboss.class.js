class Endboss extends MovableObject {
    height = 375;
    width = 250;
    y = 80;
    energy = 100;
    boss_sound = new Audio("audio/boss.mp3");
    boss_alarm = new Audio("audio/bossalarm.mp3")
    moveleftInt;
    playAniInt;
    animateInt;
  
    IMAGES_WALKING = [
      "img/img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
  
    IMAGES_ALERT = [
      "img/img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
  
    IMAGES_ATTACK = [
      "img/img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
  
    IMAGES_HURT = [
      "img/img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];
  
    IMAGES_DEAD = [
      "img/img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];
  
    offset = {
      top: 20,
      bottom: 40,
      left: 30,
      right: 30
    };
  
    /**
     * Constructor for the Endboss class
     * @description Initializes the Endboss by loading its images, setting its initial position, and setting its initial state to walking left.
     * @param {none}
     */
    constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 2600;
      this.id = "endboss";
      this.energy = 100;
      this.speed = 6;
      this.walkLeft();
      this.animate();
      this.isDead = false;
    }
  
  /**
   * Reduces the energy of the Endboss by the specified amount and logs the damage taken.
   * 
   * This method decreases the Endboss's energy by the given amount, ensuring it doesn't go below zero.
   * It also updates the timestamp of the last hit received.
   * 
   * @param {number} amount - The amount of damage to inflict on the Endboss.
   */
    takeDamage(amount) {
      this.energy = Math.max(0, this.energy - amount);
      this.lastHit = new Date().getTime();
    }
  
    /**
     * Sets the Endboss to walk to the left.
     * 
     * This method stops any previous movement and animation, and then sets the Endboss to move to the left every 200 milliseconds.
     * It also animates the Endboss's walking animation every 200 milliseconds, unless the Endboss is dead.
     * 
     * @param {none}
     */
    walkLeft() {
      if (this.moveleftInt) clearInterval(this.moveleftInt);
      if (this.playAniInt) clearInterval(this.playAniInt);
      this.moveleftInt = setInterval(() => {
        this.moveLeft();
      }, 200);
  
      this.playAniInt = setInterval(() => {
        
          this.playAnimation(this.IMAGES_WALKING);
        
      }, 200);
    }
  
  
  
    /**
     * Animates the Endboss by playing a specific animation based on its state.
     * 
     * This method plays a specific animation based on the Endboss's state. If it's dead, it plays the die animation. If it's hurt, it plays the hurt animation. If its energy is 60, it plays the alert animation. If its energy is 19, it plays the attack animation. Otherwise, it plays the walking animation.
     * 
     * @param {none}
     */
    animate() {
      this.animateInt = setInterval(() => {
        if (this.isDead === true) {
          this.playdie();
        } else if (this.isHurt()) {
          this.playHurt();
        } else if (this.energy == 60) {
          this.playAlert();
        } else if (this.energy == 19) {
          this.playAttack();
        } else {
          this.moveLeft();
        }
      }, 200);
    }
  
  //   isDead() {
  //     return this.energy == 0;
  // }
  
    /**
     * Animates the Endboss by playing the hurt animation when it is hurt.
     * 
     * This method plays the hurt animation when the Endboss is hurt, unless the hurt animation is already being played or the Endboss's energy is 60.
     * It also stops any previous movement and animation, plays the boss hurt sound, and then waits for 1.2 seconds before resuming the walking animation.
     * 
     * @param {none}
     */
    playHurt() {
      if (this.hurtAnimationPlayed || this.energy == 60) return;
      this.hurtAnimationPlayed = true;
      clearInterval(this.moveleftInt);
      clearInterval(this.playAniInt);
      this.boss_sound.play();
      this.playOnce(this.IMAGES_HURT, 1000);
      setTimeout(() => {
        this.hurtAnimationPlayed = false;
        this.walkLeft();
      }, 1200);
    }
  
  /**
   * Handles the endboss's death animation and state transition.
   * 
   * This method stops the endboss's movement by setting its speed to 0 and plays
   * the death animation. After the animation, it sets the y position to -1000 to
   * effectively remove the endboss from the visible screen and marks it as splicable
   * to indicate it's ready for removal or further processing.
   * 
   * @param {none}
   */
    playdie() {
      this.speed = 0;
      this.playOnce(this.IMAGES_DEAD, 1000);
  
      setTimeout(() => {
        this.y = -1000;
        this.isSplicable = true;
      }, 1400);
  
    }
  
    /**
     * Plays the alert animation if the Endboss's energy is 60, indicating
     * that it's about to attack.
     * 
     * This method first checks if the alert animation is already being played.
     * If not, it stops any previous movement and animation, decrements the
     * Endboss's energy by 1, plays the boss alarm sound, and plays the alert
     * animation. After the animation, it waits for 3.3 seconds before resuming
     * the walking animation.
     * 
     * @param {none}
     */
    playAlert() {
      if (this.alertActive) return;
      this.alertActive = true;
      clearInterval(this.moveleftInt);
      clearInterval(this.playAniInt);
      this.energy -= 1;
      this.speed = 18;
      this.boss_alarm.play();
      this.playOnce(this.IMAGES_ALERT, 1800);
      setTimeout(() => {
        this.alertActive = false;
        this.walkLeft();
      }, 3300);
    }
  
    /**
     * Plays the attack animation if the Endboss's energy is 20, indicating
     * that it's about to attack.
     * 
     * This method first checks if the attack animation is already being played.
     * If not, it stops any previous movement and animation, decrements the
     * Endboss's energy by 1, plays the attack animation. After the animation,
     * it waits for 3.3 seconds before resuming the walking animation.
     * 
     * @param {none}
     */
  
    playAttack() {
      if (this.alertattack) return;
      this.alertattack = true;
      clearInterval(this.moveleftInt);
      clearInterval(this.playAniInt);
      this.energy -= 1;
      this.speed = 24;
      this.playOnce(this.IMAGES_ATTACK, 2800);
      setTimeout(() => {
        this.alertattack = false;
        this.walkLeft();
      }, 3300);
    }
  }
  