import { StoreInventory } from "./StoreInventory";
import {
  Apple,
  CheddarCheese,
  Banana,
  Strawberry,
  InstantRamen,
} from "./Foods";

const DAYS_TO_RUN_REPORT = Number(process.argv[2]);
const scriptName = process.env.npm_lifecycle_event;

if (scriptName === "run-report" && !DAYS_TO_RUN_REPORT)
  /* This check should only be run when generating the report */
  throw new Error(
    `
      Must indicate how many days the report will be run for \n
      e.g. yarn run-report 4
    `
  );

/* Implementation */
const items = [
  new Apple(),
  new Banana(),
  new Strawberry(),
  new CheddarCheese(),
  new InstantRamen(),
];

const storeInventory = new StoreInventory(items);

for (let i = 0; i < DAYS_TO_RUN_REPORT; i++) {
  console.log("Day " + i + "  ---------------------------------");
  console.log("                  name      sellIn quality");
  const data = items.map((element) => {
    return [
      element.getName(),
      element.getSellInDaysValue(),
      element.getQualityValue(),
    ];
  });
  console.table(data);

  console.log();
  storeInventory.updateFullInventory();
}
