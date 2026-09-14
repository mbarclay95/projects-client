import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createRecipe, Recipe } from '../models/recipe.model';

export const RecipesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Recipe>({
    pluralEntityName: 'recipes',
    createEntity: createRecipe,
  }),
);
