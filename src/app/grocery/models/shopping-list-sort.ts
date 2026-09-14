import { GroceryCategory } from './grocery-category.model';
import { GroceryListItem } from './grocery-list-item.model';
import { GroceryStore } from './grocery-store.model';
import { GroceryStoreItemCategory } from './grocery-store-item-category.model';

export interface ShoppingListGroup {
  name: string;
  entries: GroceryListItem[];
}

const OTHER_GROUP_NAME = 'Other';

export function groupShoppingList(
  entries: GroceryListItem[],
  store: GroceryStore | null,
  exceptionsByStoreAndItem: Map<string, GroceryStoreItemCategory>,
  categories: GroceryCategory[],
): ShoppingListGroup[] {
  if (!store) {
    return [{ name: '', entries: sortByNameThenId(entries) }];
  }

  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));
  const entriesByCategoryId = new Map<number, GroceryListItem[]>();
  const other: GroceryListItem[] = [];

  for (const entry of entries) {
    const categoryId =
      exceptionsByStoreAndItem.get(`${store.id}:${entry.groceryItemId}`)?.groceryCategoryId ?? entry.groceryItem.groceryCategoryId;
    const rank = categoryId === null ? -1 : store.categoryOrder.indexOf(categoryId);

    if (categoryId === null || rank === -1) {
      other.push(entry);
      continue;
    }

    const bucket = entriesByCategoryId.get(categoryId) ?? [];
    bucket.push(entry);
    entriesByCategoryId.set(categoryId, bucket);
  }

  const groups: ShoppingListGroup[] = [];
  for (const categoryId of store.categoryOrder) {
    const bucket = entriesByCategoryId.get(categoryId);
    if (bucket && bucket.length > 0) {
      groups.push({ name: categoryNameById.get(categoryId) ?? '', entries: sortByNameThenId(bucket) });
    }
  }

  if (other.length > 0) {
    groups.push({ name: OTHER_GROUP_NAME, entries: sortByNameThenId(other) });
  }

  return groups;
}

function sortByNameThenId(entries: GroceryListItem[]): GroceryListItem[] {
  return [...entries].sort((a, b) => a.groceryItem.name.localeCompare(b.groceryItem.name) || a.id - b.id);
}
