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
 * Initializes the Endbossbar by loading images, setting its position at (500, 430), 
 * and setting its dimensions to 200x50. The initial percentage is set to 100.
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
     * Sets the percentage of the Endbossbar to the given value.
     * The image of the Endbossbar is then updated to the corresponding image
     * in the IMAGES array based on the given percentage.
     * @param {number} percentage - The percentage of the Endbossbar to set. Must be between 0 and 100.
     */
    setPercantage(percentage) {
        this.percentage = Math.max(0, percentage);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves and returns the index of the image corresponding to the current
     * percentage value.
     * 
     * The index is determined based on predefined percentage thresholds:
     * - 100% returns index 5
     * - >60% returns index 4
     * - >40% returns index 3
     * - >20% returns index 2
     * - >0% returns index 1
     * - 0% returns index 0
     * 
     * @returns {number} The index of the image to display based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 61) {
            return 4;
        } else if (this.percentage >= 41) {
            return 3;
        } else if (this.percentage >= 21) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}