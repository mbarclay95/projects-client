import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createEvent, Event } from '../models/event.model';
import { computed, effect, inject } from '@angular/core';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { createEventParticipant, EventParticipant } from '../models/event-participant';
import { HttpClient } from '@angular/common/http';
import { updateEntity } from '@ngrx/signals/entities';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { Permissions } from '../../auth/permissions';

export type EventsUiState = {
  showArchived: boolean;
  search: string | null;
};

type EventsStoreState = {
  selectedParticipantId: number | undefined;
  loadingParticipant: boolean;
};

const initialState: EventsStoreState = {
  selectedParticipantId: undefined,
  loadingParticipant: false,
};

export const EventsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCrudEntities<Event>({
    pluralEntityName: 'events',
    createEntity: createEvent,
  }),
  withUi<EventsUiState>({
    showArchived: false,
    search: null,
  }),
  withComputed(({ ui, selectedParticipantId, entities }) => ({
    buildQueryString: computed(() => {
      let queryString = `showArchived=${ui.showArchived() ? 1 : 0}&`;
      if (ui.search()) {
        queryString += `search=${ui.search()}`;
      }

      return queryString;
    }),
    selectedParticipant: computed(() => {
      const participantId = selectedParticipantId();
      if (participantId === undefined) {
        return undefined;
      }
      // if (participantId === 0) {
      //   return createEventParticipant({ id: 0, folderId: newSiteFolderId() });
      // }

      return createEventParticipant(
        entities().reduce(
          (foundParticipant, event) => {
            if (foundParticipant) {
              return foundParticipant;
            }

            return event.eventParticipants.find((p) => p.id === participantId);
          },
          undefined as EventParticipant | undefined,
        )!,
      );
    }),
  })),
  withMethods((store) => {
    const httpClient = inject(HttpClient);

    const setParticipantLoading = (loading: boolean): void => patchState(store, { loadingParticipant: loading });
    const setSelectedParticipant = (selectedId: number): void => patchState(store, { selectedParticipantId: selectedId });
    const clearSelectedParticipant = (): void => patchState(store, { selectedParticipantId: undefined });

    const updateParticipant = rxMethod<{ participant: EventParticipant; onSuccess: (participant: EventParticipant) => void }>(
      pipe(
        switchMap(({ participant, onSuccess }) => {
          setParticipantLoading(true);

          return httpClient.put(`${environment.apiUrl}/event-participants/${participant.id}`, participant).pipe(
            map((newParticipant) => createEventParticipant(newParticipant)),
            tap((newParticipant) => {
              const event = store.entities().find((event) => event.id === newParticipant.eventId)!;
              patchState(
                store,
                updateEntity({
                  id: event.id,
                  changes: {
                    eventParticipants: event.eventParticipants.map((currentParticipant) => {
                      if (currentParticipant.id === newParticipant.id) {
                        return newParticipant;
                      }
                      return currentParticipant;
                    }),
                  },
                }),
              );
              setParticipantLoading(false);
              if (onSuccess) {
                onSuccess(newParticipant);
              }
            }),
          );
        }),
      ),
    );

    return {
      updateParticipant,
      setSelectedParticipant,
      clearSelectedParticipant,
    };
  }),
  withHooks({
    onInit(store) {
      const authStore = inject(AuthSignalStore);
      effect(() => {
        if (authStore.hasPermissionTo(Permissions.EVENTS_PAGE)) {
          patchState(store, { queryString: store.buildQueryString() });
          store.loadAll({});
        }
      });
    },
  }),
);
