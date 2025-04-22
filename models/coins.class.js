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
     * Creates a coin object at the given x and y position.
     * Loads animation frames and starts animation.
     * 
     * @param {number} x - Horizontal position of the coin.
     * @param {number} y - Vertical position of the coin.
     */
    constructor(x, y) {
        super().loadImage("img/img/8_coin/coin_2.png");
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts coin animation by toggling between images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}
