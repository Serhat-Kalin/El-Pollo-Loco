class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
  
    height = 150;
    width = 100;
  
    /**
     * Loads an image from the given path into the `img` property.
     * @param {string} path - URL of the image to load.
     */
    loadImage(path) {
      this.img = new Image(); 
      this.img.src = path;
    }
  
    /**
     * Draws the object onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The context to draw onto.
     */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * Loads an array of image paths into the `imageCache` property. Each image is
     * stored under the path as the key.
     * @param {string[]} arr - Array of image paths to load.
     */
  
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  }
  