import { FoodItem } from "./Foods";
import {
  FoodItemStrategy,
  NonPerishableFoodItemStrategy,
  OrganicFoodItemStrategy,
  PerishableFoodItemStrategy,
} from "./foodItem.strategies";

export class StoreInventory {
  constructor(public items: FoodItem[]) {}

  public updateFullInventory(): FoodItem[] {
    for (const item of this.items) {
      this.updateFoodItem(item);
    }

    return this.items;
  }

  private updateFoodItem(item: FoodItem): void {
    let strategy: FoodItemStrategy;
    if (item.isItemNonPerishable()) {
      strategy = new NonPerishableFoodItemStrategy();
    } else if (item.isItemOrganic()) {
      strategy = new OrganicFoodItemStrategy();
    } else {
      strategy = new PerishableFoodItemStrategy();
    }
    strategy.update(item);
  }
}
