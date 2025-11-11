import { computed, inject, untracked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, upsertEntity, withEntities } from '@ngrx/signals/entities';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface HasId {
  id: number | string;
}

export interface CrudEntitiesHttpOptions<T extends HasId> {
  pluralEntityName: string;
  createEntity: (data: Partial<T>) => T;
  apiUrl?: string;
}

interface CrudEntitiesState<T extends HasId> {
  loadingAll: boolean;
  loadingOne: number | string | undefined;
  createEditEntityId: number | string | undefined; // use 0 to create
  initialCreateEntityState: Partial<T> | undefined;
  queryString: string | undefined;
}

const initialState: CrudEntitiesState<never> = {
  loadingAll: false,
  loadingOne: undefined,
  createEditEntityId: undefined,
  initialCreateEntityState: undefined,
  queryString: undefined,
};

export function withCrudEntities<T extends HasId>(options: CrudEntitiesHttpOptions<T>) {
  const apiUrl = options.apiUrl ?? environment.apiUrl;
  return signalStoreFeature(
    withState<CrudEntitiesState<T>>(initialState),
    withEntities<T>(),
    withComputed((store) => {
      return {
        createEditEntity: computed(() => {
          const entityId = store.createEditEntityId();
          if (entityId === undefined) {
            return undefined;
          }
          if (entityId === 0) {
            const initialState = { ...untracked(store.initialCreateEntityState), ...{ id: 0 } } as Partial<T>;
            return options.createEntity(initialState);
          }

          return options.createEntity(store.entities().find((entity) => entity.id === entityId)!);
        }),
      };
    }),
    withMethods((store) => {
      const httpClient = inject(HttpClient);
      const nzMessageService = inject(NzMessageService);

      const setLoadingAll = (loadingAll: boolean) => patchState(store, { loadingAll });
      const setLoadingOne = (loadingOne?: number | string) => patchState(store, { loadingOne });
      const editEntity = (entityId: number) => patchState(store, { createEditEntityId: entityId });
      const createEntity = (initialState?: Partial<T>) =>
        patchState(store, { createEditEntityId: 0, initialCreateEntityState: initialState });
      const clearCreateEditEntity = () => patchState(store, { createEditEntityId: undefined });
      const setQueryString = (queryString: string) => patchState(store, { queryString });

      const loadAll = rxMethod<{ addQueryString?: boolean }>(
        pipe(
          switchMap(({ addQueryString }) => {
            setLoadingAll(true);
            let queryString = '';
            if ((addQueryString ?? true) && store.queryString()) {
              queryString = store.queryString()!;
            }
            return httpClient.get<T[]>(`${apiUrl}/${options.pluralEntityName}?${queryString}`).pipe(
              map((entities) => entities.map((entity) => options.createEntity(entity))),
              tap((entities) => {
                patchState(store, setAllEntities(entities));
                setLoadingAll(false);
              }),
              catchError((error) => {
                console.log(error);

                return of(undefined);
              }),
            );
          }),
        ),
      );

      const loadOne = rxMethod<{ entityId: number }>(
        pipe(
          switchMap(({ entityId }) => {
            setLoadingOne(entityId);
            return httpClient.get<T>(`${apiUrl}/${options.pluralEntityName}/${entityId}`).pipe(
              map((entity) => options.createEntity(entity)),
              tap((entity) => {
                patchState(store, upsertEntity(entity));
                setLoadingOne();
              }),
              catchError((error) => {
                console.log(error);

                return of(undefined);
              }),
            );
          }),
        ),
      );

      const upsert = rxMethod<{ entity: T; removeFromStore?: boolean; onSuccess?: (upserted: T) => void }>(
        pipe(
          map((data) => {
            if (data.entity.id === 0) {
              create(data);
            } else {
              update(data);
            }
          }),
        ),
      );

      const create = rxMethod<{ entity: T; onSuccess?: (created: T) => void }>(
        switchMap((data) => {
          setLoadingOne(data.entity.id);
          return httpClient.post<T>(`${apiUrl}/${options.pluralEntityName}`, data.entity).pipe(
            map((entity) => options.createEntity(entity)),
            tap((entity) => {
              patchState(store, addEntity(entity));
              setLoadingOne();
              if (data.onSuccess) {
                data.onSuccess(entity);
              }
            }),
            catchError((error) => {
              console.log(error);
              const message = error.error.message;
              if (message) {
                nzMessageService.error(message);
              } else {
                nzMessageService.error('There was an error creating the entity.');
              }

              setLoadingOne();
              return of(undefined);
            }),
          );
        }),
      );

      const update = rxMethod<{ entity: T; removeFromStore?: boolean; onSuccess?: (updated: T) => void }>(
        switchMap((data) => {
          setLoadingOne(data.entity.id);
          return httpClient.put<T>(`${apiUrl}/${options.pluralEntityName}/${data.entity.id}`, data.entity).pipe(
            map((entity) => options.createEntity(entity)),
            tap((entity) => {
              if (data.removeFromStore) {
                patchState(store, removeEntity(entity.id));
              } else {
                patchState(store, updateEntity({ id: entity.id, changes: entity }));
              }
              setLoadingOne();
              if (data.onSuccess) {
                data.onSuccess(entity);
              }
            }),
            catchError((error) => {
              console.log(error);

              return of(undefined);
            }),
          );
        }),
      );

      const remove = rxMethod<{ id: number; onSuccess?: () => void }>(
        switchMap((data) => {
          setLoadingOne(data.id);
          return httpClient.delete<void>(`${apiUrl}/${options.pluralEntityName}/${data.id}`).pipe(
            tap(() => {
              patchState(store, removeEntity(data.id));
              setLoadingOne();
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
        loadAll,
        loadOne,
        upsert,
        create,
        update,
        remove,
        setQueryString,
        editEntity,
        createEntity,
        clearCreateEditEntity,
      };
    }),
  );
}
