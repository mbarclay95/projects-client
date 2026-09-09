import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { createGroceryItem, filterGroceryItems, GroceryItem } from '../models/grocery-item.model';

export interface GroceryUiState {
  search: string;
  tags: string[];
}

export const GroceryItemsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryItem>({
    pluralEntityName: 'grocery-items',
    createEntity: createGroceryItem,
  }),
  withUi<GroceryUiState>({ search: '', tags: [] }),
  withComputed(({ ui, entities }) => ({
    filteredItems: computed(() => filterGroceryItems(entities(), ui().search, ui().tags)),
  })),
);
