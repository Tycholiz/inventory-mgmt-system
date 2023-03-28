"use strict";
/**
 * Classes
 */

class FoodItem {
  name: string;
  sellIn: number;
  quality: number;
  size?: boolean;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class StoreInventory {
  items: FoodItem[];

  constructor(items = [] as FoodItem[]) {
    this.items = items;
  }

  updateFoodItemQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Cheddar Cheese") {
        // if (this.items[i].sellIn < 3) { # Summer sale promotion
        //     this.items[i].onSale = true;
        // }
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Instant Ramen") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        // if (this.items[i].sellIn < 3) { # Summer sale promotion
        //     this.items[i].onSale = true;
        // }
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
      if (this.items[i].name != "Instant Ramen") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Cheddar Cheese") {
          this.items[i].quality = this.items[i].quality - this.items[i].quality;
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

/**
 * Implementation
 */

let items = [
  new FoodItem("Apple", 10, 10),
  new FoodItem("Banana", 7, 9),
  new FoodItem("Strawberry", 5, 10),
  new FoodItem("Cheddar Cheese", 10, 16),
  new FoodItem("Instant Ramen", 0, 5),
  // this Organic item does not work properly yet
  new FoodItem("Organic Avocado", 5, 16),
];

let storeInventory = new StoreInventory(items);

let days = 10;

for (let i = 0; i < days; i++) {
  console.log("Day " + i + "  ---------------------------------");
  console.log("                  name      sellIn quality");
  let data = items.map((element) => {
    return [element.name, element.sellIn, element.quality];
  });
  console.table(data);

  console.log();
  storeInventory.updateFoodItemQuality();
}

/**
 * Unit Tests
 */
// let chai = require("chai");
let sinon = require("sinon");
let sinonChai = require("sinon-chai");
let expect = chai.expect;

chai.should();
chai.use(sinonChai);

try {
  let testItems = [new FoodItem("test", 10, 10)];
  let testInventory = new StoreInventory(testItems);

  // Decreases quality
  testInventory.updateFoodItemQuality();
  expect(testItems[0].sellIn).to.equal(9);

  console.log(`✅ Tests passed!`);
} catch (e) {
  console.warn(`❌ Tests failed`);
  console.error(e);
}
