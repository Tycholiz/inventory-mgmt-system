import { expect } from "chai";
import { SinonStub, stub } from "sinon";

import { StoreInventory } from "./StoreInventory";
import {
  Apple,
  CheddarCheese,
  Banana,
  Strawberry,
  InstantRamen,
  Avocado,
} from "./Foods";
import { FRESHNESS_TURNING_POINT, MIN_SELL_IN_VALUE } from "./constants";

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

    it("should decrease quality for perishable items that do not improve with age", () => {
      // create a new food item that does not improve with age and is perishable
      const apple1 = new Apple();
      const originalQuality = apple1.getQualityValue();
      const storeInventory = new StoreInventory([apple1]);

      storeInventory.updateFullInventory();

      // assert that the quality decreased by 1
      expect(apple1.getQualityValue()).to.equal(originalQuality - 1);
    });

    it("should increase quality for items that improve with age", () => {
      // create a new food item that improves with age
      const cheddarCheese1 = new CheddarCheese();
      const originalQuality = cheddarCheese1.getQualityValue();
      const storeInventory = new StoreInventory([cheddarCheese1]);

      storeInventory.updateFullInventory();

      // assert that the quality increased by 1
      expect(cheddarCheese1.getQualityValue()).to.equal(originalQuality + 1);
    });

    it("should not decrease quality value for items that are non-perishable", () => {
      // create a new food item that is non-perishable
      const ramen1 = new InstantRamen();
      const originalQuality = ramen1.getQualityValue();
      const storeInventory = new StoreInventory([ramen1]);

      storeInventory.updateFullInventory();

      // assert that the quality did not change
      expect(ramen1.getQualityValue()).to.equal(originalQuality);
    });

    it("should decrease the quality of an item twice as fast if the food item is organic", () => {
      // create an organic food item
      const avocado1 = new Avocado();
      const originalQuality = avocado1.getQualityValue();
      const storeInventory = new StoreInventory([avocado1]);

      storeInventory.updateFullInventory();

      // assert that the quality decreased by 2
      expect(avocado1.getQualityValue()).to.equal(originalQuality - 2);
    });

    // it("should decrease the quality of an item twice as fast if the item is no longer fresh", () => {
    //   const apple1 = new Apple();
    //   const storeInventory = new StoreInventory([apple1]);

    //   do {
    //     storeInventory.updateFullInventory();
    //     apple1.increaseQuality(); /* force increase the quality for testing purposes */
    //   } while (!apple1.isNoLongerFresh());

    //   const qualityValueWhenSellInEqualsZero = apple1.getQualityValue();
    //   /* update inventory now that apple1 is no longer fresh */
    //   storeInventory.updateFullInventory();
    //   expect(apple1.getQualityValue()).to.equal(
    //     qualityValueWhenSellInEqualsZero - 2
    //   );
    // });

    // it("should decrease the quality of an item 4x as fast if the food item is both organic and has a sellIn date at or below zero", () => {
    //   // create an organic food item
    //   const avocado1 = new Avocado();
    //   const storeInventory = new StoreInventory([avocado1]);

    //   /* decrease the sellIn value until we reach zero */
    //   do {
    //     storeInventory.updateFullInventory();
    //     avocado1.increaseQuality(); /* force increase the quality for testing purposes */
    //   } while (!avocado1.isNoLongerFresh());

    //   const qualityValueWhenSellInEqualsZero = avocado1.getQualityValue();
    //   /* update inventory now that avocado1 has a sellIn value of 0 */
    //   storeInventory.updateFullInventory();
    //   expect(avocado1.getQualityValue()).to.equal(
    //     qualityValueWhenSellInEqualsZero - 4
    //   );
    // });

    // it("should remove item from inventory if it is spoiled", () => {
    //   const apple1 = new Apple();
    //   const storeInventory = new StoreInventory([apple1]);

    //   /* decrease the sellIn value until we reach the min value, then attempt to decrease it once more */
    //   do {
    //     storeInventory.updateFullInventory();
    //     apple1.increaseQuality(); /* force increase the quality for testing purposes */
    //   } while (apple1.isSpoiled());
    //   storeInventory.updateFullInventory();
    //   expect(storeInventory.items.length).to.equal(0);
    // });
  });
});
