import { FoodItem } from "./Foods";
import {
  FoodItemStrategy,
  NonPerishableFoodItemStrategy,
  OrganicFoodItemStrategy,
  PerishableFoodItemStrategy,
} from "./foodItem.strategies";
import { MIN_SELL_IN_VALUE } from "./constants";
import { UUID } from "crypto";

export class StoreInventory {
  constructor() {}
  private items: FoodItem[] = [];

  public addItemToInventory(foodItem: FoodItem): void {
    this.items.push(foodItem);
  }

  public addMultipleItemsToInventory(foodItems: FoodItem[]): void {
    for (const item of foodItems) {
      this.addItemToInventory(item);
    }
  }

  public getAllItems(): FoodItem[] {
    return this.items;
  }

  public updateFullInventory(): FoodItem[] {
    for (const item of this.items) {
      this.updateFoodItem(item);
      if (item.getSellInDaysValue() <= MIN_SELL_IN_VALUE) {
        /* item has sellIn value of -5, so remove it from inventory */
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

  private removeItemFromInventory(itemId: UUID): void {
    this.items.forEach((item, index) => {
      if (item.id === itemId) this.items.splice(index, 1);
    });
  }
}
