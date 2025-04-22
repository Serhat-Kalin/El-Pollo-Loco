class Bottlebar extends DrawableObject {
  emptyBottleSound = new Audio("audio/emptybottle.mp3");

  IMAGES = [
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 0;

  /**
   * Initializes the bottle bar with images and position.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 45;
    this.height = 50;
    this.width = 200;
    this.setPercantage(0);
  }

  /**
   * Creates a short left-right shake animation with sound.
   */
  shake() {
    const originalX = this.x;
    let offset = 10;
    this.emptyBottleSound.play();
    setTimeout(() => { this.x = originalX - offset; }, 100);
    setTimeout(() => { this.x = originalX + offset; }, 200);
    setTimeout(() => { this.x = originalX; }, 300);
  }

  /**
   * Updates the bottle bar to reflect the given percentage.
   */
  setPercantage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to display based on percentage.
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
