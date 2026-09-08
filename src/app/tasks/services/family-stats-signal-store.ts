import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createFamilyMemberStats, FamilyMemberStats } from '../models/family-member-stats.model';
import { getYear } from 'date-fns';
import { computed, inject } from '@angular/core';
import { UserGroupsSignalStore } from '../../shared/services/user-groups-signal-store';

interface FamilyStatsUiState {
  year: number;
}

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
    const familiesStore = inject(UserGroupsSignalStore);
    const buildQueryString = computed(() => `userGroupId=${familiesStore.activeGroupId()}&year=${year()}`);
    const yearBehindDisabled = computed(() => {
      const activeGroup = familiesStore.activeGroup();
      return !!activeGroup && activeGroup.minYear === year();
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
