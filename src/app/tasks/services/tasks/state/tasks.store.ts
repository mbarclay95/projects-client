import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Task } from '../../../models/task.model';

export interface TasksState extends EntityState<Task> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tasks' })
export class TasksStore extends EntityStore<TasksState> {

  constructor() {
    super();
  }

}
