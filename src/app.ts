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
    public sellIn: number,
    public quality: number,
    public isNonPerishable: boolean = false
  ) // TODO: add ageableItem as a boolean to indicate that the quality increases, rather than decreases over time
  {}
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
    switch (item.name) {
      case "Cheddar Cheese":
        this.updateCheddarCheese(item);
        break;
      case "Instant Ramen":
        this.updateInstantRamen(item);
        break;
      default:
        this.updateDefaultItem(item);
        break;
    }

    if (!item.isNonPerishable) {
      /* food is perishable, so decrement sellIn value */
      item.sellIn--;
    }
  }

  private updateCheddarCheese(item: FoodItem) {
    if (item.quality < 25) {
      item.quality++;
    }
  }

  private updateInstantRamen(item: FoodItem) {
    // This method is a no-op, since ramen doesn't decrease in quality and has no sellIn date. Therefore, we might elect to just call nothing in the main switch.
    // On the other hand, it might be good to keep this method to hook into some kind of logging system
  }

  private updateDefaultItem(item: FoodItem) {
    if (item.quality > 0) {
      item.quality--;
    }

    if (item.sellIn < 0 && item.quality > 0) {
      /* sellIn date has passed, so quality decreases twice as fast */
      item.quality--;
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
  new FoodItem("Cheddar Cheese", 10, 16),
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
    return [element.name, element.sellIn, element.quality];
  });
  console.table(data);

  console.log();
  storeInventory.updateFullInventory();
}
