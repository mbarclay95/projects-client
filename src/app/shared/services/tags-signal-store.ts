import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export type TagScope = 'tasks';

interface TagsSignalStoreState {
  tagsByScope: Record<TagScope, string[]>;
}

const initialState: TagsSignalStoreState = {
  tagsByScope: { tasks: [] },
};

export const TagsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const loadAll = rxMethod<TagScope>(
      pipe(
        switchMap((scope) =>
          httpClient
            .get<string[]>(`${environment.apiUrl}/tags?scope=${scope}`)
            .pipe(tap((tags) => patchState(store, { tagsByScope: { ...store.tagsByScope(), [scope]: tags } }))),
        ),
      ),
    );

    return {
      loadAll,
    };
  }),
  withComputed(({ tagsByScope }) => ({
    taskTags: computed(() => tagsByScope().tasks),
  })),
);
