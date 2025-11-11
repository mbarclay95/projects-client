import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createFamily, Family } from '../models/family.model';
import { computed } from '@angular/core';

interface FamiliesUiState {
  activeFamilyId: number | undefined;
}

const initialState: FamiliesUiState = {
  activeFamilyId: undefined,
};

export const FamiliesSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCrudEntities<Family>({
    pluralEntityName: 'families',
    createEntity: createFamily,
  }),
  withComputed(({ activeFamilyId, entities }) => {
    const activeFamily = computed(() => entities().find((family) => family.id === activeFamilyId()));
    const isPerTaskStrategy = computed(() => activeFamily()?.taskStrategy === 'per task');
    const isPerTaskPointStrategy = computed(() => activeFamily()?.taskStrategy === 'per task point');
    const taskPoints = computed(() => [...(activeFamily()?.taskPoints ?? [])].sort((a, b) => (a > b ? 1 : -1)));
    const minTaskPoint = computed(() => {
      const taskPoints = activeFamily()?.taskPoints;
      if (!taskPoints) {
        return;
      }

      return Math.min(...[...taskPoints]);
    });
    const maxTaskPoint = computed(() => {
      const taskPoints = activeFamily()?.taskPoints;
      if (!taskPoints) {
        return;
      }

      return Math.max(...[...taskPoints]);
    });

    return {
      activeFamily,
      isPerTaskStrategy,
      isPerTaskPointStrategy,
      taskPoints,
      minTaskPoint,
      maxTaskPoint,
    };
  }),
  withMethods((store) => {
    const setActiveFamily = (activeFamilyId: number) => patchState(store, { activeFamilyId });

    return {
      setActiveFamily,
    };
  }),
);
