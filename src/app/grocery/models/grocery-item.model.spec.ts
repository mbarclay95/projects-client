import { createGroceryItem, filterGroceryItems, GroceryItem } from './grocery-item.model';

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
