import { createFolder, Folder } from '../models/folder.model';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createSite, Site } from '../models/site.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { of, pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { updateEntity } from '@ngrx/signals/entities';

type FolderStoreState = {
  editMode: boolean;
  selectedFolderId: number | undefined;
  selectedSiteId: number | undefined;
  newSiteFolderId: number;
  loadingOneSite: boolean;
};

const initialState: FolderStoreState = {
  editMode: false,
  selectedFolderId: undefined,
  selectedSiteId: undefined,
  newSiteFolderId: 0,
  loadingOneSite: false,
};

export const FolderSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Folder>({
    pluralEntityName: 'folders',
    createEntity: createFolder,
  }),
  withState(initialState),
  withComputed(({ entities, selectedFolderId, selectedSiteId, newSiteFolderId }) => ({
    selectedFolder: computed(() => {
      const folderId = selectedFolderId();
      if (folderId === undefined) {
        return undefined;
      }
      if (folderId === 0) {
        return createFolder({ id: 0 });
      }

      return createFolder(entities().find((folder) => folder.id === selectedFolderId())!);
    }),
    selectedSite: computed(() => {
      const siteId = selectedSiteId();
      if (siteId === undefined) {
        return undefined;
      }
      if (siteId === 0) {
        return createSite({ id: 0, folderId: newSiteFolderId() });
      }

      return createSite(
        entities().reduce(
          (foundSite, folder) => {
            if (foundSite) {
              return foundSite;
            }

            return folder.sites.find((site) => site.id === siteId);
          },
          undefined as Site | undefined,
        )!,
      );
    }),
    sortedAndFiltered: computed(() =>
      entities()
        .filter((f) => f.show)
        .sort((a, b) => a.sort - b.sort),
    ),
    gridFormattedFolders: computed(() => {
      const filterAndSorted = entities()
        .filter((f) => f.show)
        .sort((a, b) => a.sort - b.sort);
      const formattedFolders: { column1: Folder[]; column2: Folder[]; column3: Folder[] } = {
        column1: [],
        column2: [],
        column3: [],
      };

      let counter: 1 | 2 | 3 = 1;
      filterAndSorted.forEach((folder) => {
        // @ts-ignore
        formattedFolders['column' + counter].push(folder);
        counter++;
        if (counter > 3) {
          counter = 1;
        }
      });

      return [formattedFolders.column1, formattedFolders.column2, formattedFolders.column3];
    }),
    folderOptions: computed(() => {
      return entities().map((folder) => ({
        label: folder.name,
        value: folder.id,
      }));
    }),
  })),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const toggleEditMode = () => patchState(store, { editMode: !store.editMode() });
    const setSelectedFolder = (folderId?: number) => patchState(store, { selectedFolderId: folderId });
    const setSelectedSite = (siteId?: number) => patchState(store, { selectedSiteId: siteId });
    const setFolderIdForNewSite = (folderId: number) => patchState(store, { selectedSiteId: 0, newSiteFolderId: folderId });
    const findFolderBySort = (sort: number): Folder | undefined => store.entities().find((f) => f.sort === sort);
    const setSiteLoading = (loading: boolean): void => patchState(store, { loadingOneSite: loading });

    const normalizeSort = (sort: number): number => {
      const maxSort = Math.max(...store.entities().map((f) => f.sort));
      if (sort > maxSort) {
        sort = 1;
      } else if (sort < 1) {
        sort = maxSort;
      }

      return sort;
    };

    const moveFolder = rxMethod<{ folder: Folder; direction: number }>(
      pipe(
        switchMap(({ folder, direction }) => {
          console.log(folder, direction);
          const oldSort = folder.sort;
          const newSort = normalizeSort(folder.sort + direction);
          console.log(newSort);

          const otherFolder = findFolderBySort(newSort);
          if (otherFolder) {
            patchState(
              store,
              updateEntity({
                id: folder.id,
                changes: { sort: newSort },
              }),
            );
            patchState(
              store,
              updateEntity({
                id: otherFolder.id,
                changes: { sort: oldSort },
              }),
            );
            const movedFolders = [
              { id: folder.id, sort: newSort },
              { id: otherFolder.id, sort: oldSort },
            ];
            return httpClient.patch(`${environment.apiUrl}/folder-sorts`, { data: movedFolders });
          }

          return of(undefined);
        }),
      ),
    );

    const createSiteHttp = rxMethod<{ site: Site; onSuccess?: (site: Site) => void }>(
      pipe(
        switchMap(({ site, onSuccess }) => {
          setSiteLoading(true);
          return httpClient.post<Site>(`${environment.apiUrl}/sites`, site).pipe(
            map((createdSite) => createSite(createdSite)),
            tap((createdSite) => {
              const folder = store.entities().find((folder) => folder.id === createdSite.folderId)!;
              patchState(
                store,
                updateEntity({
                  id: folder.id,
                  changes: {
                    sites: folder.sites.map((currentSite) => {
                      if (currentSite.id === createdSite.id) {
                        return createdSite;
                      }
                      return currentSite;
                    }),
                  },
                }),
              );
              setSiteLoading(false);
              if (onSuccess) {
                onSuccess(createdSite);
              }
            }),
          );
        }),
      ),
    );

    const updateSiteHttp = rxMethod<{ site: Site; oldFolderId: number; onSuccess?: (site: Site) => void }>(
      pipe(
        switchMap(({ site, oldFolderId, onSuccess }) => {
          setSiteLoading(true);
          return httpClient.put<Site>(`${environment.apiUrl}/sites/${site.id}`, site).pipe(
            map((s) => createSite(s)),
            tap((s) => {
              const folder = store.entities().find((folder) => folder.id === s.folderId)!;
              if (s.folderId === oldFolderId) {
                patchState(
                  store,
                  updateEntity({
                    id: folder.id,
                    changes: {
                      sites: folder.sites.map((currentSite) => {
                        if (currentSite.id === s.id) {
                          return s;
                        }
                        return currentSite;
                      }),
                    },
                  }),
                );
              } else {
                const addedSites = [...folder.sites];
                addedSites.push(s);
                patchState(
                  store,
                  updateEntity({
                    id: folder.id,
                    changes: { sites: addedSites },
                  }),
                );
                const olderFolder = store.entities().find((folder) => folder.id === oldFolderId)!;
                patchState(
                  store,
                  updateEntity({
                    id: oldFolderId,
                    changes: { sites: olderFolder.sites.filter((site) => site.id !== s.id) },
                  }),
                );
              }
              setSiteLoading(false);
              if (onSuccess) {
                onSuccess(s);
              }
            }),
          );
        }),
      ),
    );

    const updateSiteCache = (folderId: number, siteId: number, changes: Partial<Site>): void => {
      const folder = store.entities().find((folder) => folder.id === folderId)!;
      patchState(
        store,
        updateEntity({
          id: folderId,
          changes: {
            sites: folder.sites.map((site) => {
              if (site.id === siteId) {
                return { ...site, ...changes };
              }
              return site;
            }),
          },
        }),
      );
    };

    const updateSiteSortHttp = rxMethod<{ folderId: number; movedSites: { id: number; sort: number }[] }>(
      pipe(switchMap(({ folderId, movedSites }) => httpClient.patch(`${environment.apiUrl}/site-sorts`, { folderId, data: movedSites }))),
    );

    const deleteSiteHttp = rxMethod<{ id: number; onSuccess?: () => void }>(
      pipe(
        switchMap(({ id, onSuccess }) => {
          setSiteLoading(true);
          return httpClient.delete(`${environment.apiUrl}/sites/${id}`).pipe(
            tap(() => {
              store.loadAll();
              setSiteLoading(false);
              if (onSuccess) {
                onSuccess();
              }
            }),
          );
        }),
      ),
    );

    return {
      toggleEditMode,
      setSelectedFolder,
      setSelectedSite,
      setFolderIdForNewSite,
      moveFolder,
      createSiteHttp,
      updateSiteCache,
      updateSiteHttp,
      updateSiteSortHttp,
      deleteSiteHttp,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);
