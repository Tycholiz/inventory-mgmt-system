import { FoodItem } from "./Foods";

export interface FoodItemStrategy {
  update(item: FoodItem): void;
}

export class PerishableFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    if (item.doesItemImproveWithAge()) {
      item.increaseQuality();
    } else if (item.getSellInDaysValue() <= 0) {
      item.decreaseQuality(2);
    } else {
      item.decreaseQuality();
    }
    item.decrementSellIn();
  }
}

export class OrganicFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    if (item.getSellInDaysValue() <= 0) {
      item.decreaseQuality(4);
    } else {
      item.decreaseQuality(2);
    }
    item.decrementSellIn();
  }
}

export class NonPerishableFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    // no-op
  }
}
