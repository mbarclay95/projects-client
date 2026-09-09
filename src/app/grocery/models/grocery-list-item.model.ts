import { createGroceryItem, GroceryItem, GroceryItemUnit } from './grocery-item.model';

export interface GroceryListItem {
  id: number;
  groceryItemId: number;
  groceryItem: GroceryItem;
  quantity: number | null;
  bought: boolean;
  addedBy: { id: number; name: string } | null;
}

export function createGroceryListItem(params: Partial<GroceryListItem>): GroceryListItem {
  return {
    id: params.id ?? 0,
    groceryItemId: params.groceryItemId ?? 0,
    groceryItem: createGroceryItem(params.groceryItem ?? {}),
    quantity: params.quantity ?? null,
    bought: params.bought ?? false,
    addedBy: params.addedBy ?? null,
  };
}

export function formatGroceryListItemAmount(entry: GroceryListItem): string {
  if (entry.quantity === null) {
    return '';
  }

  return entry.groceryItem.unit === GroceryItemUnit.weight ? `${entry.quantity} lb` : `${entry.quantity}`;
}
