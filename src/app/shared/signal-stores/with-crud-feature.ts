import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface HasId {
  id: number;
}

export interface CrudEntitiesHttpOptions<T extends HasId> {
  pluralEntityName: string;
  createEntity: (data: Partial<T>) => T;
}

type CrudEntitiesState = {
  loadingAll: boolean;
  loadingOne: number | undefined;
  selectedEntityId: number | undefined;
};

export function withCrudEntities<T extends HasId>(options: CrudEntitiesHttpOptions<T>) {
  return signalStoreFeature(
    withState<CrudEntitiesState>({ loadingAll: false, loadingOne: undefined, selectedEntityId: undefined }),
    withEntities<T>(),
    withComputed(({ entities, selectedEntityId }) => ({
      selectedEntity: computed(() => {
        const entityId = selectedEntityId();
        if (entityId === undefined) {
          return undefined;
        }
        if (entityId === 0) {
          return options.createEntity({ id: 0 } as Partial<T>);
        }

        return options.createEntity(entities().find((entity) => entity.id === selectedEntityId())!);
      }),
    })),
    withMethods((store) => {
      const httpClient = inject(HttpClient);
      const nzMessageService = inject(NzMessageService);
      const setLoadingAll = (loadingAll: boolean) => patchState(store, { loadingAll });
      const setLoadingOne = (loadingOne?: number) => patchState(store, { loadingOne });
      const setSelectedEntity = (entityId: number) => patchState(store, { selectedEntityId: entityId });
      const clearSelectedEntity = () => patchState(store, { selectedEntityId: undefined });

      const loadAll = rxMethod<{ queryString?: string }>(
        pipe(
          switchMap(({ queryString }) => {
            setLoadingAll(true);
            return httpClient.get<T[]>(`${environment.apiUrl}/${options.pluralEntityName}?${queryString ?? ''}`).pipe(
              map((entities) => entities.map((entity) => options.createEntity(entity))),
              tap((entities) => {
                patchState(store, setEntities(entities));
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
            catchError((error) => {
              console.log(error);
              const message = error.error.message;
              if (message) {
                nzMessageService.error(message);
              } else {
                nzMessageService.error('There was an error creating the entity.');
              }

              return of(undefined);
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
          return httpClient.delete<void>(`${environment.apiUrl}/${options.pluralEntityName}/${data.id}`).pipe(
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
        create,
        update,
        remove,
        setSelectedEntity,
        clearSelectedEntity,
      };
    }),
  );
}
