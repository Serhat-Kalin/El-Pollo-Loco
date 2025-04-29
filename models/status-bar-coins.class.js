class Coinbar extends DrawableObject {
  IMAGES = [
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 0;

  /**
   * Initializes the coin bar with default settings and image.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 85;
    this.height = 50;
    this.width = 200;
    this.setPercantage(0);
  }

  /**
   * Increases the coin bar percentage by 20 each time a coin is collected.
   */
  collect() {
    this.percentage += 20;
  }

  /**
   * Updates the displayed image based on the current percentage.
   */
  setPercantage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to use for the current percentage.
   */
  setPercantage(percentage) {
    this.percentage = percentage;
    let index = resolveImageIndex(this.percentage); // 👈 Kein this.resolveImageIndex()
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }
}
