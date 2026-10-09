import { createGroceryItem, GroceryItemUnit } from './grocery-item.model';
import { createGroceryListItem, formatGroceryListItemAmount, onListNote } from './grocery-list-item.model';

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

describe('onListNote', () => {
  it('is null when there is no entry', () => {
    expect(onListNote(undefined)).toBeNull();
  });

  it('has no amount when the quantity is null', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.count }), quantity: null });

    expect(onListNote(entry)).toEqual('Already on list');
  });

  it('appends a weight amount', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.weight }), quantity: 2 });

    expect(onListNote(entry)).toEqual('Already on list · 2 lb');
  });

  it('appends a count amount', () => {
    const entry = createGroceryListItem({ groceryItem: createGroceryItem({ unit: GroceryItemUnit.count }), quantity: 3 });

    expect(onListNote(entry)).toEqual('Already on list · 3');
  });
});
