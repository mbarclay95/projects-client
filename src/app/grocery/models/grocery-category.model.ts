export interface GroceryCategory {
  id: number;
  name: string;
}

export function createGroceryCategory(params: Partial<GroceryCategory>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
  } as GroceryCategory;
}
