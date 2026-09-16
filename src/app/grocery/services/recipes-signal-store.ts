import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, mergeMap, of, pipe, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { AddRecipeToListResult, createRecipe, Recipe } from '../models/recipe.model';
import { environment } from '../../../environments/environment';

interface RecipesStoreState {
  addingRecipeIds: number[];
}

const initialState: RecipesStoreState = {
  addingRecipeIds: [],
};

export const RecipesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Recipe>({
    pluralEntityName: 'recipes',
    createEntity: createRecipe,
  }),
  withState(initialState),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const nzMessageService = inject(NzMessageService);

    const addToList = rxMethod<{ recipeId: number; onSuccess?: (result: AddRecipeToListResult) => void }>(
      pipe(
        mergeMap(({ recipeId, onSuccess }) => {
          patchState(store, { addingRecipeIds: [...store.addingRecipeIds(), recipeId] });
          return httpClient.post<AddRecipeToListResult>(`${environment.apiUrl}/recipes/${recipeId}/add-to-list`, {}).pipe(
            tap((result) => {
              patchState(store, { addingRecipeIds: store.addingRecipeIds().filter((id) => id !== recipeId) });
              if (onSuccess) {
                onSuccess(result);
              }
            }),
            catchError((error) => {
              console.log(error);
              patchState(store, { addingRecipeIds: store.addingRecipeIds().filter((id) => id !== recipeId) });
              nzMessageService.error(error.error.message ?? 'There was an error adding the recipe.');
              return of(undefined);
            }),
          );
        }),
      ),
    );

    return {
      addToList,
    };
  }),
);
