/**
 * Classes
 */

type FoodItemName =
  | "Cheddar Cheese"
  | "Instant Ramen"
  | "Apple"
  | "Banana"
  | "Strawberry"
  | "Organic Avocado";

export class FoodItem {
  constructor(
    public name: FoodItemName,
    private sellIn: number,
    /**
     * `quality` must be between 0 and 25, and decreases twice as fast when `sellIn` date is less than 0
     */
    private quality: number,
    public isNonPerishable: boolean = false,
    public improvesWithAge: boolean = false
  ) {}
  public increaseQuality() {
    if (this.quality < 25) {
      /* quality cannot be greater than 25 */
      this.quality++;
    }
  }
  public decreaseQuality() {
    if (this.quality > 0) {
      /* quality cannot be negative */
      this.quality--;
    }
  }
  public decrementSellIn() {
    if (this.sellIn > -5) {
      this.sellIn--;
    }
  }
  public getSellInDaysValue() {
    return this.sellIn;
  }
  public getQualityValue() {
    return this.quality;
  }
}

export class StoreInventory {
  constructor(public items: FoodItem[]) {}

  updateFullInventory() {
    for (const item of this.items) {
      this.updateFoodItem(item);
    }

    return this.items;
  }

  private updateFoodItem(item: FoodItem) {
    if (item.improvesWithAge) {
      item.increaseQuality();
    } else if (!item.improvesWithAge && !item.isNonPerishable) {
      item.decreaseQuality();
    }
    if (!item.isNonPerishable) {
      /* food is perishable, so decrement sellIn value */
      item.decrementSellIn();
    }
  }
}

/**
 * Implementation
 */

const items = [
  new FoodItem("Apple", 10, 10),
  new FoodItem("Banana", 7, 9),
  new FoodItem("Strawberry", 5, 10),
  new FoodItem("Cheddar Cheese", 10, 16, false, true),
  new FoodItem("Instant Ramen", 0, 5, true),
  // this Organic item does not work properly yet
  new FoodItem("Organic Avocado", 5, 16),
];

const storeInventory = new StoreInventory(items);

const DAYS_TO_RUN_REPORT = 2;

for (let i = 0; i < DAYS_TO_RUN_REPORT; i++) {
  console.log("Day " + i + "  ---------------------------------");
  console.log("                  name      sellIn quality");
  const data = items.map((element) => {
    return [
      element.name,
      element.getSellInDaysValue(),
      element.getQualityValue(),
    ];
  });
  console.table(data);

  console.log();
  storeInventory.updateFullInventory();
}
