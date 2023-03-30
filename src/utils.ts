import { StoreInventory } from "./StoreInventory";

export function printInventoryReport(
  storeInventory: StoreInventory,
  daysToRunReport: number
) {
  for (let i = 0; i < daysToRunReport; i++) {
    const itemData = storeInventory.items.map((element) => {
      const name = element.getName();
      const sellInDaysValue = element.getSellInDaysValue();
      const qualityValue = element.getQualityValue();
      return [name, sellInDaysValue, qualityValue];
    });
    const transformedData = itemData.map(
      ([id, name, sellInDaysValue, quality]) => {
        return {
          id,
          name,
          sellInDaysValue,
          quality,
        };
      }
    );

    console.log(`Day ${i + 1}  ---------------------------------`);
    console.table(transformedData);
    console.log();
    storeInventory.updateFullInventory();
  }
}
