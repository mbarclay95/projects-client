import { createGroceryCategory, GroceryCategory } from './grocery-category.model';
import { createGroceryItem } from './grocery-item.model';
import { createGroceryListItem, GroceryListItem } from './grocery-list-item.model';
import { createGroceryStore, GroceryStore } from './grocery-store.model';
import { createGroceryStoreItemCategory, GroceryStoreItemCategory } from './grocery-store-item-category.model';
import { groupShoppingList } from './shopping-list-sort';

describe('groupShoppingList', () => {
  const produce = createGroceryCategory({ id: 1, name: 'Produce' });
  const bakery = createGroceryCategory({ id: 2, name: 'Bakery' });
  const categories: GroceryCategory[] = [produce, bakery];

  function entry(id: number, name: string, groceryCategoryId: number | null): GroceryListItem {
    return createGroceryListItem({
      id,
      groceryItemId: id,
      groceryItem: createGroceryItem({ id, name, groceryCategoryId }),
    });
  }

  it('gives a null store one unnamed group in name order', () => {
    const entries = [entry(1, 'Zucchini', produce.id), entry(2, 'Apples', produce.id)];

    expect(groupShoppingList(entries, null, new Map(), categories)).toEqual([{ name: '', entries: [entries[1], entries[0]] }]);
  });

  it('groups and orders by the store categoryOrder', () => {
    const bread = entry(1, 'Bread', bakery.id);
    const apples = entry(2, 'Apples', produce.id);
    const store: GroceryStore = createGroceryStore({ id: 1, categoryOrder: [bakery.id, produce.id] });

    expect(groupShoppingList([apples, bread], store, new Map(), categories)).toEqual([
      { name: 'Bakery', entries: [bread] },
      { name: 'Produce', entries: [apples] },
    ]);
  });

  it('moves an entry with an exception without moving the same item at another store', () => {
    const tortillas = entry(1, 'Tortillas', bakery.id);
    const store1: GroceryStore = createGroceryStore({ id: 1, categoryOrder: [produce.id, bakery.id] });
    const store2: GroceryStore = createGroceryStore({ id: 2, categoryOrder: [produce.id, bakery.id] });
    const exceptionAtStore1: GroceryStoreItemCategory = createGroceryStoreItemCategory({
      id: 1,
      groceryStoreId: store1.id,
      groceryItemId: tortillas.groceryItemId,
      groceryCategoryId: produce.id,
    });
    const exceptions = new Map([[`${store1.id}:${tortillas.groceryItemId}`, exceptionAtStore1]]);

    expect(groupShoppingList([tortillas], store1, exceptions, categories)).toEqual([{ name: 'Produce', entries: [tortillas] }]);
    expect(groupShoppingList([tortillas], store2, exceptions, categories)).toEqual([{ name: 'Bakery', entries: [tortillas] }]);
  });

  it('puts an uncategorised entry and one whose category the store does not order both in Other', () => {
    const uncategorised = entry(1, 'Mystery Item', null);
    const unordered = entry(2, 'Bread', bakery.id);
    const store: GroceryStore = createGroceryStore({ id: 1, categoryOrder: [produce.id] });

    expect(groupShoppingList([unordered, uncategorised], store, new Map(), categories)).toEqual([
      { name: 'Other', entries: [unordered, uncategorised] },
    ]);
  });

  it('drops empty groups, including Other', () => {
    const apples = entry(1, 'Apples', produce.id);
    const store: GroceryStore = createGroceryStore({ id: 1, categoryOrder: [produce.id, bakery.id] });

    expect(groupShoppingList([apples], store, new Map(), categories)).toEqual([{ name: 'Produce', entries: [apples] }]);
  });

  it('orders two entries in one group by name regardless of input order', () => {
    const zucchini = entry(1, 'Zucchini', produce.id);
    const apples = entry(2, 'Apples', produce.id);
    const store: GroceryStore = createGroceryStore({ id: 1, categoryOrder: [produce.id] });

    expect(groupShoppingList([zucchini, apples], store, new Map(), categories)).toEqual([{ name: 'Produce', entries: [apples, zucchini] }]);
  });
});
