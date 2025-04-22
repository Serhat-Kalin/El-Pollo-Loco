class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;

  height = 150;
  width = 100;

  /**
   * Loads a single image and assigns it to this object.
   * 
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
      this.img = new Image(); 
      this.img.src = path;
  }

  /**
   * Draws the object on the canvas context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images and stores them in the image cache.
   * 
   * @param {string[]} arr - Array of image file paths.
   */
  loadImages(arr) {
      arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
      });
  }
}
