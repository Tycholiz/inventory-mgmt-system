import { expect } from "chai";
import { FoodItem, StoreInventory } from "./app";

describe("add", () => {
  it("should add two numbers", () => {
    let testItems = [new FoodItem("test", 10, 10)];
    let testInventory = new StoreInventory(testItems);

    // Decreases quality
    testInventory.updateFoodItemQuality();
    expect(testItems[0].sellIn).to.equal(9);
  });
});
