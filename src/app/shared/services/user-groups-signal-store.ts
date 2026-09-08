import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../signal-stores/with-crud-feature';
import { createUserGroup, UserGroup } from '../models/user-group.model';
import { computed } from '@angular/core';

interface UserGroupsUiState {
  activeGroupId: number | undefined;
}

const initialState: UserGroupsUiState = {
  activeGroupId: undefined,
};

export const UserGroupsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCrudEntities<UserGroup>({
    pluralEntityName: 'families',
    createEntity: createUserGroup,
  }),
  withComputed(({ activeGroupId, entities }) => {
    const activeGroup = computed(() => entities().find((group) => group.id === activeGroupId()));
    const isPerTaskStrategy = computed(() => activeGroup()?.taskStrategy === 'per task');
    const isPerTaskPointStrategy = computed(() => activeGroup()?.taskStrategy === 'per task point');
    const taskPoints = computed(() => [...(activeGroup()?.taskPoints ?? [])].sort((a, b) => (a > b ? 1 : -1)));
    const minTaskPoint = computed(() => {
      const taskPoints = activeGroup()?.taskPoints;
      if (!taskPoints) {
        return;
      }

      return Math.min(...[...taskPoints]);
    });
    const maxTaskPoint = computed(() => {
      const taskPoints = activeGroup()?.taskPoints;
      if (!taskPoints) {
        return;
      }

      return Math.max(...[...taskPoints]);
    });

    return {
      activeGroup,
      isPerTaskStrategy,
      isPerTaskPointStrategy,
      taskPoints,
      minTaskPoint,
      maxTaskPoint,
    };
  }),
  withMethods((store) => {
    const setActiveGroup = (activeGroupId: number) => patchState(store, { activeGroupId });

    return {
      setActiveGroup,
    };
  }),
);
