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
  total: number|null;
  sort: string;
  sortDir: 'asc' | 'desc';
  numOfDays: number|null;
  search: string|null;
  tags: string[];
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'tasks'})
export class TasksStore extends EntityStore<TasksState> {

  constructor() {
    super({
      ui: {
        ownerType: null,
        ownerId: null,
        completedStatus: 'notCompleted',
        recurringType: 'both',
        page: 1,
        pageSize: 200,
        total: null,
        sort: 'dueDate',
        sortDir: 'desc',
        numOfDays: null,
        search: null,
        tags: []
      }
    });
  }

}
