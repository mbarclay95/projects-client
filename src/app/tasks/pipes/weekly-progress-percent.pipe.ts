import { Pipe, PipeTransform } from '@angular/core';
import {FamiliesQuery} from "../services/families/state/families.query";
import {TaskUserConfig} from '../models/task-user-config.model';

@Pipe({
  name: 'weeklyProgressPercent'
})
export class WeeklyProgressPercentPipe implements PipeTransform {

  constructor(
    private familiesQuery: FamiliesQuery
  ) {
  }

  transform(config: TaskUserConfig, returnFraction: boolean = true): number {
    if (config.tasksPerWeek === 0) {
      return 0;
    }
    const activeFamily = this.familiesQuery.getActive();
    if (!activeFamily) {
      return 0;
    }
    let totalCompleted = activeFamily.taskStrategy === 'per task' ?
      config.completedFamilyTasks.length :
      config.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);

    let progress = totalCompleted / config.tasksPerWeek;
    if (progress > 1) {
      progress = 1;
    }

    if (returnFraction) {
      return progress;
    }

    return parseFloat((progress * 100.0).toFixed(0));
  }

}
