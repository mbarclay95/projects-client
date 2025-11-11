import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createDirectoryItem, DirectoryItem } from '../models/directory-item.model';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { computed, inject } from '@angular/core';
import { WorkingDirectoryItem, workingDirectoryToString } from '../models/working-directory-item';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { removeEntity } from '@ngrx/signals/entities';

export interface DirectoryItemsUiState {
  workingDirectory: WorkingDirectoryItem[];
}

export const initialState: DirectoryItemsUiState = {
  workingDirectory: [],
};

interface CreateItemRequest {
  type: DirectoryItem['type'];
  newName: string;
  workingDirectory: string;
}

type UpdateItemRequest = DirectoryItem & {
  newPath: string;
  mode: 'cp' | 'mv';
  workingDirectory: string;
};

type DeleteItemRequest = DirectoryItem & {
  workingDirectory: string;
};

export const DirectoryItemsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<DirectoryItem>({
    pluralEntityName: 'file-explorer/directory-items',
    createEntity: createDirectoryItem,
  }),
  withUi(initialState),
  withComputed(({ ui }) => {
    const workingDirectoryString = computed(() => workingDirectoryToString(ui.workingDirectory()));
    const buildQueryString = computed(() => `path=${workingDirectoryString()}`);
    const noWorkingDir = computed(() => ui.workingDirectory().length === 0);

    return {
      workingDirectoryString,
      buildQueryString,
      noWorkingDir,
    };
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const appendPath = (path: string) => {
      const current = [...store.ui.workingDirectory()];
      current.push({
        sort: current.length + 1,
        path,
      });
      store.updateUiState({ workingDirectory: current });
    };
    const clickedWorkingDirectory = (newDir: WorkingDirectoryItem) => {
      let current = [...store.ui.workingDirectory()];
      current = current.filter((dir) => dir.sort <= newDir.sort);
      store.updateUiState({ workingDirectory: current });
    };
    const clickedRoot = () => store.updateUiState({ workingDirectory: [] });
    const createCustom = rxMethod<{ entity: CreateItemRequest; onSuccess?: (created: DirectoryItem) => void }>(
      pipe(
        switchMap((data) =>
          httpClient.post<DirectoryItem>(`${environment.apiUrl}/file-explorer/directory-items`, data.entity).pipe(
            map((item) => createDirectoryItem(item)),
            tap((item) => {
              store.loadAll({});
              if (data.onSuccess) {
                data.onSuccess(item);
              }
            }),
          ),
        ),
      ),
    );
    const updateCustom = rxMethod<{ entity: UpdateItemRequest; onSuccess?: (updated: DirectoryItem) => void }>(
      pipe(
        switchMap((data) =>
          httpClient.patch<DirectoryItem>(`${environment.apiUrl}/file-explorer/directory-items`, data.entity).pipe(
            map((item) => createDirectoryItem(item)),
            tap((item) => {
              store.loadAll({});
              if (data.onSuccess) {
                data.onSuccess(item);
              }
            }),
          ),
        ),
      ),
    );
    const removeCustom = rxMethod<{ entity: DeleteItemRequest; onSuccess?: () => void }>(
      pipe(
        tap((data) => patchState(store, removeEntity(data.entity.id))),
        switchMap((data) =>
          httpClient.patch(`${environment.apiUrl}/file-explorer/directory-items/delete`, data.entity).pipe(
            tap(() => {
              if (data.onSuccess) {
                data.onSuccess();
              }
            }),
          ),
        ),
      ),
    );

    return {
      appendPath,
      clickedWorkingDirectory,
      clickedRoot,
      createCustom,
      updateCustom,
      removeCustom,
    };
  }),
);
