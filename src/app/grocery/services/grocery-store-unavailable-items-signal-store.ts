import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createGroceryStoreUnavailableItem, GroceryStoreUnavailableItem } from '../models/grocery-store-unavailable-item.model';

export const GroceryStoreUnavailableItemsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryStoreUnavailableItem>({
    pluralEntityName: 'grocery-store-unavailable-items',
    createEntity: createGroceryStoreUnavailableItem,
  }),
  withComputed(({ entities }) => ({
    unavailableKeys: computed(() => new Set(entities().map((row) => `${row.groceryStoreId}:${row.groceryItemId}`))),
  })),
);
