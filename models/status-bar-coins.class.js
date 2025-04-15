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
   * Constructor of the Coinbar class.
   *
   * @description Sets the initial values of the object.
   * @constructor
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
   * Increases the percentage of the coinbar by 10.
   * If the percentage exceeds 100, it is capped at 100.
   * @description Increases the coinbar by 10 points.
   */
  collect() {
    this.percentage += 20;
  }

  /**
   * Sets the percentage value and updates the corresponding image.
   *
   * @description Sets the `percentage` property with the given value and
   * updates the displayed image based on the resolved image index from the
   * `IMAGES` array and the `imageCache`.
   * @param {number} percentage - The new percentage value to set.
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
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
