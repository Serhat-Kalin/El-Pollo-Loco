class Chick extends MovableObject {
    y = 395;
    width = 40;
    height = 40;
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
     * Creates a small chick enemy, randomly places it, sets speed,
     * loads animations and starts its movement.
     */
    constructor() {
        super().loadImage("img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 500;
        this.speed = 0.8 * Math.random() * 0.5;
        this.move();
        this.animate();
        this.isDead = false;
    }

    /**
     * Switches between walking and dead animations based on chick's state.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }

    /**
     * Reduces health by given amount and checks if chick should die.
     * @param {number} amount - How much health to subtract.
     */
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health === 0) {
            this.die();
        }
    }

    /**
     * Handles chick's death logic: stops it, plays sound,
     * shows dead image and removes it after delay.
     */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        this.chick_sound.play();
        this.img = this.imageCache[this.IMAGES_DEAD[0]];

        setTimeout(() => {
            this.y = -1000; // move it off screen
        }, 1000);
    }
}
