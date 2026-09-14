import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createGroceryStore, GroceryStore } from '../models/grocery-store.model';

export const GroceryStoresSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryStore>({
    pluralEntityName: 'grocery-stores',
    createEntity: createGroceryStore,
  }),
);
