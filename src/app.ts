import { StoreInventory } from "./StoreInventory";
import {
  Apple,
  CheddarCheese,
  Banana,
  Strawberry,
  InstantRamen,
  Avocado,
} from "./Foods";
import { printInventoryReport } from "./utils";

const DAYS_TO_RUN_REPORT = Number(process.argv[2]);
const scriptName = process.env.npm_lifecycle_event;

if (scriptName === "run-report" && !DAYS_TO_RUN_REPORT)
  /* This check only run when generating the report */
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
  new Avocado(),
];

const storeInventory = new StoreInventory(items);

printInventoryReport(storeInventory, DAYS_TO_RUN_REPORT);
