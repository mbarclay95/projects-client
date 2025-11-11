import { signalStore, withComputed } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createEntry, Entry } from '../models/entry.model';
import { environment } from '../../../environments/environment';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { computed } from '@angular/core';

export interface EntriesUiState {
  incomplete: boolean;
}

const initialUiState: EntriesUiState = {
  incomplete: true,
};

export const EntriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Entry>({
    pluralEntityName: 'entries',
    createEntity: createEntry,
    apiUrl: environment.moneyAppApiUrl,
  }),
  withUi(initialUiState),
  withComputed(({ ui }) => {
    const buildQueryString = computed(() => {
      return `incomplete=${ui.incomplete() ? 1 : 0}`;
    });

    return {
      buildQueryString,
    };
  }),
);
