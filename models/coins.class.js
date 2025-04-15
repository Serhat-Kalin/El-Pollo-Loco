class Coin extends MovableObject {
    height = 100;
    width = 100;

    IMAGES = [
        "img/img/8_coin/coin_1.png",
        "img/img/8_coin/coin_2.png"
    ];

    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
    };

    /**
     * @description Creates a new Coin object
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     */
    constructor(x, y) {
        super().loadImage("img/img/8_coin/coin_2.png");
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * @description Animates the coin object by switching between its two images every 400 ms.
     * The animation is done by calling the playAnimation method from the MovableObject class
     * with the array of images (IMAGES) as the argument.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
} 