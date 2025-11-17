import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { environment } from '../../../environments/environment';
import { computed, inject } from '@angular/core';
import { createCompleteFromIncomplete, createIncompleteEntry, IncompleteEntry } from '../models/entry.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { removeEntity } from '@ngrx/signals/entities';

export const IncompleteEntriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<IncompleteEntry>({
    pluralEntityName: 'entries',
    createEntity: createIncompleteEntry,
    apiUrl: environment.moneyAppApiUrl,
  }),
  withComputed(({ entities }) => {
    const buildQueryString = computed(() => {
      return `incomplete=1`;
    });
    const sortedEntities = computed(() => entities().sort((a, b) => a.id - b.id));

    return {
      buildQueryString,
      sortedEntities,
    };
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);

    const completeEntry = rxMethod<{ entity: IncompleteEntry; onSuccess?: () => void }>(
      switchMap((data) => {
        store.setLoadingOne(data.entity.id);
        const completedEntry = createCompleteFromIncomplete(data.entity);
        return httpClient.put(`${environment.moneyAppApiUrl}/entries/${data.entity.id}`, completedEntry).pipe(
          tap(() => {
            patchState(store, removeEntity(data.entity.id));
            store.setLoadingOne();
            if (data.onSuccess) {
              data.onSuccess();
            }
          }),
          catchError((error) => {
            console.log(error);

            return of(undefined);
          }),
        );
      }),
    );

    return {
      completeEntry,
    };
  }),
);
