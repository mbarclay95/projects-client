import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map } from 'rxjs/operators';

export interface HasId {
  id: number;
}

export interface CrudEntitiesHttpOptions<T extends HasId> {
  pluralEntityName: string;
  createEntity: (data: Partial<T>) => T;
}

export function withCrudEntities<T extends HasId>(options: CrudEntitiesHttpOptions<T>) {
  return signalStoreFeature(
    withState<{ loadingAll: boolean; loadingOne: number | undefined }>({ loadingAll: false, loadingOne: undefined }),
    withEntities<T>(),
    withMethods((store) => {
      const httpClient = inject(HttpClient);
      const setLoadingAll = (loadingAll: boolean) => patchState(store, { loadingAll });
      const setLoadingOne = (loadingOne?: number) => patchState(store, { loadingOne });

      const loadAll = rxMethod<void>(
        pipe(
          switchMap(() => {
            setLoadingAll(true);
            return httpClient.get<T[]>(`${environment.apiUrl}/${options.pluralEntityName}`).pipe(
              map((entities) => entities.map((entity) => options.createEntity(entity))),
              tap((entities) => {
                patchState(store, setEntities(entities));
                setLoadingAll(false);
              }),
            );
          }),
        ),
      );

      const create = rxMethod<{ entity: T; onSuccess?: (created: T) => void }>(
        switchMap((data) => {
          setLoadingOne(data.entity.id);
          return httpClient.post<T>(`${environment.apiUrl}/${options.pluralEntityName}`, data.entity).pipe(
            map((entity) => options.createEntity(entity)),
            tap((entity) => {
              patchState(store, addEntity(entity));
              setLoadingOne();
              if (data.onSuccess) {
                data.onSuccess(entity);
              }
            }),
          );
        }),
      );

      const update = rxMethod<{ entity: T; onSuccess?: (updated: T) => void }>(
        switchMap((data) => {
          setLoadingOne(data.entity.id);
          return httpClient.put<T>(`${environment.apiUrl}/${options.pluralEntityName}/${data.entity.id}`, data.entity).pipe(
            map((entity) => options.createEntity(entity)),
            tap((entity) => {
              patchState(store, updateEntity({ id: entity.id, changes: entity }));
              setLoadingOne();
              if (data.onSuccess) {
                data.onSuccess(entity);
              }
            }),
          );
        }),
      );

      const remove = rxMethod<{ id: number; onSuccess?: () => void }>(
        switchMap((data) => {
          setLoadingOne(data.id);
          return httpClient.delete<void>(`${environment.apiUrl}/${options.pluralEntityName}/${data.id}`).pipe(
            tap(() => {
              patchState(store, removeEntity(data.id));
              setLoadingOne();
              if (data.onSuccess) {
                data.onSuccess();
              }
            }),
          );
        }),
      );

      return {
        loadAll,
        create,
        update,
        remove,
      };
    }),
  );
}
