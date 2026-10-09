import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, mergeMap, of, pipe, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { createGroceryListItem, GroceryListItem } from '../models/grocery-list-item.model';
import { AddRecipeToListResult } from '../models/recipe.model';
import { environment } from '../../../environments/environment';

export interface AddBatchRequest {
  items: { groceryItemId: number; quantity: number | null }[];
  onSuccess?: (result: AddRecipeToListResult) => void;
  onSettled?: () => void;
}

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
  withState({ pickerOpen: false, pendingIds: [] as number[], addingItemIds: [] as number[] }),
  withComputed(({ entities }) => ({
    entryByGroceryItemId: computed(() => new Map(entities().map((entry) => [entry.groceryItemId, entry]))),
  })),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const nzMessageService = inject(NzMessageService);

    const removeAdding = (ids: number[]) => patchState(store, { addingItemIds: store.addingItemIds().filter((id) => !ids.includes(id)) });

    const addBatch = rxMethod<AddBatchRequest>(
      pipe(
        mergeMap(({ items, onSuccess, onSettled }) => {
          const ids = items.map((item) => item.groceryItemId);
          patchState(store, { addingItemIds: [...store.addingItemIds(), ...ids] });
          return httpClient.post<AddRecipeToListResult>(`${environment.apiUrl}/grocery-list-items/batch`, { items }).pipe(
            tap((result) => {
              removeAdding(ids);
              store.loadAll({});
              onSuccess?.(result);
              onSettled?.();
            }),
            catchError((error) => {
              console.log(error);
              removeAdding(ids);
              nzMessageService.error(error.error?.message ?? 'There was an error adding to the list.');
              onSettled?.();
              return of(undefined);
            }),
          );
        }),
      ),
    );

    return {
      addBatch,
      openPicker: () => patchState(store, { pickerOpen: true }),
      closePicker: () => patchState(store, { pickerOpen: false }),
      markBought: (entry: GroceryListItem) => {
        patchState(store, { pendingIds: [...store.pendingIds(), entry.id] });
        store.update({
          entity: { ...entry, bought: true },
          removeFromStore: true,
          onSettled: () => patchState(store, { pendingIds: store.pendingIds().filter((id) => id !== entry.id) }),
        });
      },
    };
  }),
);
