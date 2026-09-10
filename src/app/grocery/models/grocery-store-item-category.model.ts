export interface GroceryStoreItemCategory {
  id: number;
  groceryStoreId: number;
  groceryItemId: number;
  groceryCategoryId: number;
}

export function createGroceryStoreItemCategory(params: Partial<GroceryStoreItemCategory>) {
  return {
    id: params.id ?? 0,
    groceryStoreId: params.groceryStoreId ?? 0,
    groceryItemId: params.groceryItemId ?? 0,
    groceryCategoryId: params.groceryCategoryId ?? 0,
  } as GroceryStoreItemCategory;
}
