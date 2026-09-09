import { createGroceryItem, filterGroceryItems, formatGroceryItemAmount, GroceryItem, GroceryItemUnit } from './grocery-item.model';

describe('filterGroceryItems', () => {
  const items: GroceryItem[] = [
    createGroceryItem({ id: 1, name: 'Milk', tags: ['costco', 'dairy'] }),
    createGroceryItem({ id: 2, name: 'Bread', tags: ['produce'] }),
    createGroceryItem({ id: 3, name: 'Almond Milk', tags: ['costco'] }),
  ];

  it('returns everything when search and tags are both empty', () => {
    expect(filterGroceryItems(items, '', [])).toEqual(items);
  });

  it('matches a name substring, case-insensitively', () => {
    expect(filterGroceryItems(items, 'milk', []).map((item) => item.id)).toEqual([1, 3]);
  });

  it('filters tags as any-of, not all-of', () => {
    expect(filterGroceryItems(items, '', ['dairy', 'produce']).map((item) => item.id)).toEqual([1, 2]);
  });

  it('composes a search and a tag filter', () => {
    expect(filterGroceryItems(items, 'milk', ['costco']).map((item) => item.id)).toEqual([1, 3]);
  });
});

describe('formatGroceryItemAmount', () => {
  it('is empty for a unit-less item', () => {
    expect(formatGroceryItemAmount(createGroceryItem({ unit: GroceryItemUnit.none }))).toEqual('');
  });

  it('appends lb to a weight quantity', () => {
    expect(formatGroceryItemAmount(createGroceryItem({ unit: GroceryItemUnit.weight, defaultQuantity: 1.5 }))).toEqual('1.5 lb');
  });

  it('falls back to the unit label when a weight has no default quantity', () => {
    expect(formatGroceryItemAmount(createGroceryItem({ unit: GroceryItemUnit.weight }))).toEqual('lb');
  });

  it('shows a bare number for a count quantity', () => {
    expect(formatGroceryItemAmount(createGroceryItem({ unit: GroceryItemUnit.count, defaultQuantity: 4 }))).toEqual('4');
  });

  it('falls back to the unit label when a count has no default quantity', () => {
    expect(formatGroceryItemAmount(createGroceryItem({ unit: GroceryItemUnit.count }))).toEqual('Count');
  });
});
