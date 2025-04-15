class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2900;
  
    /**
     * Initializes a new Level.
     *
     * @param {Array} enemies
     * @param {Array} clouds
     * @param {Array} backgroundObjects
     * @param {Array} coins
     * @param {Array} bottles
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
    }
  }
  
  