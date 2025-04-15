class Chick extends MovableObject {
    y = 390;
    width = 50;
    height = 50;
    health = 20;
    chick_sound = new Audio("audio/chick.mp3");

    IMAGES_WALKING = [
        "img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    /**
     * @description Creates a Chick object and sets it to move and animate, sets random x position and speed
     * @param {none}
     */
    constructor() {
        super().loadImage("img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 500;
        this.speed = 0.8 * Math.random() * 0.5;
        this.move()
        this.animate();
        this.isDead = false;
    }

    /**
     * @description Animates the Chick by playing the walk animation if alive, dead animation if dead
     * @param {none}
     */
    animate() {
        setInterval(() => {
          if(!this.isDead){
            this.playAnimation(this.IMAGES_WALKING);
          }else {
            this.playAnimation(this.IMAGES_DEAD);
          }
        }, 200);
      }

    /**
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
     * @description Sets isDead to true, stops movement, plays die sound, changes image to dead image, and moves off screen
     * @param {none}
     */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        this.chick_sound.play();
        this.img = this.imageCache[this.IMAGES_DEAD[0]];

        setTimeout(() => {
            this.y = -1000;
        }, 1000);
    }
}