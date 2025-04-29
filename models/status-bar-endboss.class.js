class Endbossbar extends DrawableObject {

    IMAGES = [
        "img/img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    percentage = 100;

    /**
     * Initializes the end boss bar with default position, size, and full health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 10;
        this.height = 50;
        this.width = 200;
        this.setPercantage(100);
    }

    /**
     * Updates the health bar's percentage and changes the displayed image.
     * Ensures the percentage does not drop below 0.
     */
    setPercantage(percentage) {
        this.percentage = Math.max(0, percentage);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index to display based on current health percentage.
     */
    setPercantage(percentage) {
        this.percentage = percentage;
        let index = resolveImageIndex(this.percentage); // 👈 Kein this.resolveImageIndex()
        let path = this.IMAGES[index];
        this.img = this.imageCache[path];
      }
}
