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
   * Initializes the status bar with default position, size, and full health.
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
   * Updates the health bar to reflect the given percentage of health.
   * Loads the appropriate image based on current health.
   */


  /**
   * Resolves which image to show depending on the current percentage.
   */
  setPercantage(percentage) {
    this.percentage = percentage;
    let index = resolveImageIndex(this.percentage); // 👈 Kein this.resolveImageIndex()
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }
}
