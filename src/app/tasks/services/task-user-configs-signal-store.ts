import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createTaskUserConfig, TaskUserConfig } from '../models/task-user-config.model';
import { computed, inject } from '@angular/core';
import { FamiliesSignalStore } from './families-signal-store';
import { add, endOfWeek, lightFormat, startOfWeek } from 'date-fns';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { updateEntity } from '@ngrx/signals/entities';
import { Task } from '../models/task.model';

interface TaskUserConfigsUiState {
  weekOffset: number;
}

const initialState: TaskUserConfigsUiState = {
  weekOffset: 0,
};

export const TaskUserConfigsSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCrudEntities<TaskUserConfig>({
    pluralEntityName: 'task-user-config',
    createEntity: createTaskUserConfig,
  }),
  withComputed(({ weekOffset, entities }) => {
    const familiesStore = inject(FamiliesSignalStore);
    const authStore = inject(AuthSignalStore);
    const buildQueryString = computed(() => {
      const activeFamilyId = familiesStore.activeFamilyId();
      if (activeFamilyId) {
        return `familyId=${activeFamilyId}&weekOffset=${weekOffset()}`;
      }
      return undefined;
    });
    const weekString = computed(() => {
      const date = add(new Date(), {
        weeks: weekOffset(),
      });
      const startDate = lightFormat(startOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');
      const endDate = lightFormat(endOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');

      return `${startDate} - ${endDate}`;
    });
    const weekForwardDisabled = computed(() => weekOffset() === 1);
    const weekBehindDisabled = computed(() => weekOffset() === familiesStore.activeFamily()?.minWeekOffset);
    const authUserConfig = computed(() => entities().find((config) => config.userId === authStore.auth()?.id));

    return {
      buildQueryString,
      weekString,
      weekForwardDisabled,
      weekBehindDisabled,
      authUserConfig,
    };
  }),
  withMethods((store) => {
    const resetWeekOffset = () => patchState(store, { weekOffset: 0 });
    const updateWeekOffset = (change: number) => patchState(store, { weekOffset: store.weekOffset() + change });
    const removeTaskFromConfig = (configId: number, taskId: number) => {
      const foundConfig = store.entities().find((entity) => entity.id === configId)!;
      patchState(
        store,
        updateEntity({
          id: configId,
          changes: { completedFamilyTasks: foundConfig.completedFamilyTasks.filter((task) => task.id !== taskId) },
        }),
      );
    };
    const addCompletedTaskToActive = (task: Task) => {
      const authConfig = store.authUserConfig();
      if (authConfig) {
        patchState(
          store,
          updateEntity({ id: authConfig.id, changes: { completedFamilyTasks: [...authConfig.completedFamilyTasks, ...[task]] } }),
        );
      }
    };

    return {
      resetWeekOffset,
      updateWeekOffset,
      removeTaskFromConfig,
      addCompletedTaskToActive,
    };
  }),
);
