import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createRecipe, Recipe } from '../models/recipe.model';

interface RecipesStoreState {
  ingredientsRecipeId: number | undefined;
}

const initialState: RecipesStoreState = {
  ingredientsRecipeId: undefined,
};

export const RecipesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Recipe>({
    pluralEntityName: 'recipes',
    createEntity: createRecipe,
  }),
  withState(initialState),
  withMethods((store) => ({
    openIngredients: (recipeId: number) => patchState(store, { ingredientsRecipeId: recipeId }),
    closeIngredients: () => patchState(store, { ingredientsRecipeId: undefined }),
  })),
);
