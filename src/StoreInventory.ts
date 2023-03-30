import { FoodItem } from "./Foods";
import {
  FoodItemStrategy,
  NonPerishableFoodItemStrategy,
  OrganicFoodItemStrategy,
  PerishableFoodItemStrategy,
} from "./foodItem.strategies";
import { UUID } from "crypto";

export class StoreInventory {
  constructor(public items: FoodItem[]) {}

  public updateFullInventory(): FoodItem[] {
    for (const item of this.items) {
      this.updateFoodItem(item);
      if (item.isSpoiled()) {
        this.removeItemFromInventory(item.id);
      }
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

  private removeItemFromInventory(itemId: UUID) {
    this.items.forEach((item, index) => {
      if (item.id === itemId) this.items.splice(index, 1);
    });
  }
}
