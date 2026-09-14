import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createGroceryStoreItemCategory, GroceryStoreItemCategory } from '../models/grocery-store-item-category.model';

export const GroceryStoreItemCategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryStoreItemCategory>({
    pluralEntityName: 'grocery-store-item-categories',
    createEntity: createGroceryStoreItemCategory,
  }),
  withComputed(({ entities }) => ({
    byStoreAndItem: computed(
      () => new Map(entities().map((exception) => [`${exception.groceryStoreId}:${exception.groceryItemId}`, exception])),
    ),
  })),
);
