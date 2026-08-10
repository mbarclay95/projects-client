import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { withActive } from '../../shared/signal-stores/with-active-feature';
import { createDraft, Draft } from '../models/draft.model';
import { computed, effect, inject } from '@angular/core';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { Permissions } from '../../auth/permissions';

export interface DraftsUiState {
  showArchived: boolean;
  search: string | null;
}

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
  withComputed(({ ui }) => ({
    buildQueryString: computed(() => {
      let queryString = `showArchived=${ui.showArchived() ? 1 : 0}&`;
      if (ui.search()) {
        queryString += `search=${ui.search()}`;
      }

      return queryString;
    }),
  })),
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
