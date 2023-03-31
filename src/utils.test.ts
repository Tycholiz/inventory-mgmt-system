import sinon from "sinon";
import chai, { expect } from "chai";
import spies from "chai-spies";
import { StoreInventory } from "./StoreInventory";
import { printInventoryReport } from "./utils";
import {
  Apple,
  CheddarCheese,
  Banana,
  Strawberry,
  InstantRamen,
  Avocado,
} from "./Foods";

chai.use(spies);

describe("printInventoryReport", () => {
  let storeInventory: StoreInventory;
  let consoleLogSpy: sinon.SinonSpy<any, any>;

  beforeEach(() => {
    const items = [
      new Apple(),
      new Banana(),
      new Strawberry(),
      new CheddarCheese(),
      new InstantRamen(),
      new Avocado(),
    ];

    storeInventory = new StoreInventory();
    storeInventory.addMultipleItemsToInventory(items);
    consoleLogSpy = sinon.spy(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.restore();
  });

  it("should print a report for one day", () => {
    const daysToRunReport = 1;

    printInventoryReport(storeInventory, daysToRunReport);

    expect(consoleLogSpy.calledWith("Day 1  ---------------------------------"))
      .to.be.true;
  });

  it("should print a report for multiple days", () => {
    const daysToRunReport = 5;

    printInventoryReport(storeInventory, daysToRunReport);

    const consoleLogsPerDay = 3;
    expect(consoleLogSpy.callCount).to.equal(
      daysToRunReport * consoleLogsPerDay
    );
  });
});
