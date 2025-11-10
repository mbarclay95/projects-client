import { inject, Pipe, PipeTransform } from '@angular/core';
import { TaskUserConfig } from '../models/task-user-config.model';
import { FamiliesSignalStore } from '../services/families-signal-store';

@Pipe({ name: 'totalCompletedTasks' })
export class TotalCompletedTasksPipe implements PipeTransform {
  private readonly familiesStore = inject(FamiliesSignalStore);

  transform(config: TaskUserConfig): number {
    const activeFamily = this.familiesStore.activeFamily();
    if (!activeFamily) {
      return 0;
    }

    return activeFamily.taskStrategy === 'per task'
      ? config.completedFamilyTasks.length
      : config.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);
  }
}
