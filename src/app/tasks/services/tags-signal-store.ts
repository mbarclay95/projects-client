import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

type TagsSignalStoreState = {
  entities: string[];
};

const initialState: TagsSignalStoreState = {
  entities: [],
};

export const TagsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const loadAll = rxMethod<void>(
      pipe(
        switchMap(() => httpClient.get<string[]>(`${environment.apiUrl}/tags`).pipe(tap((tags) => patchState(store, { entities: tags })))),
      ),
    );

    return {
      loadAll,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);
