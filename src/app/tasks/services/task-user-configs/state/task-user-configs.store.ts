import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TaskUserConfig } from '../../../models/task-user-config.model';

export interface TaskUserConfigsState extends EntityState<TaskUserConfig>, ActiveState {
  ui: TaskUserConfigUiState;
}

export interface TaskUserConfigUiState {
  weekOffset: number;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'task-user-configs' })
export class TaskUserConfigsStore extends EntityStore<TaskUserConfigsState> {
  constructor() {
    super({ ui: { weekOffset: 0 } });
  }
}
