class StatusBar extends DrawableObject {
    IMAGES = [
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
      "img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];
  
    percentage = 100;
  
    /**
     * Creates a new StatusBar object.
     * 
     * @description Initializes the StatusBar with health bar images, sets
     * the x and y position to the top left of the screen, and sets the
     * percentage to 100, which represents the maximum health.
     * 
     * @param {none}
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 10;
      this.y = 1;
      this.height = 50;
      this.width = 200;
      this.setPercantage(100);
    }
  
    /**
     * Sets the percentage value and updates the corresponding image.
     * 
     * @param {number} percentage - The new percentage value to set.
     * 
     * This method updates the `percentage` property with the given value and 
     * changes the displayed image based on the resolved image index from the 
     * `IMAGES` array and the `imageCache`.
     */
    setPercantage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Resolves and returns the index of the image corresponding to the current
     * percentage value.
     * 
     * The index is determined based on predefined percentage thresholds:
     * - 100% returns index 5
     * - >80% returns index 4
     * - >60% returns index 3
     * - >40% returns index 2
     * - >20% returns index 1
     * - ≤20% returns index 0
     *
     * @returns {number} The index of the image to display based on the percentage.
     */
    resolveImageIndex() {
      if (this.percentage > 80) {
        return 5;
      } else if (this.percentage > 60) {
        return 4;
      } else if (this.percentage > 40) {
        return 3;
      } else if (this.percentage > 20) {
        return 2;
      } else if (this.percentage > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  
  }
  