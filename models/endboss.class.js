class Endboss extends MovableObject {
  height = 375;
  width = 250;
  y = 80;
  energy = 100;
  boss_sound = new Audio("audio/boss.mp3");
  boss_alarm = new Audio("audio/bossalarm.mp3");
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
   * Creates the Endboss object, loads images and starts movement + animation.
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
   * Reduces the boss's energy and saves timestamp of last hit.
   * @param {number} amount - The amount of damage to apply.
   */
  takeDamage(amount) {
      this.energy = Math.max(0, this.energy - amount);
      this.lastHit = new Date().getTime();
  }

  /**
   * Starts moving the boss left and animating walking.
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
   * Handles behavior depending on energy level or state (hurt/dead).
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

  /**
   * Plays the hurt animation and sound effect once, then resumes walking.
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
   * Plays the death animation and removes the boss after delay.
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
   * Plays alert animation when energy is low and increases speed.
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
   * Plays the attack animation when energy is critical and charges forward.
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
