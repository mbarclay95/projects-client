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

export interface AddRecipeToListResult {
  added: number;
  alreadyOnList: number;
}

export function addRecipeToListMessage(result: AddRecipeToListResult): string {
  const { added, alreadyOnList } = result;

  if (added === 0 && alreadyOnList === 0) {
    return 'Nothing to add.';
  }
  if (added === 0) {
    return 'Everything was already on the list.';
  }

  let message = `Added ${added} item${added === 1 ? '' : 's'} to the list.`;
  if (alreadyOnList > 0) {
    message += ` ${alreadyOnList} ${alreadyOnList === 1 ? 'was' : 'were'} already on it.`;
  }

  return message;
}
