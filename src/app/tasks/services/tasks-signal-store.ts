import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createTask, Task, TaskOwnerType } from '../models/task.model';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { computed, inject } from '@angular/core';
import { differenceInDays, endOfWeek } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { createTaskHistory, TaskHistory } from '../models/task-history.model';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { updateEntity } from '@ngrx/signals/entities';

export interface TasksUiState {
  ownerType: TaskOwnerType | null;
  completedStatus: 'completed' | 'notCompleted' | 'both';
  recurringType: boolean | 'both';
  sort: string;
  sortDir: 'asc' | 'desc';
  numOfDays: number | null;
  search: string | null;
  tags: string[];
  showPaused: boolean;
  highPriorityFirst: boolean;
}

const weeklyTaskPageUiState: Partial<TasksUiState> = {
  numOfDays: differenceInDays(endOfWeek(new Date(), { weekStartsOn: 1 }), new Date()),
  ownerType: 'family',
  recurringType: 'both',
  completedStatus: 'notCompleted',
  search: null,
  tags: [],
  showPaused: false,
  highPriorityFirst: true,
};

const tasksPageUiState: Partial<TasksUiState> = {
  numOfDays: null,
  ownerType: null,
  completedStatus: 'notCompleted',
  search: null,
  tags: [],
  showPaused: true,
  highPriorityFirst: false,
};

const initialState: TasksUiState = {
  ownerType: null,
  completedStatus: 'notCompleted',
  recurringType: 'both',
  sort: 'dueDate',
  sortDir: 'desc',
  numOfDays: null,
  search: null,
  tags: [],
  showPaused: false,
  highPriorityFirst: true,
};

export const TasksSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Task>({
    pluralEntityName: 'tasks',
    createEntity: createTask,
  }),
  withUi(initialState),
  withComputed(({ ui, entities }) => {
    const buildQueryString = computed(() => {
      let queryString = `sort=${ui.sort()}&sortDir=${ui.sortDir()}&completedStatus=${ui.completedStatus()}&showPaused=${ui.showPaused() ? 1 : 0}&`;
      if (ui.numOfDays() !== null) {
        queryString += `numOfDays=${ui.numOfDays()}&`;
      }

      return queryString;
    });
    const filteredTasks = computed(() => {
      let filteredTasks: Task[] = [...entities()];
      const changedUi = ui();
      if (changedUi.ownerType) {
        filteredTasks = filteredTasks.filter((task) => task.ownerType === changedUi.ownerType);
      }

      if (changedUi.search && changedUi.search !== '') {
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.name.toLowerCase().includes((changedUi.search as string).toLowerCase()) ||
            task.description?.toLowerCase().includes((changedUi.search as string).toLowerCase()),
        );
      }

      if (changedUi.tags.length > 0) {
        filteredTasks = filteredTasks.filter((task) => task.tags.filter((tag) => changedUi.tags.includes(tag)).length > 0);
      }

      if (changedUi.highPriorityFirst) {
        filteredTasks = filteredTasks.sort((a, b) => {
          if (a.priority === b.priority) {
            return (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0);
          }

          return b.priority - a.priority;
        });
      } else {
        filteredTasks = filteredTasks.sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0));
      }

      return filteredTasks;
    });
    const familyCount = computed(() => entities().filter((task) => task.ownerType === 'family').length);
    const userCount = computed(() => entities().filter((task) => task.ownerType === 'user').length);
    const selectedWeeklyPageIndex = computed(() => (ui.ownerType() === 'user' ? 1 : 0));

    return {
      buildQueryString,
      filteredTasks,
      familyCount,
      userCount,
      selectedWeeklyPageIndex,
    };
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const loadNextWeek = () => store.updateUiState({ numOfDays: (store.ui.numOfDays() ?? 0) + 7 });
    const loadWeeklyPage = () => store.updateUiState({ ...weeklyTaskPageUiState });
    const loadTasksPage = () => store.updateUiState({ ...tasksPageUiState });
    const loadTaskHistoryIfNeeded = async (task: Task) => {
      if (task.taskHistory !== undefined) {
        return;
      }
      return firstValueFrom(
        httpClient.get<TaskHistory[]>(`${environment.apiUrl}/tasks/${task.id}/history`).pipe(
          map((histories) => histories.map((history) => createTaskHistory(history))),
          tap((histories) => patchState(store, updateEntity({ id: task.id, changes: { taskHistory: histories } }))),
        ),
      );
    };

    return {
      loadNextWeek,
      loadWeeklyPage,
      loadTasksPage,
      loadTaskHistoryIfNeeded,
    };
  }),
);
