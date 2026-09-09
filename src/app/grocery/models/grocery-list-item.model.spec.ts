import { createGroceryItem, GroceryItemUnit } from './grocery-item.model';
import { createGroceryListItem, formatGroceryListItemAmount } from './grocery-list-item.model';

describe('formatGroceryListItemAmount', () => {
  it('is empty when the quantity is null, whatever the unit', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.weight }), quantity: null });

    expect(formatGroceryListItemAmount(entry)).toEqual('');
  });

  it('appends lb to a weight quantity', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.weight }), quantity: 2.5 });

    expect(formatGroceryListItemAmount(entry)).toEqual('2.5 lb');
  });

  it('shows a bare number for a count quantity', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.count }), quantity: 3 });

    expect(formatGroceryListItemAmount(entry)).toEqual('3');
  });
});
