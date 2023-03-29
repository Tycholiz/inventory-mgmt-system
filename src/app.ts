const DAYS_TO_RUN_REPORT = Number(process.argv[2]);
if (!DAYS_TO_RUN_REPORT)
  throw new Error(
    `
      Must indicate how many days the report will be run for \n
      e.g. yarn run-report 4
    `
  );

type FoodItemName =
  | "Cheddar Cheese"
  | "Instant Ramen"
  | "Apple"
  | "Banana"
  | "Strawberry"
  | "Organic Avocado";

export class FoodItem {
  constructor(
    private name: FoodItemName,
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
  public decreaseQuality() {
    if (this.quality > 0) {
      /* quality cannot be negative */
      this.quality--;
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

export class StoreInventory {
  constructor(public items: FoodItem[]) {}

  public updateFullInventory() {
    for (const item of this.items) {
      this.updateFoodItem(item);
    }

    return this.items;
  }

  private updateFoodItem(item: FoodItem) {
    if (item.doesItemImproveWithAge()) {
      item.increaseQuality();
    } else if (!item.doesItemImproveWithAge() && !item.isItemNonPerishable()) {
      item.decreaseQuality();
    }
    if (!item.isItemNonPerishable()) {
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

for (let i = 0; i < DAYS_TO_RUN_REPORT; i++) {
  console.log("Day " + i + "  ---------------------------------");
  console.log("                  name      sellIn quality");
  const data = items.map((element) => {
    return [
      element.getName(),
      element.getSellInDaysValue(),
      element.getQualityValue(),
    ];
  });
  console.table(data);

  console.log();
  storeInventory.updateFullInventory();
}
