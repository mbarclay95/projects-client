import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createTask, Task } from '../models/task.model';

export const TasksSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Task>({
    pluralEntityName: 'tasks',
    createEntity: createTask,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
