import { FoodItem } from "./Foods";

export class StoreInventory {
  constructor(public items: FoodItem[]) {}

  public updateFullInventory(): FoodItem[] {
    for (const item of this.items) {
      this.updateFoodItem(item);
    }

    return this.items;
  }

  private updateFoodItem(item: FoodItem): void {
    if (item.doesItemImproveWithAge()) {
      item.increaseQuality();
    }
    if (item.getSellInDaysValue() <= 0 && !item.isItemNonPerishable()) {
      item.decreaseQuality(2);
    } else if (
      !item.doesItemImproveWithAge() &&
      !item.isItemNonPerishable() &&
      !item.isItemOrganic()
    ) {
      item.decreaseQuality();
    }
    if (item.isItemOrganic()) {
      item.decreaseQuality(2);
    }
    if (!item.isItemNonPerishable()) {
      /* food is perishable, so decrement sellIn value */
      item.decrementSellIn();
    }
  }
}
