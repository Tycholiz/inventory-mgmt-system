import { randomUUID, UUID } from "crypto";
import {
  FRESHNESS_TURNING_POINT,
  MAX_QUALITY_VALUE,
  MIN_SELL_IN_VALUE,
} from "./constants";

export abstract class FoodItem {
  constructor(
    private name: string,
    /** indicates how many days a food item will last for after it has been picked. When this value is at 5 or less, it starts degrading at twice the speed */
    private lastsDays: number,
    /** `quality` must be between 0 and 25, and decreases twice as fast when `sellIn` date is less than 0. Value must be between 0 and 25, inclusive. */
    private quality: number,
    /** indicates a food that retains its quality over time and does not have a `sellIn` date. */
    private nonPerishable: boolean = false,
    /** indicates a food that increases its quality over time */
    private improvesWithAge: boolean = false,
    /** indicates a food is organic, and thus degrades in quality at twice the normal rate */
    private isOrganic: boolean = false,
    private pickedAt: Date = new Date(),
    public id: UUID = randomUUID()
  ) {}
  public increaseQuality(): void {
    /* quality cannot be greater than 25 */
    this.quality = Math.min(this.quality + 1, MAX_QUALITY_VALUE);
  }
  public decreaseQuality(rate = 1): void {
    /* quality cannot be negative */
    this.quality = Math.max(this.quality - rate, 0);
  }
  public isSpoiled(): boolean {
    /* food is spoiled if the current date is `lastDays` past the `pickedAt` date */
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - this.pickedAt.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff > this.lastsDays;
  }
  public isNoLongerFresh(): boolean {
    /* food is no longer fresh if there are 5 days remaining until it becomes spoiled */
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - this.pickedAt.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff - FRESHNESS_TURNING_POINT > this.lastsDays;
  }
  public getName(): string {
    return this.name;
  }
  public getPickedAtDate(): Date {
    return this.pickedAt;
  }
  public getQualityValue(): number {
    return this.quality;
  }
  public isItemNonPerishable(): boolean {
    return this.nonPerishable;
  }
  public doesItemImproveWithAge(): boolean {
    return this.improvesWithAge;
  }
  public isItemOrganic(): boolean {
    return this.isOrganic;
  }
  public getLastsDays(): number {
    return this.lastsDays;
  }
}

export class Apple extends FoodItem {
  constructor() {
    super("Apple", 15, 10);
  }
}

export class Banana extends FoodItem {
  constructor() {
    super("Banana", 12, 9);
  }
}

export class Strawberry extends FoodItem {
  constructor() {
    super("Strawberry", 10, 10);
  }
}

export class CheddarCheese extends FoodItem {
  constructor() {
    super("Cheddar Cheese", 15, 16, false, true);
  }
}

export class InstantRamen extends FoodItem {
  constructor() {
    // TODO: replace lastsDays with null
    super("Instant Ramen", 0, 5, true);
  }
}

export class Avocado extends FoodItem {
  constructor() {
    super("Avocado", 10, 10, false, false, true);
  }
}
