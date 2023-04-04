### Getting started
1. run `yarn` to install all dependencies
2. run `yarn run-report <number-of-days>` to generate the forecasted report

#### Tests
Tests can be run with
`yarn test`

With test coverage able to be viewed with
`yarn test:coverage`

### Work done

Aside from new features, all of the changes that have been made to this project have been done with the goal of 2 factors: to make the code more declarative (and therefore readable), and to make it more extensible.

- Improve overall general syntax, naming etc.
- Leverage Typescript to be source of truth for determining which foods are valid as a `FoodItem`
  - note: in a real-life scenario, since data would be coming from a database, we'd be in a better position to rely on a database as the source of truth for our types. In this case, I would recommend generating Typescript types based on the types obtained from our data layer, negating our need from having to maintain the `FoodItemName` Typescript type ourselves.
- Add 3 new properties to the `FoodItem` type: `isNonPerishable`, `improvesWithAge`, and `isOrganic`. This was done to make the program more extensible, since there are other food goods that fall into these categories. It also sets the pattern for more properties to be added in the future, should another need to handle `sellIn` and `quality` properties differently arise. It also feeds nicely into the strategies pattern that was implemented in the `StoreInventory` class. Should more categories need to be added in the future, one would simply add a new strategy to `foodItem.strategies.ts`, and copy the pattern laid out in the client code (`StoreInventory.updateFoodItem`).
  - note: see note below about replacing these fields with interfaces to be implemented with classes. This gives us the benefit of not having to include irrelevant fields on some food items (such as `sellIn` on `nonPerishableFoodItems`)
  - It is clear that Iain had some innovative ideas with implementing a sale of some sort, though this was left commented out. It could be the case that items are placed on sale manually, or it might be that this is done automatically (e.g. if `sellIn` value drops below 0). In either case, the strategies pattern laid out would make this feature easy to implement, and would simply require a new strategy, and for it to be included in the if-else logic in the `StoreInventory.updateFoodItem` method. We hope whoever undertakes this task has the good wit to add a few unit tests!
- Disallow methods to change class properties directly, replacing with getters/setters
- Allow the user calling the program to specify how many days the report should be run for as a command line argument, instead of that value being a constant in the code itself.
- Replace the idea of `sellIn` with `pickedAt` and `lastsDays`. `lastsDays` is an immutable value that tells us how long an item lasts from the date it was picked. The benefit of this is that we can always calculate this concept of `sellIn`, since we are just doing math on the current date. The problem with the concept of storing `sellIn` is that it represents another piece of data that needs to be updated continuously by the system, and thus is another point of where things can go wrong.
  - note: this solution wasn't fully implemented. The reason it wasn't fully implement is because it makes use of the current date, whose side-effects would make it difficult to do calculations to work within the confines of this forecasting application, without adding special-purpose code. Since I've determined that it goes beyond the scope of our neat and tidy inventory management system, I've decided not to work it into the current solution. I have a [PR](https://github.com/Tycholiz/inventory-mgmt-system/pull/6) up to give an idea of the changes I would make to implement this particular change.

### Looking forward

Right now this program has a very debilitating limitation: foods can only be added at the start, and we can therefore only see how the inventory has progressed for these initial items. For this reason, we'll need to pitch to management for the purchase of some state-of-the-art scanning tools. On Monday mornings when food shipments arrive, our staff will help unload the truck and scan each item (or box) individually. Upon scanning an item, a request will be sent to our backend (ie. the code in this repo) to add the item to the database. We'll have to make some modifications to the code, but the pattern laid out should provide a nice bed foundation for future changes.

Our people on the front-line are getting tired of having to adjust the code in `app.ts` every day, and only being able to use the tool as a hypothetical model for inventory, so the next step will be implementing a proper database solution! When a new item is scanned in the store, the request will hit our backend and the backend will call the database to put those items in. The backend will also handle all logic related to automatically marking items as spoiled, as well as marking items as sold (such as when an item is scanned at checkout). We will also implement a hook so that when an item is marked as spoiled, our people on the front line will get a notification that an item has been removed, indicating to them that it should be removed from store shelves. For this, most likely we will add a new *calculated* field `shouldBeDiscarded`, and only once the item is scanned again will it be removed from the database.

Forecasting will also be an important part of our inventory management system, so we will add a `soldAt` date on each FoodItem (which will be updated automatically, triggered from the integrated POS system). This will enable us to extract analytics on how long an item stays on store shelves, allowing us to deduce things like averages, demand during peak seasons etc. This data will help us to forecast demand so that we may adequately stock our shelves so customers are not met with lack of supply. With this data we can also make determinations on minimum and maximum stocking quantities for each food item.

#### A note on the database solution
Due to the relational nature of this inventory management system, I would favor an SQL approach for the data layer. Focusing in on the food items, I see them modelled in the following (rough & simplified) way:

```sql
CREATE TABLE product (
  product_id UUID PRIMARY KEY,
  product_name TEXT,
  isPerishable BOOLEAN,
  category_id REFERENCES category,
);

CREATE TABLE inventory (
  inventory_id UUID PRIMARY KEY,
  lot_number TEXT,
  current_quantity INT,
  minimum_stock_level INT,
  maximum_stock_level INT,
  spoilage_date DATE,
  product_id UUID REFERENCES product
);
```

each row in the `product` table represents a product that is stocked by the store, and each row in the `inventory` table represents an lot instance of the product. Therefore, each individual food item belongs to a row in the `inventory` table, and therefore the lot that it arrived in. When an item is sold, that sale would have to be tracked in an additional `sales` table, which would reference the particular row in the `inventory` table.

#### Technical changes to be made

- Introduce an interface to indicate that the item is perishable, non-perishable, organic etc. For example, food items that implement the perishable interface would contain fields: `lastsDays`, `pickedDate` and `acquiredDate`. These fields do not have relevance for all food items.
- Rework the idea of `quality` to be a percentage, as opposed to an integer. 100% would indicate the item is at the top of its quality, and 0% would indicate it's ready to be thrown out. Following in the same line of thought as `sellIn` above, we want to reduce the need to have to constantly update this value each day, instead allowing ourselves to do math to figure it out at any given time. From there, for each food item we can determine a schedule for how quality improves/degrades over time. For instance, cheddar cheese might start at 50% quality, but increase by 4% each day, while apples might start at 100% and decrease 5% each day. Naturally, this assumes a linear schedule for quality degradation.
