export interface GroceryStore {
  id: number;
  name: string;
  categoryOrder: number[];
}

export function createGroceryStore(params: Partial<GroceryStore>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    categoryOrder: params.categoryOrder ?? [],
  } as GroceryStore;
}
