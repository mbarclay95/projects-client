import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Task, TaskOwnerType} from '../../../models/task.model';

export interface TasksState extends EntityState<Task> {
  ui: TaskUiState
}

export interface TaskUiState {
  ownerType: TaskOwnerType | null,
  ownerId: number | null,
  completedStatus: 'completed' | 'notCompleted' | 'both';
  recurringType: boolean | 'both';
  page: number|null;
  pageSize: number|null;
  sort: string;
  sortDir: 'asc' | 'desc';
  numOfDays: number|null;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'tasks'})
export class TasksStore extends EntityStore<TasksState> {

  constructor() {
    super({
      ui: {
        ownerType: null,
        ownerId: null,
        completedStatus: 'both',
        recurringType: 'both',
        page: 1,
        pageSize: 20,
        sort: 'dueDate',
        sortDir: 'desc',
        numOfDays: null
      }
    });
  }

}
