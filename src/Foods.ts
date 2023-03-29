export class FoodItem {
  constructor(
    private name: string,
    /**
     * indicates the remaining number of days that remain before a food item
     * starts to degrade quality at double speed. When value reaches -5, it must
     * be discarded.
     */
    private sellIn: number,
    /** `quality` must be between 0 and 25, and decreases twice as fast when `sellIn` date is less than 0. Value must be between 0 and 25, inclusive. */
    private quality: number,
    /** indicates a food that retains its quality over time and does not have a `sellIn` date. */
    private nonPerishable: boolean = false,
    /** indicates a food that retains its quality over time */
    private improvesWithAge: boolean = false
  ) {}
  public increaseQuality() {
    if (this.quality < 25) {
      /* quality cannot be greater than 25 */
      this.quality++;
    }
  }
  public decreaseQuality(rate: number = 1) {
    if (this.quality > 0) {
      /* quality cannot be negative */
      this.quality = this.quality - rate;
    }
  }
  public decrementSellIn() {
    if (this.sellIn > -5) {
      /* quality cannot be less than 5 */
      this.sellIn--;
    }
  }
  public getName() {
    return this.name;
  }
  public getSellInDaysValue() {
    return this.sellIn;
  }
  public getQualityValue() {
    return this.quality;
  }
  public isItemNonPerishable() {
    return this.nonPerishable;
  }
  public doesItemImproveWithAge() {
    return this.improvesWithAge;
  }
}

export class Apple extends FoodItem {
  constructor() {
    super("Apple", 10, 10);
  }
}

export class Banana extends FoodItem {
  constructor() {
    super("Banana", 7, 9);
  }
}

export class Strawberry extends FoodItem {
  constructor() {
    super("Strawberry", 5, 10);
  }
}

export class CheddarCheese extends FoodItem {
  constructor() {
    super("Cheddar Cheese", 10, 16, false, true);
  }
}

export class InstantRamen extends FoodItem {
  constructor() {
    super("Instant Ramen", 0, 5, true);
  }
}
