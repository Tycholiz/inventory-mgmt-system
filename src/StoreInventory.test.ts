import { expect } from "chai";
import { SinonStub, stub } from "sinon";

import { StoreInventory } from "./StoreInventory";
import {
  Apple,
  CheddarCheese,
  Banana,
  Strawberry,
  InstantRamen,
} from "./Foods";

describe("StoreInventory", () => {
  describe("updateFullInventory", () => {
    it("should call updateFoodItem for each item in the inventory", () => {
      const foodItems = [new Apple(), new Banana(), new Strawberry()];
      const storeInventory = new StoreInventory(foodItems);
      const updateFoodItemStub: SinonStub<any[], any> = stub(
        storeInventory as any,
        "updateFoodItem"
      );

      storeInventory.updateFullInventory();
      expect(updateFoodItemStub.callCount).to.equal(foodItems.length);
      updateFoodItemStub.restore();
    });

    it("should return the updated inventory", () => {
      const foodItems = [new Apple(), new Banana(), new Strawberry()];
      const storeInventory = new StoreInventory(foodItems);
      const result = storeInventory.updateFullInventory();

      expect(result).to.deep.equal(foodItems);
    });

    it("should decrease quality and sellIn for perishable items that do not improve with age", () => {
      // create a new food item that does not improve with age and is perishable
      const apple1 = new Apple();
      const originalQuality = apple1.getQualityValue();
      const originalSellIn = apple1.getSellInDaysValue();
      const storeInventory = new StoreInventory([apple1]);

      storeInventory.updateFullInventory();

      // assert that the quality decreased by 1; apples default to 10
      expect(apple1.getQualityValue()).to.equal(originalQuality - 1);

      // assert that the sellIn decreased by 1; apples default to 10
      expect(apple1.getSellInDaysValue()).to.equal(originalSellIn - 1);
    });

    it("should increase quality for items that improve with age", () => {
      // create a new food item that improves with age
      const cheddarCheese1 = new CheddarCheese();
      const originalQuality = cheddarCheese1.getQualityValue();
      const storeInventory = new StoreInventory([cheddarCheese1]);

      storeInventory.updateFullInventory();

      // assert that the quality increased by 1; cheddarCheese defaults at 16
      expect(cheddarCheese1.getQualityValue()).to.equal(originalQuality + 1);
    });

    it("should not decrease quality nor sellIn value for items that are non-perishable", () => {
      // create a new food item that is non-perishable
      const ramen1 = new InstantRamen();
      const originalQuality = ramen1.getQualityValue();
      const storeInventory = new StoreInventory([ramen1]);

      storeInventory.updateFullInventory();

      // assert that the quality did not decrease; instant ramen defaults at 5
      expect(ramen1.getQualityValue()).to.equal(originalQuality);
      expect(ramen1.getSellInDaysValue()).to.equal(0);
    });
  });
});
