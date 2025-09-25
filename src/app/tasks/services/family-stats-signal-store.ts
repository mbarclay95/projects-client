import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createFamilyMemberStats, FamilyMemberStats } from '../models/family-member-stats.model';
import { getYear } from 'date-fns';
import { computed, inject } from '@angular/core';
import { FamiliesSignalStore } from './families-signal-store';

type FamilyStatsUiState = {
  year: number;
};

const initialState: FamilyStatsUiState = {
  year: getYear(new Date()),
};

export const FamilyStatsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCrudEntities<FamilyMemberStats>({
    pluralEntityName: 'family-stats',
    createEntity: createFamilyMemberStats,
  }),
  withComputed(({ year }) => {
    const familiesStore = inject(FamiliesSignalStore);
    const buildQueryString = computed(() => `familyId=${familiesStore.activeFamilyId()}&year=${year()}`);
    const yearBehindDisabled = computed(() => {
      const activeFamily = familiesStore.activeFamily();
      return !!activeFamily && activeFamily.minYear === year();
    });
    const yearAheadDisabled = computed(() => getYear(new Date()) === year());

    return {
      buildQueryString,
      yearBehindDisabled,
      yearAheadDisabled,
    };
  }),
  withMethods((store) => {
    const nextYear = () => patchState(store, { year: store.year() + 1 });
    const previousYear = () => patchState(store, { year: store.year() - 1 });

    return {
      nextYear,
      previousYear,
    };
  }),
);
