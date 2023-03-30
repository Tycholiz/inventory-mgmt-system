import { expect } from "chai";
import { Apple, CheddarCheese } from "./Foods";
import { MAX_QUALITY_VALUE, MIN_SELL_IN_VALUE } from "./constants";

describe("FoodItem", () => {
  it("should increase quality by 1 if quality is less than max value allowed", () => {
    const apple1 = new Apple();
    const originalQuality = apple1.getQualityValue();
    apple1.increaseQuality();
    expect(apple1.getQualityValue()).to.equal(originalQuality + 1);
  });
  it("should NOT increase quality if its value is at or above max value allowed", () => {
    const cheese1 = new CheddarCheese();

    /* increase the quality until we reach the max value, then attempt to increase it once more */
    do {
      cheese1.increaseQuality();
    } while (cheese1.getQualityValue() < MAX_QUALITY_VALUE);
    cheese1.increaseQuality();

    expect(cheese1.getQualityValue()).to.equal(MAX_QUALITY_VALUE);
  });
  it("should NOT decrease quality if its value is at 0", () => {
    const apple1 = new Apple();
    const originalQuality = apple1.getQualityValue();

    /* degrade the food fully */
    apple1.decreaseQuality(originalQuality);
    expect(apple1.getQualityValue()).to.equal(0);
  });
  it("should decrease quality of the item by the passed in multiplier", () => {
    const apple1 = new Apple();
    const originalQuality = apple1.getQualityValue();

    apple1.decreaseQuality(2);
    expect(apple1.getQualityValue()).to.equal(originalQuality - 2);
  });
  it("should decrease sellIn value of the item if it is above the minimum sellIn value allowed", () => {
    const apple1 = new Apple();
    const originalSellIn = apple1.getSellInDaysValue();
    apple1.decrementSellIn();

    expect(apple1.getSellInDaysValue()).to.be.above(MIN_SELL_IN_VALUE);
    expect(apple1.getSellInDaysValue()).to.equal(originalSellIn - 1);
  });
  it("should NOT decrease sellIn value of the item if it is at the minimum sellIn value allowed", () => {
    const apple1 = new Apple();

    /* decrease the sellIn value until we reach the min value, then attempt to decrease it once more */
    do {
      apple1.decrementSellIn();
    } while (apple1.getSellInDaysValue() > MIN_SELL_IN_VALUE);
    apple1.decrementSellIn();

    expect(apple1.getSellInDaysValue()).to.equal(MIN_SELL_IN_VALUE);
  });
});
