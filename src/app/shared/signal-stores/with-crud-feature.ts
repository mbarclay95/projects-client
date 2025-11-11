import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, upsertEntity, withEntities } from '@ngrx/signals/entities';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { withCreateEditEntityState } from './with-create-edit-entity-feature';

export interface HasId {
  id: number | string;
}

export interface CrudEntitiesHttpOptions<T extends HasId> {
  pluralEntityName: string;
  createEntity: (data: Partial<T>) => T;
  apiUrl?: string;
}

type CrudEntitiesState = {
  loadingAll: boolean;
  loadingOne: number | string | undefined;
  queryString: string | undefined;
  totalCount: number;
};

const initialFeatureState: CrudEntitiesState = {
  loadingAll: false,
  loadingOne: undefined,
  queryString: undefined,
  totalCount: 0,
};

export type PagedEntity<T> = {
  total: number;
  data: T[];
};

export function withCrudEntities<T extends HasId>(options: CrudEntitiesHttpOptions<T>) {
  const apiUrl = options.apiUrl ?? environment.apiUrl;
  return signalStoreFeature(
    withState<CrudEntitiesState>(initialFeatureState),
    withEntities<T>(),
    withCreateEditEntityState<T>({
      entityPropName: 'entities',
      createEntity: options.createEntity,
    }),
    withMethods((store) => {
      const httpClient = inject(HttpClient);
      const nzMessageService = inject(NzMessageService);

      const setLoadingAll = (loadingAll: boolean) => patchState(store, { loadingAll });
      const setLoadingOne = (loadingOne?: number | string) => patchState(store, { loadingOne });
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

      const loadAllPaged = rxMethod<{ addQueryString?: boolean; onSuccess?: (entities: T[]) => void }>(
        pipe(
          switchMap((data) => {
            setLoadingAll(true);
            let queryString = '';
            if (data.addQueryString ?? true) {
              queryString = store.queryString() ?? '';
            }
            return httpClient.get<PagedEntity<T>>(`${apiUrl}/${options.pluralEntityName}?${queryString}`).pipe(
              map((pagedData) => ({
                total: pagedData.total,
                data: pagedData.data.map((entity) => options.createEntity(entity)),
              })),
              tap((pagedData) => {
                patchState(store, setAllEntities(pagedData.data));
                patchState(store, { totalCount: pagedData.total });
                setLoadingAll(false);
                if (data.onSuccess) {
                  data.onSuccess(pagedData.data);
                }
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
        loadAllPaged,
        loadOne,
        upsert,
        create,
        update,
        remove,
        setQueryString,
      };
    }),
  );
}
