import { inject, Pipe, PipeTransform } from '@angular/core';
import { TaskUserConfig } from '../models/task-user-config.model';
import { UserGroupsSignalStore } from '../../shared/services/user-groups-signal-store';

@Pipe({ name: 'totalCompletedTasks' })
export class TotalCompletedTasksPipe implements PipeTransform {
  private readonly familiesStore = inject(UserGroupsSignalStore);

  transform(config: TaskUserConfig): number {
    const activeGroup = this.familiesStore.activeGroup();
    if (!activeGroup) {
      return 0;
    }

    return activeGroup.taskStrategy === 'per task'
      ? config.completedFamilyTasks.length
      : config.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);
  }
}
