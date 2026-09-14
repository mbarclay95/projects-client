import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createGroceryCategory, GroceryCategory } from '../models/grocery-category.model';

export const GroceryCategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryCategory>({
    pluralEntityName: 'grocery-categories',
    createEntity: createGroceryCategory,
  }),
);
