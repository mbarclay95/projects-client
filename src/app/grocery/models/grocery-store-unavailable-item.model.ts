export interface GroceryStoreUnavailableItem {
  id: number;
  groceryStoreId: number;
  groceryItemId: number;
}

export function createGroceryStoreUnavailableItem(params: Partial<GroceryStoreUnavailableItem>) {
  return {
    id: params.id ?? 0,
    groceryStoreId: params.groceryStoreId ?? 0,
    groceryItemId: params.groceryItemId ?? 0,
  } as GroceryStoreUnavailableItem;
}
