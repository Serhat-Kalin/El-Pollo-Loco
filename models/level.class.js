class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2900;
  
    /**
     * Creates a new level with the given game objects.
     * Sets up enemies, clouds, background visuals, coins, and bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
    }
  }
  
  