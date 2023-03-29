import { FoodItem } from "./Foods";

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
