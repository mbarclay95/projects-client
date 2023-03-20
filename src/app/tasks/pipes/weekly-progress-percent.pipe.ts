import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../users/models/user.model";
import {FamiliesQuery} from "../services/families/state/families.query";

@Pipe({
  name: 'weeklyProgressPercent'
})
export class WeeklyProgressPercentPipe implements PipeTransform {

  constructor(
    private familiesQuery: FamiliesQuery
  ) {
  }

  transform(user: User, returnFraction: boolean = true): number {
    if (!user.taskUserConfig || user.taskUserConfig.tasksPerWeek === 0) {
      return 0;
    }
    const activeFamily = this.familiesQuery.getActive();
    if (!activeFamily) {
      return 0;
    }
    let totalCompleted = activeFamily.taskStrategy === 'per task' ?
      user.taskUserConfig.completedFamilyTasks.length :
      user.taskUserConfig.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);

    let progress = totalCompleted / user.taskUserConfig.tasksPerWeek;
    if (progress > 1) {
      progress = 1;
    }

    if (returnFraction) {
      return progress;
    }

    return parseFloat((progress * 100.0).toFixed(0));
  }

}
