import { FoodItem } from "./Foods";

export interface FoodItemStrategy {
  update(item: FoodItem): void;
}

export class PerishableFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    if (item.doesItemImproveWithAge()) {
      item.increaseQuality();
    } else if (item.isNoLongerFresh()) {
      item.decreaseQuality(2);
    } else {
      item.decreaseQuality();
    }
  }
}

export class OrganicFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    if (item.isNoLongerFresh()) {
      item.decreaseQuality(4);
    } else {
      item.decreaseQuality(2);
    }
  }
}

export class NonPerishableFoodItemStrategy implements FoodItemStrategy {
  update(item: FoodItem): void {
    // no-op
  }
}
