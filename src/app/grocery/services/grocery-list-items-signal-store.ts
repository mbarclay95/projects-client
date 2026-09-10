import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { createGroceryListItem, GroceryListItem } from '../models/grocery-list-item.model';

export interface ShoppingListUiState {
  storeId: number | null;
}

export const GroceryListItemsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<GroceryListItem>({
    pluralEntityName: 'grocery-list-items',
    createEntity: createGroceryListItem,
  }),
  withUi<ShoppingListUiState>({ storeId: null }),
  withState({ pickerOpen: false }),
  withComputed(({ entities }) => ({
    entryByGroceryItemId: computed(() => new Map(entities().map((entry) => [entry.groceryItemId, entry]))),
  })),
  withMethods((store) => ({
    openPicker: () => patchState(store, { pickerOpen: true }),
    closePicker: () => patchState(store, { pickerOpen: false }),
    markBought: (entry: GroceryListItem) => store.update({ entity: { ...entry, bought: true }, removeFromStore: true }),
  })),
);
