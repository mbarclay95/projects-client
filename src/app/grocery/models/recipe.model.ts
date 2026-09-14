export interface RecipeIngredient {
  id: number;
  groceryItemId: number;
  quantity: number | null;
}

export interface Recipe {
  id: number;
  name: string;
  description: string | null;
  ingredients: RecipeIngredient[];
}

export function createRecipeIngredient(params: Partial<RecipeIngredient>) {
  return {
    id: params.id ?? 0,
    groceryItemId: params.groceryItemId ?? 0,
    quantity: params.quantity ?? null,
  } as RecipeIngredient;
}

export function createRecipe(params: Partial<Recipe>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    description: params.description ?? null,
    ingredients: (params.ingredients ?? []).map((ingredient) => createRecipeIngredient(ingredient)),
  } as Recipe;
}
