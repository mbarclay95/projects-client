import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { withActive } from '../../shared/signal-stores/with-active-feature';
import { createDraft, Draft } from '../models/draft.model';
import { createDraftTeam, DraftTeam } from '../models/draft-team.model';
import { computed, effect, inject } from '@angular/core';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { Permissions } from '../../auth/permissions';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { updateEntity } from '@ngrx/signals/entities';
import { environment } from '../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface DraftsUiState {
  showArchived: boolean;
  search: string | null;
}

interface DraftsStoreState {
  selectedTeamId: number | undefined;
  newTeamDraftId: number;
  loadingTeam: boolean;
}

const initialState: DraftsStoreState = {
  selectedTeamId: undefined,
  newTeamDraftId: 0,
  loadingTeam: false,
};

export const DraftsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Draft>({
    pluralEntityName: 'drafts',
    createEntity: createDraft,
  }),
  withUi<DraftsUiState>({
    showArchived: false,
    search: null,
  }),
  withActive<Draft>(),
  withState(initialState),
  withComputed(({ ui, entities, selectedTeamId, newTeamDraftId }) => ({
    buildQueryString: computed(() => {
      let queryString = `showArchived=${ui.showArchived() ? 1 : 0}&`;
      if (ui.search()) {
        queryString += `search=${ui.search()}`;
      }

      return queryString;
    }),
    selectedTeam: computed(() => {
      const teamId = selectedTeamId();
      if (teamId === undefined) {
        return undefined;
      }
      if (teamId === 0) {
        return createDraftTeam({ id: 0, draftId: newTeamDraftId() });
      }

      return createDraftTeam(
        entities().reduce(
          (foundTeam, draft) => {
            if (foundTeam) {
              return foundTeam;
            }

            return draft.draftTeams.find((team) => team.id === teamId);
          },
          undefined as DraftTeam | undefined,
        )!,
      );
    }),
  })),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const nzMessageService = inject(NzMessageService);

    const setSelectedTeam = (teamId?: number) => patchState(store, { selectedTeamId: teamId });
    const setDraftIdForNewTeam = (draftId: number) => patchState(store, { selectedTeamId: 0, newTeamDraftId: draftId });
    const setLoadingTeam = (loadingTeam: boolean) => patchState(store, { loadingTeam });

    const patchDraftTeamCache = (team: DraftTeam): void => {
      const draft = store.entities().find((d) => d.id === team.draftId);
      if (!draft) {
        return;
      }
      patchState(
        store,
        updateEntity({
          id: draft.id,
          changes: { draftTeams: draft.draftTeams.map((t) => (t.id === team.id ? team : t)) },
        }),
      );
    };

    const createDraftTeamHttp = rxMethod<{ team: DraftTeam; onSuccess?: (team: DraftTeam) => void }>(
      pipe(
        switchMap(({ team, onSuccess }) => {
          setLoadingTeam(true);
          return httpClient.post<DraftTeam>(`${environment.apiUrl}/draft-teams`, team).pipe(
            map((created) => createDraftTeam(created)),
            tap((created) => {
              const draft = store.entities().find((d) => d.id === created.draftId)!;
              patchState(store, updateEntity({ id: draft.id, changes: { draftTeams: [...draft.draftTeams, created] } }));
              setLoadingTeam(false);
              if (onSuccess) {
                onSuccess(created);
              }
            }),
            catchError((error) => {
              console.log(error);
              nzMessageService.error(error.error.message ?? 'There was an error creating the team.');
              setLoadingTeam(false);
              return of(undefined);
            }),
          );
        }),
      ),
    );

    const updateDraftTeamHttp = rxMethod<{ team: DraftTeam; onSuccess?: (team: DraftTeam) => void }>(
      pipe(
        switchMap(({ team, onSuccess }) => {
          setLoadingTeam(true);
          return httpClient.put<DraftTeam>(`${environment.apiUrl}/draft-teams/${team.id}`, team).pipe(
            map((updated) => createDraftTeam(updated)),
            tap((updated) => {
              patchDraftTeamCache(updated);
              setLoadingTeam(false);
              if (onSuccess) {
                onSuccess(updated);
              }
            }),
            catchError((error) => {
              console.log(error);
              nzMessageService.error(error.error.message ?? 'There was an error updating the team.');
              setLoadingTeam(false);
              return of(undefined);
            }),
          );
        }),
      ),
    );

    const deleteDraftTeamHttp = rxMethod<{ team: DraftTeam; onSuccess?: () => void }>(
      pipe(
        switchMap(({ team, onSuccess }) => {
          setLoadingTeam(true);
          return httpClient.delete(`${environment.apiUrl}/draft-teams/${team.id}`).pipe(
            tap(() => {
              const draft = store.entities().find((d) => d.id === team.draftId)!;
              patchState(store, updateEntity({ id: draft.id, changes: { draftTeams: draft.draftTeams.filter((t) => t.id !== team.id) } }));
              setLoadingTeam(false);
              if (onSuccess) {
                onSuccess();
              }
            }),
            catchError((error) => {
              console.log(error);
              nzMessageService.error(error.error.message ?? 'There was an error deleting the team.');
              setLoadingTeam(false);
              return of(undefined);
            }),
          );
        }),
      ),
    );

    const cloneDraftTeamsHttp = rxMethod<{ draftId: number; sourceDraftId: number; onSuccess?: () => void }>(
      pipe(
        switchMap(({ draftId, sourceDraftId, onSuccess }) => {
          setLoadingTeam(true);
          return httpClient.post<DraftTeam[]>(`${environment.apiUrl}/drafts/${draftId}/clone-teams`, { sourceDraftId }).pipe(
            map((teams) => teams.map((team) => createDraftTeam(team))),
            tap((teams) => {
              patchState(store, updateEntity({ id: draftId, changes: { draftTeams: teams } }));
              setLoadingTeam(false);
              if (onSuccess) {
                onSuccess();
              }
            }),
            catchError((error) => {
              console.log(error);
              nzMessageService.error(error.error.message ?? 'There was an error cloning teams.');
              setLoadingTeam(false);
              return of(undefined);
            }),
          );
        }),
      ),
    );

    return {
      setSelectedTeam,
      setDraftIdForNewTeam,
      patchDraftTeamCache,
      createDraftTeamHttp,
      updateDraftTeamHttp,
      deleteDraftTeamHttp,
      cloneDraftTeamsHttp,
    };
  }),
  withHooks({
    onInit(store) {
      const authStore = inject(AuthSignalStore);
      effect(() => {
        if (authStore.hasPermissionTo(Permissions.DRAFTS_PAGE)) {
          store.setQueryString(store.buildQueryString());
          store.loadAll({});
        }
      });
    },
  }),
);
