import { expect } from "chai";
import { FoodItem, StoreInventory } from "./app";

describe("updateFullInventory", () => {
  it("should decrement sellIn value when the inventory is updated", () => {
    const testItems = [new FoodItem("Apple", 10, 10)];
    const testInventory = new StoreInventory(testItems);

    // Decreases quality
    testInventory.updateFullInventory();
    expect(testItems[0].sellIn).to.equal(9);
  });
});
