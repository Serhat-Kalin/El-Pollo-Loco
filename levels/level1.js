let level1;
initLevel();

/** Initializes the level with enemies, background, coins, and bottles 
 * @function initLevel
 */
function initLevel(){

  level1 = new Level(
    [new Chicken(),
     new Chick(),
     new Chicken(),
     new Chick(),
     new Chick(),
     new Chicken(),
     new Chick(),
     new Endboss()],
    
    [new Cloud()],// Single cloud object in the sky
    
    [// Layered background scenery, repeating every 719px
      new BackgroundObject("img/img/5_background/layers/air.png",-719),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png",-719),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png",-719),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png",-719),
      new BackgroundObject("img/img/5_background/layers/air.png", 0),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png",0),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png",0),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png",0),
      new BackgroundObject("img/img/5_background/layers/air.png",719),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png",719),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png",719),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png",719),
      new BackgroundObject("img/img/5_background/layers/air.png",719 * 2),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png",719 * 2),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png",719 * 2),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png",719 * 2),
      new BackgroundObject("img/img/5_background/layers/air.png",719 * 3),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png",719 * 3),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png",719 * 3),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png",719 * 3),
      new BackgroundObject("img/img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png",719 * 4),
      new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png",719 * 4),
      new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png",719 * 4),
    ],
    
    [// Coin positions
      new Coin(300, 200),
      new Coin(600, 150),
      new Coin(900, 250),
      new Coin(1200, 180),
      new Coin(1500, 220)
    ],
    
    [ // Bottle positions
      new Bottle(200, 350),
      new Bottle(500, 355),
      new Bottle(800, 357),
      new Bottle(1100, 351),
      new Bottle(1400, 350),
      new Bottle(1700, 354),
      new Bottle(1900, 355),
      new Bottle(2000, 350),
      new Bottle(2050, 352),
      new Bottle(2100, 351)
    ],
  );
  
}